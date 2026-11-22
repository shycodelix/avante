import type { Metadata } from "next";

import { EventList } from "@/components/event-list";
import { FilterBar } from "@/components/filter-bar";
import { PageHeader } from "@/components/page-header";
import { getEvents, getTitles } from "@/lib/content";
import type { EventFormat, TitleId } from "@/lib/types";

export const metadata: Metadata = {
  title: "Events",
  description:
    "LANs, online cups, studio nights and build evenings: the Avante events calendar across every title we cover.",
};

export const revalidate = 600;

interface EventsPageProps {
  searchParams: Promise<{ format?: string; title?: string }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const params = await searchParams;
  const format = (params.format ?? "all") as EventFormat | "all";
  const titleId = (params.title ?? "all") as TitleId | "all";

  const [events, titles] = await Promise.all([
    getEvents({ format, titleId }),
    Promise.resolve(getTitles()),
  ]);

  return (
    <>
      <PageHeader
        label="Events"
        title={
          <>
            Where the scene
            <br />
            gets in a room.
          </>
        }
        description="Arena weekends, online cups and the studio nights we host in Berlin. Dates are local to the venue; everything else is on the matches desk."
        meta={[
          { label: "On the calendar", value: String(events.length) },
          { label: "Time zone", value: "CET" },
        ]}
      />

      <FilterBar
        basePath="/events"
        groups={[
          {
            key: "format",
            label: "Format",
            options: [
              { value: "all", label: "Everything" },
              { value: "lan", label: "On site" },
              { value: "online", label: "Online" },
              { value: "hybrid", label: "Hybrid" },
            ],
          },
          {
            key: "title",
            label: "Title",
            options: [
              { value: "all", label: "All titles" },
              ...titles.map((title) => ({ value: title.id, label: title.short })),
            ],
          },
        ]}
        current={{ format: params.format, title: params.title }}
        searchPlaceholder="Search events"
        resultLabel={`${events.length} dates in view`}
      />

      <div className="wrap py-12 md:py-16">
        <EventList events={events} />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-bone/10 pt-5 text-[11px] text-bone/35">
          <span>
            Press and creator accreditation opens four weeks before each arena
            event.
          </span>
          <a
            href="mailto:newsroom@avante.gg"
            className="text-bone/60 underline decoration-bone/30 underline-offset-4 transition-colors hover:text-bone"
          >
            newsroom@avante.gg
          </a>
        </div>
      </div>
    </>
  );
}
