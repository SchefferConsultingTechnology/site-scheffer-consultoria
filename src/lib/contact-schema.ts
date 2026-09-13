import { z } from "zod";

import { contactContent, SERVICE_INTEREST_IDS, type ServiceInterestId } from "@/content/contact";
import { LOCALES, type Locale } from "@/content/locale";

// E.164: a leading "+", then the country code and subscriber number as digits only, 8-15 digits
// total, no leading 0 after the "+" (spec 005-i18n-structure made phone entry international, so
// a bare local number is no longer assumed to be Brazilian — the visitor picks their own country
// from a selector instead of typing the country code by hand).
const E164_PATTERN = /^\+[1-9]\d{7,14}$/;

// Keeps only digits from the national-number input, capped to whatever's left of E.164's 15-digit
// budget once the selected country's dial code is accounted for.
export function sanitizeNationalNumber(value: string, maxDigits: number) {
  return value.replace(/\D/g, "").slice(0, Math.max(maxDigits, 0));
}

// Combines a country's dial code with the visitor-entered national number into a single E.164
// string; returns "" when there's no number yet, so the field stays optional.
export function buildE164Phone(dialCode: string, nationalNumber: string) {
  const digits = nationalNumber.replace(/\D/g, "");
  return digits ? `+${dialCode}${digits}` : "";
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
        return E164_PATTERN.test(value);
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
