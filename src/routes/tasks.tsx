import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/app-layout";
import { AIToolShell } from "@/components/ai-tool-shell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ListTodo } from "lucide-react";
import { planTasks } from "@/lib/ai";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [constraints, setConstraints] = useState("");

  return (
    <AppLayout
      title="AI Task Planner"
      description="Turn a goal into a structured plan with milestones."
    >
      <AIToolShell
        icon={<ListTodo className="h-5 w-5" />}
        title="Plan a goal"
        description="Describe what you want to achieve and when."
        onGenerate={() => planTasks({ goal, deadline, constraints })}
        promptForm={
          <>
            <div className="grid gap-2">
              <Label htmlFor="goal">Goal</Label>
              <Input
                id="goal"
                placeholder="e.g. Launch new pricing page"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                placeholder="e.g. End of next sprint"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="constraints">Constraints (optional)</Label>
              <Textarea
                id="constraints"
                placeholder="Team size, dependencies, must-haves…"
                value={constraints}
                onChange={(e) => setConstraints(e.target.value)}
                className="min-h-20"
              />
            </div>
          </>
        }
      />
    </AppLayout>
  );
}
