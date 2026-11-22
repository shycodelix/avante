import { cn } from "@/lib/cn";
import type { SocialLink } from "@/lib/types";

function Icon({ id }: { id: SocialLink["id"] }) {
  if (id === "instagram") {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="3.8" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="currentColor">
        <path d="M15.6 3h-2.5v11.4a2.7 2.7 0 1 1-2.2-2.6V9.2a5.4 5.4 0 1 0 4.7 5.3V9.1c1 .8 2.2 1.2 3.6 1.2V7.8c-1.9-.1-3.3-1.5-3.6-3.4z" />
      </svg>
    );
  }

  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="currentColor">
        <path d="M13.6 21v-8h2.6l.4-3h-3V8.3c0-.9.3-1.5 1.5-1.5h1.6V4.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1V10H7.6v3h2.7v8z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M12.4 21c-4.7 0-7.8-3.2-7.8-9s3.1-9 7.8-9c3.7 0 6.3 1.9 7.2 4.9" />
      <path d="M8.8 14.5c0-2 1.6-3.4 3.9-3.4 2.7 0 4.3 1.5 4.3 3.7 0 2-1.3 3.3-3.1 3.3-1.5 0-2.5-.9-2.5-2.2 0-1.7 1.5-2.9 4.1-2.9 2.4 0 4.1 1.1 4.1 1.1" />
    </svg>
  );
}

export function SocialLinks({
  links,
  variant = "text",
  className,
}: {
  links: SocialLink[];
  variant?: "text" | "icons";
  className?: string;
}) {
  if (variant === "icons") {
    return (
      <ul className={cn("flex items-center", className)} aria-label="Avante on social">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${link.label} — ${link.handle}`}
              title={`${link.label} ${link.handle}`}
              className="flex h-8 w-8 items-center justify-center border border-transparent text-bone/45 transition-colors hover:border-bone/15 hover:text-bone"
            >
              <Icon id={link.id} />
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap gap-x-4 gap-y-2", className)} aria-label="Avante on social">
      {links.map((link) => (
        <li key={link.id}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-bone"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
