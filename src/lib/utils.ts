import { Metadata } from "next";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateAvatarFallback(string: string) {
  const names = string.split(" ").filter((name: string) => name);
  const mapped = names.map((name: string) => name.charAt(0).toUpperCase());

  return mapped.join("");
}

const SITE_NAME = "Buildatics";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildatics.com";
const OG_IMAGE = "/images/seo.jpg";

// Builds per-page metadata, e.g. `Design Library | Buildatics`.
// `additionalTitle` is accepted but ignored — kept so existing pages still type-check.
export function generateMeta({
  title,
  description,
  canonical
}: {
  title: string;
  description: string;
  canonical?: string;
  additionalTitle?: boolean;
}): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    applicationName: SITE_NAME,
    metadataBase: new URL(SITE_URL),
    alternates: canonical ? { canonical } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      type: "website",
      ...(canonical ? { url: canonical } : {}),
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE]
    }
  };
}

// a function to get the first letter of the first and last name of names
export const getInitials = (fullName: string) => {
  const nameParts = fullName.split(" ");
  const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
  const lastNameInitial = nameParts[1].charAt(0).toUpperCase();
  return `${firstNameInitial}${lastNameInitial}`;
};
