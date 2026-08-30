"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  HeartPulse,
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
  "When are you open?",
  "Do you have a pharmacy?",
  "Can I walk in today?",
  "How do I find you?",
  "What care do you offer?",
];

const FALLBACK =
  "I'm resting for a moment. Please try again, or call us on 0721 260994 — we're here for you.";

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
        "Hello. I'm here with Claycity — ask about hours, care, the lab, the pharmacy, or how to visit. What would help you right now?",
    },
  ]);
  const [streaming, setStreaming] = useState(false);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 180);
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
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || streaming) return;

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
        const history = [...messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: FALLBACK } : m
            )
          );
          return;
        }

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
              m.id === assistantId ? { ...m, content: FALLBACK } : m
            )
          );
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: FALLBACK } : m
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
      {/* Living orb launcher */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Claycity companion"
        className={`group fixed z-[70] bottom-[5.5rem] right-4 lg:bottom-7 lg:right-7 ${
          open ? "pointer-events-none scale-75 opacity-0" : "opacity-100"
        } transition-all duration-500`}
      >
        <span className="relative flex h-[4.25rem] w-[4.25rem] items-center justify-center">
          {/* Aurora rings */}
          <span className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,#ff9e7d,#a8dfd6,#ff9e7d)] opacity-70 blur-[1px]" />
          <span className="absolute inset-[3px] rounded-full bg-[#07191d]" />
          <span className="absolute inset-[6px] rounded-full bg-gradient-to-br from-[#1a3a3f] via-[#0d282c] to-[#07191d] shadow-[0_0_40px_rgba(168,223,214,0.25)]" />
          {/* Breathing core */}
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] text-[#07191d] shadow-[0_8px_24px_rgba(255,158,125,0.45)] transition-transform duration-500 group-hover:scale-110">
            <HeartPulse className="h-5 w-5" strokeWidth={2.2} />
          </span>
          {/* Soft outer pulse */}
          <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full border border-[#a8dfd6]/30 opacity-40" style={{ animationDuration: "2.8s" }} />
        </span>
        <span className="pointer-events-none absolute -left-2 top-1/2 hidden -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#07191d]/90 px-3 py-1.5 text-[11px] font-semibold text-white/80 opacity-0 shadow-xl backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100 sm:block">
          Talk to Claycity
        </span>
      </button>

      {/* Stage */}
      <div
        className={`fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:justify-end sm:p-5 lg:p-8 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close companion"
          className={`absolute inset-0 bg-[#041214]/70 backdrop-blur-md transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Claycity companion"
          className={`relative flex h-[min(94svh,720px)] w-full flex-col overflow-hidden rounded-t-[1.75rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.55)] transition-all duration-500 sm:h-[min(88svh,680px)] sm:max-w-[420px] sm:rounded-[1.75rem] ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-10 scale-[0.97] opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(168,223,214,0.14), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255,158,125,0.12), transparent 50%), linear-gradient(165deg, #0a2226 0%, #07191d 55%, #051214 100%)",
          }}
        >
          {/* Grain + vignette */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.11]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)",
              backgroundSize: "14px 14px",
              mixBlendMode: "overlay",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% 0%, transparent 30%, rgba(5,18,20,0.55) 100%)",
            }}
          />

          {/* Orbit accents */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#a8dfd6]/10" />
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full border border-[#ff9e7d]/10" />

          {/* Header */}
          <div className="relative z-10 flex shrink-0 items-center gap-3 px-5 pb-3 pt-5">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff9e7d] to-[#d96b4c] text-[#07191d] shadow-[0_10px_28px_rgba(255,158,125,0.35)]">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#07191d] bg-[#a8dfd6]" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-[1.05rem] font-semibold tracking-tight text-white">
                Claycity Companion
              </p>
              <p className="text-[11px] font-medium tracking-wide text-[#a8dfd6]/90">
                {streaming ? "Listening…" : "Here for your visit"}
              </p>
            </div>
            <a
              href="tel:+254721260994"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Call the clinic"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={listRef}
            className="relative z-10 flex-1 space-y-4 overflow-y-auto px-5 py-4"
          >
            {messages.map((m, i) => (
              <div
                key={m.id}
                className={`flex ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
                style={{
                  animation:
                    i === messages.length - 1
                      ? "chatRise 0.45s cubic-bezier(0.22, 1, 0.36, 1) both"
                      : undefined,
                }}
              >
                {m.role === "assistant" && (
                  <div className="mr-2 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a8dfd6]/25 to-[#a8dfd6]/5 text-[#a8dfd6]">
                    <HeartPulse className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] px-4 py-3 text-[13.5px] leading-[1.55] ${
                    m.role === "user"
                      ? "rounded-[1.25rem] rounded-br-md bg-gradient-to-br from-[#ff9e7d] to-[#e88766] text-[#07191d] shadow-[0_8px_24px_rgba(255,158,125,0.22)]"
                      : "rounded-[1.25rem] rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-white/90 backdrop-blur-sm"
                  }`}
                >
                  {m.content ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-white/45">
                      <span className="flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8dfd6]" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8dfd6]" style={{ animationDelay: "120ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#a8dfd6]" style={{ animationDelay: "240ms" }} />
                      </span>
                      Gathering a thought
                    </span>
                  )}
                </div>
              </div>
            ))}

            {messages.length <= 1 && (
              <div className="pt-2">
                <p className="mb-2.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/30">
                  A gentle start
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={streaming}
                      onClick={() => void send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-left text-[12px] font-medium text-white/70 transition hover:border-[#a8dfd6]/35 hover:bg-white/[0.08] hover:text-white disabled:opacity-40"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="relative z-10 shrink-0 border-t border-white/[0.06] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <div className="flex items-end gap-2 rounded-[1.35rem] border border-white/10 bg-white/[0.05] px-3 py-2.5 shadow-inner transition focus-within:border-[#a8dfd6]/40 focus-within:bg-white/[0.07]">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask anything about the clinic…"
                disabled={streaming}
                className="max-h-28 min-h-[2.5rem] flex-1 resize-none bg-transparent px-1.5 py-2 text-[13.5px] text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => void send(input)}
                disabled={streaming || !input.trim()}
                aria-label="Send"
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] text-[#07191d] shadow-[0_8px_20px_rgba(255,158,125,0.3)] transition enabled:hover:brightness-110 enabled:hover:scale-105 disabled:opacity-35"
              >
                <ArrowUp className="h-4.5 w-4.5" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-2.5 text-center text-[10px] tracking-wide text-white/25">
              Clinic guidance only · Emergencies need local services
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes chatRise {
          from {
            opacity: 0;
            transform: translate3d(0, 12px, 0);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
