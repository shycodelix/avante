import { TeamBadge } from "@/components/team-badge";
import { cn } from "@/lib/cn";
import type { StandingEntry } from "@/lib/content";
import type { FormResult } from "@/lib/types";

function FormRun({ form }: { form: FormResult[] }) {
  return (
    <span className="flex gap-1" aria-label={`Recent form: ${form.join(" ")}`}>
      {form.map((result, index) => (
        <span
          key={`${result}-${index}`}
          className={cn(
            "flex h-4 w-4 items-center justify-center text-[9px] leading-none",
            result === "W"
              ? "bg-bone/85 text-ink"
              : "border border-bone/20 text-bone/40",
          )}
        >
          {result}
        </span>
      ))}
    </span>
  );
}

export function StandingsTable({ rows }: { rows: StandingEntry[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <caption className="sr-only">
          League standings with matches played, wins, losses, map difference,
          points and recent form
        </caption>
        <thead>
          <tr className="border-b border-bone/15 text-left text-[10px] font-normal text-bone/40">
            <th scope="col" className="w-8 py-2 pr-2 font-normal">#</th>
            <th scope="col" className="py-2 pr-3 font-normal">Team</th>
            <th scope="col" className="hidden w-9 py-2 text-center font-normal sm:table-cell">P</th>
            <th scope="col" className="w-9 py-2 text-center font-normal">W</th>
            <th scope="col" className="hidden w-9 py-2 text-center font-normal sm:table-cell">L</th>
            <th scope="col" className="hidden w-11 py-2 text-center font-normal sm:table-cell">
              Map
            </th>
            <th scope="col" className="w-9 py-2 text-center font-normal">Pts</th>
            <th scope="col" className="hidden w-[92px] py-2 pl-3 font-normal md:table-cell">
              Form
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isHome = row.team.id.startsWith("avante");
            return (
              <tr
                key={row.teamId}
                className={cn(
                  "border-b border-bone/8 transition-colors hover:bg-bone/[0.04]",
                  isHome && "bg-cobalt/[0.10]",
                )}
              >
                <td className="py-2.5 pr-2 text-[11px] text-bone/40 tnum">
                  {row.rank}
                </td>
                <td className="py-2.5 pr-3">
                  <span className="flex items-center gap-2.5">
                    <TeamBadge team={row.team} size="sm" />
                    <span className={cn("truncate", isHome ? "text-bone" : "text-bone/80")}>
                      {row.team.name}
                    </span>
                  </span>
                </td>
                <td className="hidden py-2.5 text-center text-[12px] text-bone/50 tnum sm:table-cell">
                  {row.played}
                </td>
                <td className="py-2.5 text-center text-[12px] text-bone/80 tnum">
                  {row.wins}
                </td>
                <td className="hidden py-2.5 text-center text-[12px] text-bone/50 tnum sm:table-cell">
                  {row.losses}
                </td>
                <td className="hidden py-2.5 text-center text-[12px] text-bone/50 tnum sm:table-cell">
                  {row.mapDiff > 0 ? `+${row.mapDiff}` : row.mapDiff}
                </td>
                <td className="py-2.5 text-center font-display text-[13px] text-bone tnum">
                  {row.points}
                </td>
                <td className="hidden py-2.5 pl-3 md:table-cell">
                  <FormRun form={row.form} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
