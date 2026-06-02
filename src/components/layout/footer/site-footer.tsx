import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

import { cn } from "@/lib/utils";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter }
] as const;

export function SiteFooter({ className }: { className?: string }) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "text-muted-foreground flex flex-wrap items-center justify-between gap-3 px-(--content-padding) py-4 text-xs",
        className
      )}
    >
      <p>&copy;{year} Buildatics</p>
      <ul className="flex items-center gap-3">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <li key={label}>
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-foreground inline-flex items-center justify-center rounded-md p-1 transition-colors"
            >
              <Icon className="size-4" />
            </Link>
          </li>
        ))}
      </ul>
    </footer>
  );
}
