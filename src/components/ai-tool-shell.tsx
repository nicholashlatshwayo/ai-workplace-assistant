import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Sparkles, Copy, RotateCcw, Check } from "lucide-react";
import { toast } from "sonner";

export function AIToolShell({
  icon,
  title,
  description,
  promptForm,
  onGenerate,
  outputLabel = "AI Output (editable)",
  emptyHint = "Fill in the prompt and click Generate to see results.",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  promptForm: ReactNode;
  onGenerate: () => Promise<string>;
  outputLabel?: string;
  emptyHint?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await onGenerate();
      setOutput(result);
    } catch (e) {
      toast.error("Something went wrong generating that. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
              {icon}
            </div>
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription className="text-xs">{description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {promptForm}
          <Button onClick={handleGenerate} disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating…
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" /> Generate with AI
              </>
            )}
          </Button>
          <p className="text-[11px] leading-relaxed text-muted-foreground">
            Outputs are AI-generated. Review for accuracy before sending or sharing.
            Do not paste confidential data.
          </p>
        </CardContent>
      </Card>

      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">{outputLabel}</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOutput("")}
              disabled={!output || loading}
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5" /> Clear
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              disabled={!output}
            >
              {copied ? (
                <Check className="mr-1 h-3.5 w-3.5" />
              ) : (
                <Copy className="mr-1 h-3.5 w-3.5" />
              )}
              Copy
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          {output || loading ? (
            <Textarea
              value={loading ? "" : output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder={loading ? "Thinking…" : ""}
              className="min-h-[420px] resize-none font-mono text-sm leading-relaxed"
            />
          ) : (
            <div className="flex min-h-[420px] flex-col items-center justify-center rounded-md border border-dashed text-center text-sm text-muted-foreground">
              <Sparkles className="mb-2 h-6 w-6 opacity-50" />
              {emptyHint}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
