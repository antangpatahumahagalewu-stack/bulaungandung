import { cn } from "@/lib/utils";

interface ProcessStep {
  icon?: string;
  title: string;
  description: string;
}

interface ProcessFlowProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessFlow({ steps, className }: ProcessFlowProps) {
  return (
    <div className={cn("", className)}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-2xl">
              {step.icon || <span className="text-accent font-bold">{index + 1}</span>}
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-0.5 w-[calc(100%-4rem)] bg-border lg:block" />
            )}
            <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
