import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

import { contactSchema } from "@/lib/contact-schema";

const COMPANY_EMAIL = "contato@schefferconsultoria.com.br";
const MIN_SUBMIT_TIME_MS = 2000;

type SendContactEmailResult = { ok: true } | { ok: false; error: "validation" | "delivery_failed" };

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<SendContactEmailResult> => {
    const isSpam = data.honeypot || Date.now() - data.renderedAt < MIN_SUBMIT_TIME_MS;
    if (isSpam) {
      return { ok: true };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured");
      return { ok: false, error: "delivery_failed" };
    }

    try {
      const fromAddress =
        process.env.RESEND_FROM_EMAIL || "Site Scheffer Consultoria <onboarding@resend.dev>";
      const resend = new Resend(apiKey);
      const lines = [
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        data.phone ? `Telefone: ${data.phone}` : null,
        data.company ? `Empresa: ${data.company}` : null,
        "",
        data.message,
      ].filter((line) => line !== null);

      const { error } = await resend.emails.send({
        from: fromAddress,
        to: COMPANY_EMAIL,
        replyTo: data.email,
        subject: `Novo contato pelo site: ${data.name}`,
        text: lines.join("\n"),
      });

      if (error) {
        console.error("Resend delivery failed", error);
        return { ok: false, error: "delivery_failed" };
      }

      return { ok: true };
    } catch (error) {
      console.error("Unexpected error sending contact e-mail", error);
      return { ok: false, error: "delivery_failed" };
    }
  });
