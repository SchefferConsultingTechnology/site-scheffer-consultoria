import { SERVICE_INTERESTS, type ContactFormValues } from "@/lib/contact-schema";
import { CAL_LINK } from "@/lib/open-cal-modal";
import { SITE_OG_IMAGE } from "@/lib/site-config";

const WHATSAPP_NUMBER = "5548999040445";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const CAL_BOOKING_URL = `https://cal.com/${CAL_LINK}`;

const PHONE_CHANNEL_LABELS: Record<string, string> = { whatsapp: "WhatsApp", telegram: "Telegram" };
const INTEREST_LABELS: Record<string, string> = Object.fromEntries(
  SERVICE_INTERESTS.map((interest) => [interest.id, interest.label]),
);

type ConfirmationData = Pick<
  ContactFormValues,
  "name" | "message" | "phone" | "company" | "phoneChannels" | "interests"
>;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactConfirmationEmail(data: ConfirmationData) {
  const firstName = data.name.trim().split(/\s+/)[0];
  const subject = `Recebemos sua mensagem, ${firstName}! — Scheffer Consultoria`;

  const phoneChannelsText = data.phoneChannels?.length
    ? ` (${data.phoneChannels.map((channel) => PHONE_CHANNEL_LABELS[channel]).join(" / ")})`
    : "";
  const interestsText = data.interests?.length
    ? data.interests.map((interest) => INTEREST_LABELS[interest]).join(", ")
    : null;

  const summaryRows = [
    data.company ? { label: "Empresa", value: data.company } : null,
    data.phone ? { label: "Telefone", value: `${data.phone}${phoneChannelsText}` } : null,
    interestsText ? { label: "Assunto", value: interestsText } : null,
  ].filter((row): row is { label: string; value: string } => row !== null);

  const summaryRowsHtml = summaryRows
    .map(
      (row) => `
        <tr>
          <td style="padding:4px 0;color:#71717a;font-size:13px;width:90px;vertical-align:top;">${escapeHtml(row.label)}</td>
          <td style="padding:4px 0;color:#18181b;font-size:13px;">${escapeHtml(row.value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background-color:#ffffff;border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background-color:#18181b;padding:24px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right:10px;">
                      <img src="${SITE_OG_IMAGE}" width="36" height="36" alt="" style="border-radius:50%;display:block;" />
                    </td>
                    <td style="color:#ffffff;font-size:16px;font-weight:600;">
                      Scheffer <span style="color:#00acff;">Consultoria</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 12px;font-size:22px;color:#18181b;">Recebemos sua mensagem, ${escapeHtml(firstName)}!</h1>
                <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#3f3f46;">
                  Obrigado por entrar em contato. Nossa equipe vai analisar o que você enviou e
                  responder em até <strong>24 horas</strong>.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;border-radius:12px;padding:16px;margin-bottom:20px;">
                  <tr>
                    <td style="padding:0 0 8px;">
                      ${summaryRowsHtml ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;margin-bottom:8px;">${summaryRowsHtml}</table>` : ""}
                      <p style="margin:0;font-size:13px;color:#71717a;">Mensagem enviada</p>
                      <p style="margin:4px 0 0;font-size:14px;color:#18181b;white-space:pre-wrap;">${escapeHtml(data.message)}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#3f3f46;">
                  Se preferir um retorno mais rápido enquanto isso, fale com a gente agora:
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="padding-right:8px;padding-bottom:12px;">
                      <a href="${WHATSAPP_URL}" style="display:inline-block;background-color:#25D366;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:999px;">
                        WhatsApp
                      </a>
                    </td>
                    <td style="padding-bottom:12px;">
                      <a href="${CAL_BOOKING_URL}" style="display:inline-block;background-color:#fcd863;color:#18181b;text-decoration:none;font-size:14px;font-weight:600;padding:12px 20px;border-radius:999px;">
                        Agendar reunião
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#f4f4f5;">
                <p style="margin:0;font-size:12px;color:#a1a1aa;">
                  Scheffer Consultoria — este é um e-mail automático de confirmação, não é necessário responder.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html };
}
