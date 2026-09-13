import { z } from "zod";

// Brazilian numbers: 2-digit DDD + 8 digits (landline) or 9 digits (mobile) = 10-11 digits,
// optionally prefixed with the "55" country code.
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

const SERVICE_INTEREST_IDS = ["web", "mobile", "marketing", "social", "other"] as const;
export const SERVICE_INTERESTS: { id: (typeof SERVICE_INTEREST_IDS)[number]; label: string }[] = [
  { id: "web", label: "Aplicações Web" },
  { id: "mobile", label: "Apps Mobile" },
  { id: "marketing", label: "Marketing Digital" },
  { id: "social", label: "Social Media" },
  { id: "other", label: "Outros assuntos" },
];
export type ServiceInterest = (typeof SERVICE_INTEREST_IDS)[number];

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(100),
  email: z.string().trim().email("Informe um e-mail válido."),
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
    }, "Informe um telefone brasileiro válido, com DDD (10 ou 11 dígitos)."),
  phoneChannels: z.array(z.enum(PHONE_CHANNELS)).max(PHONE_CHANNELS.length).optional(),
  interests: z.array(z.enum(SERVICE_INTEREST_IDS)).max(SERVICE_INTEREST_IDS.length).optional(),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Conte um pouco mais sobre o seu projeto.")
    .max(2000, "Mensagem muito longa."),
  honeypot: z.string().max(0).optional().or(z.literal("")),
  renderedAt: z.number(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
