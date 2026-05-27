import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AIToolShell } from "@/components/ai-tool-shell";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText } from "lucide-react";
import { summarizeMeeting } from "@/lib/ai";

export const Route = createFileRoute("/meetings")({
  component: MeetingsPage,
});

function MeetingsPage() {
  const [notes, setNotes] = useState("");

  return (
    <AppLayout
      title="Meeting Notes Summarizer"
      description="Paste rough notes — get a clean summary, decisions, and action items."
    >
      <AIToolShell
        icon={<FileText className="h-5 w-5" />}
        title="Summarize a meeting"
        description="Paste a transcript or notes (one point per line works best)."
        onGenerate={() => summarizeMeeting({ notes })}
        promptForm={
          <div className="grid gap-2">
            <Label htmlFor="notes">Meeting notes or transcript</Label>
            <Textarea
              id="notes"
              placeholder={`Paste your raw notes here...\n\n- Discussed Q3 roadmap\n- Sarah owns API redesign\n- Launch target: Oct 15`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-64"
            />
          </div>
        }
      />
    </AppLayout>
  );
}
