"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowUp,
  HeartPulse,
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
  "When are you open?",
  "Do you have a pharmacy?",
  "Can I walk in today?",
  "How do I find you?",
  "What care do you offer?",
];

const FALLBACK =
  "I'm resting for a moment. Please try again, or call us on 0712 265746 — we're here for you.";

const PHONE_DISPLAY = "0712 265746";
const PHONE_TEL = "+254712265746";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">");
}

/** Lightweight markdown → React for chat bubbles */
function MarkdownText({ text, className }: { text: string; className?: string }) {
  const blocks = text.replace(/\r\n/g, "\n").split(/\n{2,}/);

  const renderInline = (line: string): ReactNode[] => {
    const nodes: ReactNode[] = [];
    // **bold**, *italic*, `code`, [label](url)
    const re =
      /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    let last = 0;
    let m: RegExpExecArray | null;
    let key = 0;
    while ((m = re.exec(line)) !== null) {
      if (m.index > last) {
        nodes.push(line.slice(last, m.index));
      }
      const token = m[0];
      if (token.startsWith("**")) {
        nodes.push(
          <strong key={key++} className="font-semibold">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith("*")) {
        nodes.push(
          <em key={key++} className="italic">
            {token.slice(1, -1)}
          </em>
        );
      } else if (token.startsWith("`")) {
        nodes.push(
          <code
            key={key++}
            className="rounded bg-white/10 px-1 py-0.5 text-[0.9em]"
          >
            {token.slice(1, -1)}
          </code>
        );
      } else if (token.startsWith("[")) {
        const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
          nodes.push(
            <a
              key={key++}
              href={linkMatch[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-white/30 underline-offset-2 hover:decoration-white/70"
            >
              {linkMatch[1]}
            </a>
          );
        } else {
          nodes.push(token);
        }
      }
      last = m.index + token.length;
    }
    if (last < line.length) nodes.push(line.slice(last));
    return nodes;
  };

  return (
    <div className={className}>
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.length > 0);
        const isUl = lines.every((l) => /^[-*]\s+/.test(l));
        const isOl = lines.every((l) => /^\d+[.)]\s+/.test(l));

        if (isUl) {
          return (
            <ul key={bi} className="my-1.5 list-disc space-y-1 pl-4">
              {lines.map((l, i) => (
                <li key={i}>{renderInline(l.replace(/^[-*]\s+/, ""))}</li>
              ))}
            </ul>
          );
        }
        if (isOl) {
          return (
            <ol key={bi} className="my-1.5 list-decimal space-y-1 pl-4">
              {lines.map((l, i) => (
                <li key={i}>{renderInline(l.replace(/^\d+[.)]\s+/, ""))}</li>
              ))}
            </ol>
          );
        }

        return (
          <p key={bi} className={bi > 0 ? "mt-2" : undefined}>
            {lines.map((l, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {renderInline(l)}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
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
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open AI assistant for instant clinic answers"
        className={`group fixed z-[70] bottom-[5.75rem] right-3 sm:right-4 lg:bottom-7 lg:right-7 ${
          open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
        } transition-all duration-500`}
      >
        <span className="flex items-center overflow-hidden rounded-full border border-white/15 bg-[#07191d]/95 shadow-[0_16px_40px_rgba(7,25,29,0.45)] backdrop-blur-md">
          <span className="relative flex h-12 w-12 shrink-0 items-center justify-center sm:h-14 sm:w-14">
            <span className="absolute inset-1 rounded-full bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] opacity-90" />
            <MessageCircle className="relative h-5 w-5 text-[#07191d]" strokeWidth={2.2} />
            <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#07191d] bg-[#a8dfd6]" />
          </span>
          <span className="hidden pr-4 text-left sm:block">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#a8dfd6]">
              AI assistant
            </span>
            <span className="block text-[12px] font-semibold leading-tight text-white">
              Instant answers
            </span>
          </span>
        </span>
        <span className="absolute -left-1 top-1/2 -translate-x-full -translate-y-1/2 whitespace-nowrap rounded-full border border-[#a8dfd6]/30 bg-[#0a2226]/95 px-2.5 py-1 text-[10px] font-bold text-[#a8dfd6] shadow-lg sm:hidden">
          Ask AI
        </span>
      </button>

      <div
        className={`fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:justify-end sm:p-4 lg:p-8 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <button
          type="button"
          aria-label="Close companion"
          className={`absolute inset-0 bg-[#041214]/75 backdrop-blur-md transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Claycity AI assistant"
          className={`relative flex h-[min(100svh,100%)] w-full flex-col overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.55)] transition-all duration-500 max-sm:rounded-none sm:h-[min(88svh,680px)] sm:max-w-[400px] sm:rounded-[1.75rem] lg:max-w-[420px] ${
            open
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-10 scale-[0.97] opacity-0"
          }`}
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 20% -10%, rgba(168,223,214,0.14), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255,158,125,0.12), transparent 50%), linear-gradient(165deg, #0a2226 0%, #07191d 55%, #051214 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.11]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,0.55) 0.5px, transparent 0.5px)",
              backgroundSize: "14px 14px",
              mixBlendMode: "overlay",
            }}
          />

          <div className="relative z-10 flex shrink-0 items-center gap-2.5 px-3.5 pb-2.5 pt-[max(0.85rem,env(safe-area-inset-top))] sm:gap-3 sm:px-5 sm:pb-3 sm:pt-5">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff9e7d] to-[#d96b4c] text-[#07191d] shadow-[0_10px_28px_rgba(255,158,125,0.35)] sm:h-12 sm:w-12 sm:rounded-2xl">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#07191d] bg-[#a8dfd6] sm:h-3 sm:w-3" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[0.95rem] font-semibold tracking-tight text-white sm:text-[1.05rem]">
                Claycity AI Assistant
              </p>
              <p className="text-[10px] font-medium tracking-wide text-[#a8dfd6]/90 sm:text-[11px]">
                {streaming ? "Listening…" : "Instant answers about the clinic"}
              </p>
            </div>
            <a
              href={`tel:${PHONE_TEL}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:bg-white/10 sm:h-10 sm:w-10"
              aria-label={`Call ${PHONE_DISPLAY}`}
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-white/5 text-white/75 transition hover:bg-white/10 sm:h-10 sm:w-10"
              aria-label="Close"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>

          <div
            ref={listRef}
            className="relative z-10 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3.5 py-3 sm:space-y-4 sm:px-5 sm:py-4"
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
                  <div className="mr-1.5 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#a8dfd6]/25 to-[#a8dfd6]/5 text-[#a8dfd6] sm:mr-2 sm:mt-1 sm:h-7 sm:w-7">
                    <HeartPulse className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[88%] px-3 py-2.5 text-[13px] leading-[1.5] sm:max-w-[82%] sm:px-4 sm:py-3 sm:text-[13.5px] ${
                    m.role === "user"
                      ? "rounded-[1.1rem] rounded-br-md bg-gradient-to-br from-[#ff9e7d] to-[#e88766] text-[#07191d] shadow-[0_8px_24px_rgba(255,158,125,0.22)]"
                      : "rounded-[1.1rem] rounded-bl-md border border-white/[0.08] bg-white/[0.06] text-white/90"
                  }`}
                >
                  {m.content ? (
                    m.role === "assistant" ? (
                      <MarkdownText
                        text={m.content}
                        className="break-words [&_strong]:text-white"
                      />
                    ) : (
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                    )
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
              <div className="pt-1 sm:pt-2">
                <p className="mb-2 text-[9px] font-extrabold uppercase tracking-[0.16em] text-white/30 sm:text-[10px]">
                  Try asking
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={streaming}
                      onClick={() => void send(s)}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-left text-[11px] font-medium text-white/70 transition hover:border-[#a8dfd6]/35 hover:bg-white/[0.08] hover:text-white disabled:opacity-40 sm:px-3.5 sm:py-2 sm:text-[12px]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 shrink-0 border-t border-white/[0.06] px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2.5 sm:px-4 sm:pt-3">
            <div className="flex items-end gap-1.5 rounded-[1.2rem] border border-white/10 bg-white/[0.05] px-2.5 py-2 transition focus-within:border-[#a8dfd6]/40 sm:gap-2 sm:rounded-[1.35rem] sm:px-3 sm:py-2.5">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Ask the AI about the clinic…"
                disabled={streaming}
                className="max-h-24 min-h-[2.25rem] flex-1 resize-none bg-transparent px-1 py-1.5 text-[13px] text-white placeholder:text-white/30 focus:outline-none disabled:opacity-50 sm:min-h-[2.5rem] sm:text-[13.5px]"
              />
              <button
                type="button"
                onClick={() => void send(input)}
                disabled={streaming || !input.trim()}
                aria-label="Send"
                className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#ff9e7d] to-[#e07a5a] text-[#07191d] transition enabled:active:scale-95 sm:h-10 sm:w-10 disabled:opacity-35"
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-2 text-center text-[9px] tracking-wide text-white/25 sm:text-[10px]">
              AI clinic guide · Call {PHONE_DISPLAY} if you prefer
            </p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes chatRise {
          from { opacity: 0; transform: translate3d(0, 12px, 0); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </>
  );
}
