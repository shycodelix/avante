import { cn } from "@/lib/cn";

interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  description?: string;
  meta?: { label: string; value: string }[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  label,
  title,
  description,
  meta,
  children,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("relative overflow-hidden border-b border-bone/10", className)}>
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="wrap relative pb-10 pt-10 md:pb-16 md:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="flex items-center gap-2 text-[11px] text-bone/50">
            <span className="h-1.5 w-1.5 bg-cobalt" aria-hidden />
            {label}
          </p>
          {meta && meta.length > 0 && (
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-bone/35">
              {meta.map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <dt>{item.label}</dt>
                  <dd className="text-bone/70 tnum">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <h1 className="display-xl mt-5 max-w-[18ch]">{title}</h1>

        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-bone/55">
            {description}
          </p>
        )}

        {children}
      </div>
    </header>
  );
}
