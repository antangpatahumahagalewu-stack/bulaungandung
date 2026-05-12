import * as React from "react";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-bdr bg-card-bg px-4 py-3 text-sm text-fg placeholder:text-fg-dim/50 transition-all duration-300 focus-visible:outline-none focus-visible:border-acc/40 focus-visible:ring-2 focus-visible:ring-acc/10 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
