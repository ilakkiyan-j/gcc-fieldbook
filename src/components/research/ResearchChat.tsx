"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";
import { EvidenceClaim } from "@/types/domain";
import { SuggestedPrompts } from "@/components/research/SuggestedPrompts";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: EvidenceClaim[];
  model?: string;
  isFallback?: boolean;
  timestamp: string;
}

interface ResearchChatProps {
  onCitationsUpdated: (citations: EvidenceClaim[]) => void;
  onCitationClicked: (code: string) => void;
}

export function ResearchChat({
  onCitationsUpdated,
  onCitationClicked,
}: ResearchChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-msg",
      role: "assistant",
      content:
        "Welcome to the **GCC Fieldbook Research Copilot**. Every statement I generate is strictly bound to our verified corporate filings, real estate benchmarks, and state policy gazettes. All factual assertions are tagged with auditable citation codes like `[CLM-GS-01]`.\n\nWhat would you like to research about India's GCC ecosystem?",
      timestamp: "Just now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Container-scoped auto-scroll: only scrolls the internal message container
  // when user interacts, avoiding scrolling the window on initial page load
  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, isLoading]);

  const handleSubmit = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || isLoading) return;

    setError(null);
    setInput("");

    // Append user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.message || `Request failed with status ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.answer,
        citations: data.citations || [],
        model: data.model,
        isFallback: data.isFallback,
        timestamp: "Just now",
      };

      setMessages((prev) => [...prev, assistantMsg]);
      onCitationsUpdated(data.citations || []);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to render inline spans: citations, bold, code
  const renderInlineSegment = (text: string) => {
    const parts = text.split(/(\[CLM-[A-Za-z0-9_-]+\]|`[^`]+`|\*\*[^*]+\*\*)/g);

    return parts.map((part, idx) => {
      // Citation button [CLM-...]
      const clmMatch = part.match(/^\[?(CLM-[A-Za-z0-9_-]+)\]?$/);
      if (clmMatch) {
        const code = clmMatch[1];
        return (
          <button
            key={idx}
            type="button"
            onClick={() => onCitationClicked(code)}
            className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-bold bg-brand-soft text-brand-ink border border-brand/30 hover:bg-brand hover:text-white transition-colors cursor-pointer"
            title={`Inspect citation ${code}`}
          >
            [{code}]
          </button>
        );
      }

      // Inline code `...`
      if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
        const inner = part.slice(1, -1);
        const innerClm = inner.match(/^\[?(CLM-[A-Za-z0-9_-]+)\]?$/);
        if (innerClm) {
          const code = innerClm[1];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => onCitationClicked(code)}
              className="inline-flex items-center px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono font-bold bg-brand-soft text-brand-ink border border-brand/30 hover:bg-brand hover:text-white transition-colors cursor-pointer"
              title={`Inspect citation ${code}`}
            >
              [{code}]
            </button>
          );
        }
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 mx-0.5 rounded font-mono text-[11px] bg-white text-brand border border-border-neutral/70 font-semibold"
          >
            {inner}
          </code>
        );
      }

      // Bold text **...**
      if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
        return (
          <strong key={idx} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        );
      }

      return <span key={idx}>{part}</span>;
    });
  };

  // Helper to render message content with rich formatting, bullets, bold, and interactive citations
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }

      // Bullet item
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        const text = line.trim().replace(/^[-•]\s*/, "");
        return (
          <div key={idx} className="flex items-start gap-2 py-0.5 ml-1">
            <span className="text-brand font-bold mt-1 text-[10px] leading-none">&bull;</span>
            <div className="flex-1 leading-relaxed text-xs sm:text-sm text-ink">
              {renderInlineSegment(text)}
            </div>
          </div>
        );
      }

      // Numbered item
      const numMatch = line.trim().match(/^(\d+)\.\s*(.*)$/);
      if (numMatch) {
        return (
          <div key={idx} className="flex items-start gap-2 py-0.5 ml-1">
            <span className="font-mono font-bold text-brand text-xs min-w-[18px]">
              {numMatch[1]}.
            </span>
            <div className="flex-1 leading-relaxed text-xs sm:text-sm text-ink">
              {renderInlineSegment(numMatch[2])}
            </div>
          </div>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} className="text-xs sm:text-sm text-ink leading-relaxed my-1">
          {renderInlineSegment(line)}
        </p>
      );
    });
  };

  return (
    <div className="rounded-xl border border-border-neutral bg-white p-5 shadow-2xs flex flex-col h-[650px] justify-between">
      {/* Messages Stream */}
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isUser
                    ? "bg-ink text-white"
                    : "bg-brand text-white"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? "bg-brand text-white font-medium shadow-2xs"
                    : "bg-surface-subtle/80 text-ink border border-border-neutral/70 shadow-2xs"
                }`}
              >
                <div>
                  {isUser ? <p className="whitespace-pre-wrap">{msg.content}</p> : renderMessageContent(msg.content)}
                </div>

                {!isUser && (msg.model || msg.citations) && (
                  <div className="mt-3 pt-2.5 border-t border-border-neutral/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted">
                    <span className="font-mono">
                      Engine: <strong className="text-ink font-semibold">{msg.model || "Gemini"}</strong>
                      {msg.isFallback && " (Deterministic Fallback)"}
                    </span>
                    {msg.citations && msg.citations.length > 0 && (
                      <span className="text-emerald-700 font-medium">
                        &bull; {msg.citations.length} verified citations
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-surface-subtle/80 rounded-xl p-4 text-xs text-ink-secondary border border-border-neutral flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand" />
              <span>Retrieving source evidence and validating citations...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>Synthesis error: {error}</span>
          </div>
        )}
      </div>

      {/* Footer Area: Prompts + Input */}
      <div className="pt-4 border-t border-border-neutral/60 space-y-3">
        {messages.length <= 2 && (
          <SuggestedPrompts
            onSelectPrompt={(p) => handleSubmit(p)}
            disabled={isLoading}
          />
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask a question across verified GCC filings and policies..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-border-neutral bg-surface-subtle text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:outline-hidden focus:ring-2 focus:ring-brand focus:border-brand transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-brand text-white text-xs font-semibold hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-2xs flex items-center gap-1.5 shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
