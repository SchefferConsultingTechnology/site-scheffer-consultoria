import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome completo.").max(100),
  email: z.string().trim().email("Informe um e-mail válido."),
  phone: z
    .string()
    .trim()
    .min(8, "Informe um telefone válido.")
    .max(20)
    .optional()
    .or(z.literal("")),
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
