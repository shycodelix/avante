import { StatusBadge } from "@/components/status-badge";
import { formatMonth, formatMonthShort } from "@/lib/format";
import type { EventItem } from "@/lib/types";

export function EventList({ events }: { events: EventItem[] }) {
  if (events.length === 0) {
    return (
      <p className="border-t border-bone/10 py-10 text-sm text-bone/45">
        Nothing on the calendar for this filter yet. Try another desk.
      </p>
    );
  }

  const groups = new Map<string, EventItem[]>();
  for (const event of events) {
    const key = formatMonth(event.startDate);
    const bucket = groups.get(key) ?? [];
    bucket.push(event);
    groups.set(key, bucket);
  }

  return (
    <div>
      {Array.from(groups.entries()).map(([month, list]) => (
        <section
          key={month}
          className="grid gap-4 border-t border-bone/15 pt-6 md:grid-cols-[150px_1fr] md:gap-8"
        >
          <h2 className="font-display text-lg tracking-[-0.02em] text-bone/70 md:sticky md:top-24 md:self-start">
            {month}
          </h2>

          <ul>
            {list.map((event) => {
              const start = new Date(event.startDate);
              const end = new Date(event.endDate);
              const sameDay = event.startDate === event.endDate;

              return (
                <li
                  key={event.id}
                  className="grid gap-3 border-b border-bone/10 py-6 first:pt-0 md:grid-cols-[92px_1fr_auto] md:items-start md:gap-6"
                >
                  <div className="flex items-baseline gap-2 md:block">
                    <span className="font-display text-2xl leading-none tracking-tight text-bone tnum">
                      {start.getUTCDate()}
                      {!sameDay && `–${end.getUTCDate()}`}
                    </span>
                    <span className="text-[11px] text-bone/40 md:mt-1 md:block">
                      {formatMonthShort(event.startDate)}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg leading-snug tracking-[-0.02em] text-bone">
                      {event.name}
                    </h3>
                    <p className="mt-1 text-[11px] text-bone/40">
                      {event.venue} · {event.city}, {event.country} ·{" "}
                      {event.format === "lan" ? "On site" : event.format}
                    </p>
                    <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-bone/55">
                      {event.blurb}
                    </p>
                  </div>

                  <div className="flex md:justify-end">
                    <StatusBadge status={event.status} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
