import { z } from "zod";

import { contactContent, SERVICE_INTEREST_IDS, type ServiceInterestId } from "@/content/contact";
import { LOCALES, type Locale } from "@/content/locale";

// Brazilian numbers: 2-digit DDD + 8 digits (landline) or 9 digits (mobile) = 10-11 digits,
// optionally prefixed with the "55" country code. This validation rule is intentionally
// Brazil-specific regardless of the form's display language (see spec 005-i18n-structure —
// i18n translates messages, it doesn't change validation scope, which stays Brazil-only for now).
export function brazilPhoneDigits(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length > 11 && digits.startsWith("55") ? digits.slice(2) : digits;
}

// Masks as (DD) DDDD-DDDD while the number still looks like a landline, and shifts to
// (DD) DDDDD-DDDD as soon as a 9th local digit is typed (mobile numbers).
export function formatBrazilPhone(value: string) {
  const digits = brazilPhoneDigits(value).slice(0, 11);
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export const PHONE_CHANNELS = ["whatsapp", "telegram"] as const;
export type PhoneChannel = (typeof PHONE_CHANNELS)[number];

export { SERVICE_INTEREST_IDS, type ServiceInterestId };

export function buildContactSchema(locale: Locale) {
  const messages = contactContent[locale].form.validation;

  return z.object({
    name: z.string().trim().min(2, messages.nameRequired).max(100),
    email: z.string().trim().email(messages.emailInvalid),
    phone: z
      .string()
      .trim()
      .max(20)
      .optional()
      .or(z.literal(""))
      .refine((value) => {
        if (!value) return true;
        const digits = brazilPhoneDigits(value);
        return digits.length === 10 || digits.length === 11;
      }, messages.phoneInvalid),
    phoneChannels: z.array(z.enum(PHONE_CHANNELS)).max(PHONE_CHANNELS.length).optional(),
    interests: z.array(z.enum(SERVICE_INTEREST_IDS)).max(SERVICE_INTEREST_IDS.length).optional(),
    company: z.string().trim().max(100).optional().or(z.literal("")),
    message: z.string().trim().min(10, messages.messageTooShort).max(2000, messages.messageTooLong),
    honeypot: z.string().max(0).optional().or(z.literal("")),
    renderedAt: z.number(),
    locale: z.enum(LOCALES),
  });
}

export type ContactFormValues = z.infer<ReturnType<typeof buildContactSchema>>;
