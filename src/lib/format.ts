/**
 * All dates are stored as ISO/UTC and rendered in the organisation's home
 * timezone. Pinning the timezone keeps server output and client hydration
 * identical — never format with the visitor's locale here.
 */
const TIME_ZONE = "Asia/Manila";
const LOCALE = "en-GB";

const dayMonth = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
  timeZone: TIME_ZONE,
});

const weekdayDayMonth = new Intl.DateTimeFormat(LOCALE, {
  weekday: "short",
  day: "numeric",
  month: "short",
  timeZone: TIME_ZONE,
});

const dayMonthYear = new Intl.DateTimeFormat(LOCALE, {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const monthYear = new Intl.DateTimeFormat(LOCALE, {
  month: "long",
  year: "numeric",
  timeZone: TIME_ZONE,
});

const monthOnly = new Intl.DateTimeFormat(LOCALE, {
  month: "short",
  timeZone: TIME_ZONE,
});

const timeOnly = new Intl.DateTimeFormat(LOCALE, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TIME_ZONE,
});

export function formatDayMonth(iso: string): string {
  return dayMonth.format(new Date(iso));
}

export function formatDate(iso: string): string {
  return dayMonthYear.format(new Date(iso));
}

export function formatWeekday(iso: string): string {
  return weekdayDayMonth.format(new Date(iso));
}

export function formatMonth(iso: string): string {
  return monthYear.format(new Date(iso));
}

export function formatMonthShort(iso: string): string {
  return monthOnly.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return timeOnly.format(new Date(iso));
}

/** "Sun 22 Nov · 18:00" */
export function formatKickoff(iso: string): string {
  return `${weekdayDayMonth.format(new Date(iso))} · ${timeOnly.format(new Date(iso))}`;
}

/** "20–23 Nov 2026" */
export function formatDateRange(startIso: string, endIso: string): string {
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (startIso === endIso) return dayMonthYear.format(start);
  const sameMonth = start.getUTCMonth() === end.getUTCMonth();
  if (sameMonth) {
    return `${start.getUTCDate()}–${dayMonthYear.format(end)}`;
  }
  return `${dayMonth.format(start)} – ${dayMonthYear.format(end)}`;
}

export function formatDuration(minutes: number): string {
  return `${minutes} min read`;
}

/** "2h 30m" from a minute count, used for series blocks. */
export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}m`;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}
