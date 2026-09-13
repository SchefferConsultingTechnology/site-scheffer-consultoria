import { createServerFn } from "@tanstack/react-start";
import { Resend } from "resend";

import { contactSchema, SERVICE_INTERESTS } from "@/lib/contact-schema";
import { buildContactConfirmationEmail } from "@/lib/contact-confirmation-email";

// TODO: point back to contato@schefferconsultoria.com.br once that inbox is ready.
const COMPANY_EMAIL = "scheffer.consulting.technology@gmail.com";
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
      const channelLabels: Record<string, string> = { whatsapp: "WhatsApp", telegram: "Telegram" };
      const phoneChannelsText = data.phoneChannels?.length
        ? ` (${data.phoneChannels.map((channel) => channelLabels[channel]).join(" / ")})`
        : "";

      const interestLabels: Record<string, string> = Object.fromEntries(
        SERVICE_INTERESTS.map((interest) => [interest.id, interest.label]),
      );
      const interestsText = data.interests?.length
        ? data.interests.map((interest) => interestLabels[interest]).join(", ")
        : null;

      const lines = [
        `Nome: ${data.name}`,
        `E-mail: ${data.email}`,
        data.phone ? `Telefone: ${data.phone}${phoneChannelsText}` : null,
        data.company ? `Empresa: ${data.company}` : null,
        interestsText ? `Assunto: ${interestsText}` : null,
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

      // Best-effort: the visitor already sees the on-page success confirmation, so a failure
      // here shouldn't turn a successful submission into an error for them.
      try {
        const confirmation = buildContactConfirmationEmail(data);
        const { error: confirmationError } = await resend.emails.send({
          from: fromAddress,
          to: data.email,
          subject: confirmation.subject,
          html: confirmation.html,
        });
        if (confirmationError) {
          console.error("Failed to send visitor confirmation e-mail", confirmationError);
        }
      } catch (confirmationError) {
        console.error("Unexpected error sending visitor confirmation e-mail", confirmationError);
      }

      return { ok: true };
    } catch (error) {
      console.error("Unexpected error sending contact e-mail", error);
      return { ok: false, error: "delivery_failed" };
    }
  });
