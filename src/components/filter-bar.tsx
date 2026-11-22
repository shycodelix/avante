import Link from "next/link";

import { cn } from "@/lib/cn";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterGroup {
  key: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  basePath: string;
  groups: FilterGroup[];
  current: Record<string, string | undefined>;
  searchPlaceholder?: string;
  resultLabel?: string;
}

function hrefFor(
  basePath: string,
  current: Record<string, string | undefined>,
  key: string,
  value: string,
): string {
  const params = new URLSearchParams();
  for (const [name, raw] of Object.entries(current)) {
    if (!raw || name === key) continue;
    params.set(name, raw);
  }
  if (value !== "all") params.set(key, value);
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

/**
 * Filters are plain links and the search is a native GET form, so every view is
 * shareable, crawlable and functional before hydration.
 */
export function FilterBar({
  basePath,
  groups,
  current,
  searchPlaceholder = "Search",
  resultLabel,
}: FilterBarProps) {
  return (
    <div className="border-b border-bone/10 bg-ink/90">
      <div className="wrap py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-3">
            {groups.map((group) => {
              const activeValue = current[group.key] ?? "all";
              return (
                <div
                  key={group.key}
                  className="flex items-start gap-3"
                >
                  <span className="mt-[5px] w-[62px] shrink-0 text-[10px] leading-tight text-bone/35">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.options.map((option) => {
                      const active = option.value === activeValue;
                      return (
                        <Link
                          key={option.value}
                          href={hrefFor(basePath, current, group.key, option.value)}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "shrink-0 border px-2.5 py-1 text-[11px] transition-colors",
                            active
                              ? "border-bone bg-bone text-ink"
                              : "border-bone/15 text-bone/55 hover:border-bone/40 hover:text-bone",
                          )}
                        >
                          {option.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-3 lg:w-[320px] lg:shrink-0">
            <form
              action={basePath}
              method="get"
              className="relative flex-1"
              role="search"
            >
              {Object.entries(current)
                .filter(([key, value]) => value && key !== "q")
                .map(([key, value]) => (
                  <input key={key} type="hidden" name={key} value={value} />
                ))}
              <input
                type="search"
                name="q"
                defaultValue={current.q ?? ""}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full border border-bone/15 bg-transparent py-2 pl-3 pr-16 text-[12px] text-bone placeholder:text-bone/30 focus:border-bone/40 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute inset-y-1 right-1 px-2.5 text-[11px] text-bone/55 transition-colors hover:text-bone"
              >
                Search
              </button>
            </form>
          </div>
        </div>

        {resultLabel && (
          <p className="mt-3 text-[11px] text-bone/35">{resultLabel}</p>
        )}
      </div>
    </div>
  );
}
