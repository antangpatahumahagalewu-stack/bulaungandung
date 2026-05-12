"use client";

import { useLocale } from "next-intl";

interface RichTextProps {
  content: string;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  return (
    <div
      className={`prose prose-stone max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground ${className || ""}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
