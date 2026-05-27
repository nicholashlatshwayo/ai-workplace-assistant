import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, FileText, ListTodo, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    to: "/email" as const,
    title: "Smart Email Generator",
    desc: "Draft polished emails in your tone in seconds.",
    icon: Mail,
  },
  {
    to: "/meetings" as const,
    title: "Meeting Notes Summarizer",
    desc: "Turn rough notes into clear summaries and action items.",
    icon: FileText,
  },
  {
    to: "/tasks" as const,
    title: "AI Task Planner",
    desc: "Break goals into a structured plan with milestones.",
    icon: ListTodo,
  },
  {
    to: "/research" as const,
    title: "AI Research Assistant",
    desc: "Quick scaffolded briefs on any topic, with open questions.",
    icon: Search,
  },
  {
    to: "/chat" as const,
    title: "AI Chatbot",
    desc: "Conversational helper for everything in between.",
    icon: MessageSquare,
  },
];

const stats = [
  { label: "Hours saved this week", value: "12.4" },
  { label: "Drafts generated", value: "38" },
  { label: "Active workflows", value: "5" },
];

function Dashboard() {
  return (
    <AppLayout
      title="Dashboard"
      description="Your AI workplace productivity assistant."
    >
      <section className="rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-6 md:p-8">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary">
          <Sparkles className="h-3.5 w-3.5" /> Welcome to AI-powered-assistant
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
          Welcome to AI-powered-assistant
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Your AI assistant helps you draft, summarize, plan, and research — so you can spend
          less time on busywork and more on the work that matters.
        </p>
      </section>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 text-2xl font-semibold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="mt-8">
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          AI tools
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <Link key={t.to} to={t.to} className="group">
                <Card className="h-full transition-all hover:border-primary/40 hover:shadow-sm">
                  <CardHeader className="space-y-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{t.title}</CardTitle>
                      <CardDescription className="mt-1 text-xs">
                        {t.desc}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm font-medium text-primary">
                      Open tool
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 rounded-lg border bg-muted/30 p-4 text-xs text-muted-foreground">
        <strong className="text-foreground">Responsible AI:</strong> This tool
        generates suggestions, not facts. Review outputs for accuracy, bias, and
        sensitive content before sharing. Avoid pasting confidential data.
      </section>
    </AppLayout>
  );
}
