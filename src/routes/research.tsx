import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AIToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { research } from "@/lib/ai";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
});

function ResearchPage() {
  const [topic, setTopic] = useState("");
  const [depth, setDepth] = useState("Overview");

  return (
    <AppLayout
      title="AI Research Assistant"
      description="Scaffold a research brief on any topic in seconds."
    >
      <AIToolShell
        icon={<Search className="h-5 w-5" />}
        title="Research a topic"
        description="We'll generate a structured brief with key themes and open questions."
        onGenerate={() => research({ topic, depth })}
        promptForm={
          <>
            <div className="grid gap-2">
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g. AI agents in customer support"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Depth</Label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Overview">Overview</SelectItem>
                  <SelectItem value="Deep dive">Deep dive</SelectItem>
                  <SelectItem value="Competitive scan">Competitive scan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        }
      />
    </AppLayout>
  );
}
