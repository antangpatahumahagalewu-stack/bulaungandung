import * as React from "react";
import { cn } from "@/lib/utils";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = React.forwardRef<
  React.ElementRef<typeof AspectRatioPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AspectRatioPrimitive.Root
    ref={ref}
    ratio={16 / 9}
    className={cn("overflow-hidden rounded-md bg-muted", className)}
    {...props}
  />
));
AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
