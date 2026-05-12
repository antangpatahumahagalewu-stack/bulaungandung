import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  className,
  centered = true,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-10",
        centered && "text-center",
        className
      )}
    >
      <h2 className="font-serif text-fg">
        {title}
      </h2>
      <div className={cn("mt-4", centered && "flex justify-center")}>
        <span className="accent-line" />
      </div>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-fg-dim max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
