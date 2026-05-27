import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AIToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { generateEmail } from "@/lib/ai";

export const Route = createFileRoute("/email")({
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [purpose, setPurpose] = useState("");
  const [tone, setTone] = useState("Professional");
  const [context, setContext] = useState("");

  return (
    <AppLayout
      title="Smart Email Generator"
      description="Draft polished, on-brand emails in seconds."
    >
      <AIToolShell
        icon={<Mail className="h-5 w-5" />}
        title="Email composer"
        description="Tell us who, what, and how — we'll draft it."
        onGenerate={() => generateEmail({ recipient, purpose, tone, context })}
        promptForm={
          <>
            <div className="grid gap-2">
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                placeholder="e.g. Sarah from Acme"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                placeholder="e.g. Follow up on yesterday's proposal"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Friendly">Friendly</SelectItem>
                  <SelectItem value="Persuasive">Persuasive</SelectItem>
                  <SelectItem value="Concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="context">Context / key points</Label>
              <Textarea
                id="context"
                placeholder="Anything the email should cover…"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-24"
              />
            </div>
          </>
        }
      />
    </AppLayout>
  );
}
