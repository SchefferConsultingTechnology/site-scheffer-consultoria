// scheffer.solutions is the domain actually live/verified today (see .dev.vars /
// RESEND_FROM_EMAIL). schefferconsultoria.com.br does not resolve yet — revisit if that changes.
export const SITE_URL = "https://scheffer.solutions";
export const SITE_NAME = "Scheffer Consultoria";
export const SITE_OG_IMAGE = `${SITE_URL}/og-image.png`;

// Empty until the business supplies real profile URLs — SiteFooter and the JSON-LD `sameAs`
// both read from here, so adding a network later is a one-line change in this one place.
export const SOCIAL_LINKS: { network: "instagram" | "linkedin"; url: string }[] = [];
