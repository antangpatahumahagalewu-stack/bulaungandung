"use client";

import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import type { TimelineItem } from "@/types";

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export function Timeline({ items, className }: TimelineProps) {
  const locale = useLocale();

  return (
    <div className={cn("relative", className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-border sm:left-1/2 sm:-translate-x-px" />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div
              key={item.year}
              className={`relative flex flex-col sm:flex-row ${
                isLeft ? "sm:flex-row" : "sm:flex-row-reverse"
              } items-start gap-4 sm:gap-8`}
            >
              {/* Dot */}
              <div className="absolute left-4 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-primary bg-background sm:left-1/2" />

              {/* Year label */}
              <div
                className={`ml-12 sm:ml-0 sm:w-1/2 ${
                  isLeft ? "sm:pr-8 sm:text-right" : "sm:pl-8 sm:text-left"
                }`}
              >
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {item.year}
                </span>
              </div>

              {/* Content */}
              <div
                className={`ml-12 sm:ml-0 sm:w-1/2 ${
                  isLeft ? "sm:pl-8" : "sm:pr-8"
                }`}
              >
                <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
