import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  ListTodo,
  Search,
  MessageSquare,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Smart Email", icon: Mail },
  { to: "/meetings", label: "Meeting Notes", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: ListTodo },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
] as const;

export function AppLayout({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r bg-sidebar lg:flex">
        <SidebarContent currentPath={location.pathname} />
      </aside>

      {/* Sidebar (mobile drawer) */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-sidebar lg:hidden">
            <SidebarContent
              currentPath={location.pathname}
              onNavigate={() => setOpen(false)}
            />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur md:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight">{title}</h1>
            {description && (
              <p className="hidden truncate text-xs text-muted-foreground md:block">
                {description}
              </p>
            )}
          </div>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              Pro plan
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              AK
            </div>
          </div>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>

        <footer className="border-t bg-background/60 px-4 py-6 text-center text-xs text-muted-foreground md:px-8">
          <p className="max-w-2xl mx-auto leading-relaxed">
            © 2026 AI Workplace Productivity Assistant | Developed by Nicholas P Hlatshwayo | All Rights Reserved
          </p>
          <p className="mt-2 max-w-2xl mx-auto leading-relaxed opacity-80">
            AI outputs may be inaccurate. Always review before sending or sharing.
          </p>
        </footer>
      </div>
    </div>
  );
}

function SidebarContent({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <div className="flex h-16 items-center justify-between border-b px-5">
        <Link
          to="/"
          onClick={onNavigate}
          className="flex min-w-0 items-center gap-2 font-semibold text-sidebar-foreground"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="truncate">Nicholas P Hlathwayo</span>
        </Link>
        {onNavigate && (
          <button onClick={onNavigate} className="lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active =
            item.to === "/"
              ? currentPath === "/"
              : currentPath.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-lg border bg-background p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground">Responsible AI</p>
        <p className="mt-1 leading-relaxed">
          Outputs are AI-generated suggestions. Review for accuracy, bias, and
          confidentiality before use.
        </p>
      </div>
    </>
  );
}
