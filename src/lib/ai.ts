// Simulated AI engine. Produces structured, templated outputs so the UI
// is fully usable without a backend. Swap with a real call to the
// Lovable AI Gateway when ready.

export type AIInput = Record<string, string>;

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function generateEmail(input: AIInput): Promise<string> {
  await delay(700);
  const { recipient = "Team", purpose = "", tone = "Professional", context = "" } = input;
  const opener =
    tone === "Friendly"
      ? `Hi ${recipient},\n\nHope you're having a great week!`
      : tone === "Persuasive"
      ? `Hi ${recipient},\n\nI wanted to reach out about something I think is worth your time.`
      : `Hi ${recipient},\n\nI hope this message finds you well.`;

  return `${opener}

${purpose ? `I'm writing regarding ${purpose.toLowerCase()}.` : ""} ${
    context ? context : ""
  }

To summarize the key points:
• Context and background are outlined above
• Next steps are clear and actionable
• I'm available to discuss further at your convenience

Please let me know your thoughts, or if there's anything you'd like me to clarify.

Best regards,
[Your name]`;
}

export async function summarizeMeeting(input: AIInput): Promise<string> {
  await delay(900);
  const { notes = "" } = input;
  const lines = notes.split(/\n+/).filter(Boolean).slice(0, 6);
  const bullets = lines.length
    ? lines.map((l, i) => `${i + 1}. ${l.replace(/^[-•\d.\s]+/, "").trim()}`)
    : ["1. No notes provided — paste a transcript or rough notes to get a summary."];

  return `## Meeting Summary

**Overview**
A concise recap of the discussion, surfacing decisions, owners, and risks.

**Key Discussion Points**
${bullets.join("\n")}

**Decisions Made**
- Align on scope and timeline
- Confirm owners for each workstream

**Action Items**
- [ ] Owner A — follow up on open questions (due this week)
- [ ] Owner B — share draft for review
- [ ] Owner C — schedule next check-in

**Risks & Open Questions**
- Dependencies still being clarified
- Budget approval pending`;
}

export async function planTasks(input: AIInput): Promise<string> {
  await delay(800);
  const { goal = "your project", deadline = "this week", constraints = "" } = input;
  return `# Plan: ${goal}

Target: **${deadline}**${constraints ? ` · Constraints: ${constraints}` : ""}

## Today
- [ ] Define success criteria and scope
- [ ] Identify stakeholders and decision-makers
- [ ] Draft a one-pager outlining the approach

## This Week
- [ ] Break down work into 4–6 milestones
- [ ] Assign owners and rough estimates
- [ ] Set up tracking (board, doc, or sheet)
- [ ] Schedule a kickoff and review cadence

## Next Steps
- [ ] Mid-point review against success criteria
- [ ] Risk check: blockers, dependencies, scope creep
- [ ] Final QA + sign-off

## Suggested Daily Rhythm
- Morning: 25-min focus block on highest-priority milestone
- Midday: async updates to stakeholders
- End of day: log progress + flag blockers`;
}

export async function research(input: AIInput): Promise<string> {
  await delay(1000);
  const { topic = "the topic", depth = "Overview" } = input;
  return `# Research: ${topic}

_Depth: ${depth}_

## Executive Summary
A structured starting point on **${topic}** — synthesized from common public sources. Verify specifics with primary sources before citing.

## Key Themes
1. **Definition & scope** — what ${topic} typically refers to and where boundaries blur
2. **Why it matters now** — recent shifts driving attention
3. **Major players / approaches** — the dominant camps and tradeoffs
4. **Common pitfalls** — where teams typically get this wrong

## Suggested Reading Paths
- Foundational overview (1–2 reputable explainers)
- One contrarian or critical perspective
- A recent case study (last 12 months)

## Open Questions to Investigate
- What metrics best capture progress here?
- Which constraints are technical vs. organizational?
- What would change your conclusion?

> Note: This is an AI-generated research scaffold. Validate facts and add citations before sharing externally.`;
}

export async function chat(history: { role: "user" | "assistant"; content: string }[]): Promise<string> {
  await delay(600);
  const last = history.filter((m) => m.role === "user").at(-1)?.content ?? "";
  if (!last.trim()) return "Ask me anything about your workday — drafting, planning, summarizing, or brainstorming.";
  return `Here's how I'd think about that:

1. **Reframe the goal** — "${last.slice(0, 120)}${last.length > 120 ? "…" : ""}" — what's the underlying outcome you want?
2. **Quick options** — two or three lightweight ways to move forward today.
3. **First small step** — the smallest thing you could ship in the next 30 minutes.

Want me to draft an email, build a task plan, or summarize something for you next?`;
}
