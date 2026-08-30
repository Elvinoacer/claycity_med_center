"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Loader2,
  MessageCircle,
  Phone,
  Sparkles,
  X,
} from "lucide-react";

type Role = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: Role;
  content: string;
};

const SUGGESTIONS = [
  "What are your opening hours?",
  "Do you have an in-house pharmacy?",
  "Can I walk in without an appointment?",
  "Where exactly are you located?",
  "What services do you offer?",
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi — I’m the Claycity assistant. Ask me about hours, services, lab, pharmacy, or how to visit. How can I help?",
    },
  ]);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, streaming, open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || streaming) return;

      setError(null);
      setInput("");

      const userMsg: ChatMessage = { id: uid(), role: "user", content: text };
      const assistantId = uid();

      setMessages((prev) => [
        ...prev,
        userMsg,
        { id: assistantId, role: "assistant", content: "" },
      ]);
      setStreaming(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const history = [...messages, userMsg]
          .filter((m) => m.id !== "welcome" || m.content)
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(
            data?.error ||
              "The assistant is unavailable right now. Please call 0721 260994."
          );
        }

        if (!res.body) throw new Error("No response stream.");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let full = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n");
          buffer = parts.pop() ?? "";

          for (const line of parts) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data) as { content?: string };
              if (parsed.content) {
                full += parsed.content;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: full } : m
                  )
                );
              }
            } catch {
              // ignore
            }
          }
        }

        if (!full.trim()) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content:
                      "I couldn’t generate a reply just now. Please try again or call 0721 260994.",
                  }
                : m
            )
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const msg =
          err instanceof Error
            ? err.message
            : "Something went wrong. Please call 0721 260994.";
        setError(msg);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "Sorry — I hit a snag. You can try again, or call us on 0721 260994.",
                }
              : m
          )
        );
      } finally {
        setStreaming(false);
      }
    },
    [messages, streaming]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open clinic assistant"
        className={`fixed z-[70] flex items-center gap-2.5 rounded-full bg-[#07191d] text-[#effbf5] shadow-[0_18px_40px_rgba(7,25,29,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(7,25,29,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff9e7d] ${
          open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
        } bottom-[5.5rem] right-4 lg:bottom-6 lg:right-6`}
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] text-[#07191d]">
          <MessageCircle className="h-6 w-6" strokeWidth={2.2} />
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8dfd6] opacity-60" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-[#07191d] bg-[#a8dfd6]" />
          </span>
        </span>
        <span className="hidden pr-5 text-left sm:block">
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/50">
            Ask Claycity
          </span>
          <span className="block text-sm font-semibold leading-tight">
            Clinic assistant
          </span>
        </span>
      </button>

      {/* Overlay + panel */}
      <div
        className={`fixed inset-0 z-[80] flex items-end justify-end p-0 sm:p-4 lg:p-6 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close assistant"
          className={`absolute inset-0 bg-[#07191d]/45 backdrop-blur-[2px] transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Claycity clinic assistant"
          className={`relative flex h-[min(92svh,640px)] w-full flex-col overflow-hidden rounded-t-[1.5rem] border border-white/10 bg-[#0b2226] shadow-[0_32px_80px_rgba(0,0,0,0.45)] transition-all duration-300 sm:h-[min(86svh,620px)] sm:max-w-[400px] sm:rounded-[1.5rem] ${
            open
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0 sm:translate-y-6"
          }`}
        >
          {/* Header */}
          <div className="relative flex shrink-0 items-center gap-3 border-b border-white/10 bg-gradient-to-br from-[#0f2e33] to-[#0b2226] px-4 py-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] text-[#07191d] shadow-lg">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-semibold tracking-tight text-white">
                Claycity Assistant
              </p>
              <p className="flex items-center gap-1.5 text-[11px] font-medium text-[#a8dfd6]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8dfd6] opacity-50" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#a8dfd6]" />
                </span>
                Online · answers about the clinic
              </p>
            </div>
            <a
              href="tel:+254721260994"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Call the clinic"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="flex-1 space-y-3.5 overflow-y-auto px-4 py-4"
            style={{
              backgroundImage:
                "radial-gradient(rgba(168,223,214,0.04) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-md bg-[#ff9e7d] text-[#07191d]"
                      : "rounded-bl-md border border-white/10 bg-white/8 text-white/90"
                  }`}
                >
                  {m.content ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-white/50">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Thinking…
                    </span>
                  )}
                </div>
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="pt-1">
                <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/35">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={streaming}
                      onClick={() => void send(s)}
                      className="rounded-full border border-white/12 bg-white/5 px-3 py-1.5 text-left text-[12px] font-medium text-white/75 transition hover:border-[#a8dfd6]/40 hover:bg-white/10 hover:text-white disabled:opacity-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="rounded-xl border border-[#ff9e7d]/30 bg-[#ff9e7d]/10 px-3 py-2 text-xs text-[#ff9e7d]">
                {error}
              </p>
            )}
          </div>

          {/* Composer */}
          <div className="shrink-0 border-t border-white/10 bg-[#0a1f22] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
            <div className="flex items-end gap-2 rounded-2xl border border-white/12 bg-white/6 px-2.5 py-2 focus-within:border-[#a8dfd6]/45">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask about hours, services…"
                disabled={streaming}
                className="max-h-28 min-h-[2.4rem] flex-1 resize-none bg-transparent px-1.5 py-2 text-[13.5px] text-white placeholder:text-white/35 focus:outline-none disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => void send(input)}
                disabled={streaming || !input.trim()}
                aria-label="Send message"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ff9e7d] text-[#07191d] transition enabled:hover:brightness-110 disabled:opacity-40"
              >
                {streaming ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
                )}
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/30">
              Clinic info only · For emergencies call local services
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
