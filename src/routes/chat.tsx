import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Send, Sparkles, Loader2, User } from "lucide-react";
import { chat } from "@/lib/ai";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Message = { role: "user" | "assistant"; content: string };

const STARTER: Message[] = [
  {
    role: "assistant",
    content:
      "Hi! I'm Lumen. Ask me to draft something, plan your day, brainstorm, or summarize. What can I help with?",
  },
];

function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(STARTER);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await chat(next);
      setMessages([...next, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <AppLayout title="AI Chat" description="A general-purpose workplace assistant.">
      <Card className="mx-auto flex h-[calc(100vh-13rem)] max-w-3xl flex-col overflow-hidden">
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 md:p-6">
          {messages.map((m, i) => (
            <MessageBubble key={i} message={m} />
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
            </div>
          )}
        </div>
        <div className="border-t bg-background p-3 md:p-4">
          <div className="flex items-end gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Message Lumen… (Enter to send, Shift+Enter for new line)"
              className="min-h-12 max-h-40 resize-none"
              rows={1}
            />
            <Button onClick={send} disabled={loading || !input.trim()} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            AI responses may be inaccurate. Don't share confidential information.
          </p>
        </div>
      </Card>
    </AppLayout>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary",
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "rounded-tr-sm bg-primary text-primary-foreground"
            : "rounded-tl-sm bg-muted text-foreground",
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
