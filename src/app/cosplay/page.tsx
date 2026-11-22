import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CosplayGallery } from "@/components/cosplay-gallery";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { getCosplay, getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "Cosplay",
  description:
    "Builds, makers and studio shoots: Avante documents cosplay as production, not costume.",
};

export const revalidate = 600;

export default async function CosplayPage() {
  const entries = await getCosplay();
  const [hero, second] = entries;
  const events = await getEvents({ upcomingOnly: true });
  const craftNight = events.find((event) => event.name.toLowerCase().includes("craft"));

  return (
    <>
      <PageHeader
        label="Cosplay desk"
        title={
          <>
            Twelve weeks of work,
            <br />
            one frame of it.
          </>
        }
        description="The scene is built by hand long before it reaches a stage. We photograph the makers, the materials and the repairs — not just the finished character."
        meta={[
          { label: "Features", value: String(entries.length) },
          { label: "Next build night", value: "12 Dec" },
        ]}
      />

      {hero && (
        <section className="wrap py-12 md:py-16">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <figure className="md:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden border border-bone/10 bg-ink-3 md:aspect-[4/3]">
                {hero.image && (
                  <Image
                    src={hero.image}
                    alt={hero.imageAlt ?? ""}
                    fill
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover object-[50%_24%]"
                  />
                )}
              </div>
              <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-3 text-[11px] text-bone/40">
                <span>
                  {hero.name} as {hero.character} · {hero.franchise}
                </span>
                <span>{hero.location}</span>
              </figcaption>
            </figure>

            <div className="md:col-span-5">
              <p className="text-[11px] text-bone/40">In the build room</p>
              <h2 className="display-lg mt-3">
                {hero.character}, built from foam and stubbornness.
              </h2>
              <blockquote className="mt-5 border-l border-cobalt pl-4 text-[14px] leading-relaxed text-bone/70">
                “{hero.quote}”
              </blockquote>
              <p className="mt-3 text-[11px] text-bone/40">
                {hero.name} · builder and model
              </p>

              <dl className="mt-8 space-y-2 border-t border-bone/10 pt-5 text-[12px]">
                <div className="flex justify-between gap-4">
                  <dt className="text-bone/35">Photography</dt>
                  <dd className="text-bone/70">{hero.photographer}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-bone/35">Materials</dt>
                  <dd className="max-w-[60%] text-right text-bone/70">
                    {hero.builder}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-bone/35">Tags</dt>
                  <dd className="max-w-[60%] text-right text-bone/70">
                    {hero.tags.join(", ")}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {second && (
            <div className="mt-14 grid gap-6 border-t border-bone/10 pt-8 md:grid-cols-2 md:items-center">
              <div className="relative aspect-[16/10] overflow-hidden border border-bone/10">
                {second.image && (
                  <Image
                    src={second.image}
                    alt={second.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 768px) 46vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div>
                <p className="text-[11px] text-bone/40">
                  {second.franchise} · {second.location}
                </p>
                <h2 className="display-lg mt-2">{second.character}</h2>
                <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-bone/55">
                  {second.quote ??
                    `Built and worn by ${second.name}, photographed by ${second.photographer}.`}
                </p>
                <p className="mt-4 text-[11px] text-bone/40">
                  {second.builder}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="border-y border-bone/10 bg-ink-2">
        <div className="wrap py-16 md:py-20">
          <SectionHeading
            eyebrow="Gallery"
            title="Every build in the series"
            description="Open any frame for the maker, the photographer, the materials and the parts that nearly broke."
            action={{ href: "/events", label: "Come to a build night" }}
          />
          <div className="mt-10">
            <CosplayGallery entries={entries} />
          </div>
        </div>
      </section>

      <section className="wrap py-16 md:py-20">
        <div className="grid gap-8 border border-bone/10 bg-ink-2 p-6 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-[11px] text-bone/40">Open studio</p>
            <h2 className="display-lg mt-2">
              {craftNight?.name ?? "Craft night at the studio"}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-bone/55">
              {craftNight?.blurb ??
                "An open build night with the makers in this series. Tools provided, bring your own project and a repair kit."}
            </p>
            <p className="mt-4 text-[11px] text-bone/35">
              {craftNight
                ? `${craftNight.venue} · ${craftNight.city} · ${craftNight.startDate}`
                : "Berlin · dates on the events desk"}
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-3 bg-bone px-5 py-3 text-[12px] font-medium text-ink transition-colors hover:bg-cobalt hover:text-white"
          >
            See the calendar <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
