# AI-powered-assistant

An AI Workplace Productivity Assistant that helps professionals draft emails,
summarize meetings, plan tasks, research topics, and chat — so they can spend
less time on busywork and more on the work that matters.

Built for the **AI Skill Accelerator Programme** project brief
(AI-Powered Workplace Productivity Assistant).

---

## Project Overview

Knowledge workers lose hours every week on repetitive tasks: writing emails,
turning rough notes into summaries, planning their day, and researching
unfamiliar topics. **AI-powered-assistant** brings these workflows together
into one clean, responsive web app powered by modern AI tools and carefully
engineered prompts.

The assistant demonstrates:

- A real-world business use case (workplace productivity)
- Effective application of AI to automate professional tasks
- Strong prompt engineering with consistent, structured outputs
- Responsible AI practices — disclaimers, review prompts, no confidential data

---

## Features

1. **Smart Email Generator** — Draft professional emails with tone control
   (formal, friendly, persuasive) adapted to the audience.
2. **Meeting Notes Summarizer** — Turn rough notes or transcripts into clear
   summaries with key points, decisions, action items, and owners.
3. **AI Task Planner** — Break a goal and deadline into a structured plan
   with milestones, daily rhythm, and prioritized next steps.
4. **AI Research Assistant** — Generate a scaffolded brief on any topic with
   key themes, suggested reading paths, and open questions.
5. **AI Chatbot** — Conversational helper for everything in between —
   brainstorming, reframing problems, and suggesting next small steps.
6. **Responsible AI notice** — Every page reminds users to review outputs
   for accuracy and bias before sharing.

---

## Tools Used

| Layer            | Technology                                      |
| ---------------- | ----------------------------------------------- |
| Framework        | TanStack Start (React 19 + Vite 7, SSR-ready)   |
| Language         | TypeScript                                      |
| Styling          | Tailwind CSS v4 + semantic design tokens        |
| UI Components    | shadcn/ui (Radix primitives)                    |
| Icons            | lucide-react                                    |
| Data / State     | TanStack Query, TanStack Router                 |
| AI Engine        | Pluggable AI layer (`src/lib/ai.ts`) — ready to |
|                  | connect to the Lovable AI Gateway / LLM APIs    |
| Build / Deploy   | Vite, Cloudflare Workers (edge runtime)         |
| Design / Prompts | Custom prompt templates per workflow            |

---

## Setup Instructions

### Prerequisites

- [Bun](https://bun.sh) (recommended) or Node.js 20+
- Git

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd ai-powered-assistant
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the development server

```bash
bun run dev
```

The app will be available at <http://localhost:5173>.

### 4. Build for production

```bash
bun run build
```

### 5. (Optional) Connect a real AI provider

The current AI engine in `src/lib/ai.ts` returns structured templated
responses so the UI is fully usable without a backend. To wire in a real
model, replace the functions in that file with calls to your preferred
provider (e.g. the Lovable AI Gateway, OpenAI, or Gemini), and store any
required API keys as environment secrets — never commit them.

---

## Project Structure

```
src/
├── routes/          # File-based routes (TanStack Router)
│   ├── index.tsx    # Dashboard
│   ├── email.tsx    # Smart Email Generator
│   ├── meetings.tsx # Meeting Notes Summarizer
│   ├── tasks.tsx    # AI Task Planner
│   ├── research.tsx # AI Research Assistant
│   └── chat.tsx     # AI Chatbot
├── components/      # Layout + shadcn/ui components
├── lib/
│   └── ai.ts        # Pluggable AI engine
└── styles.css       # Design tokens (Tailwind v4)
```

---

## Responsible AI

This assistant generates **suggestions, not facts**. Always:

- Review outputs for accuracy, tone, and potential bias
- Validate any research claims against primary sources
- Avoid pasting confidential, personal, or regulated data
- Add a human review step before sending AI-drafted communication

---

## Author

**Nicholas P Hlatshwayo** — AI Skill Accelerator Programme, CAPACITI.
