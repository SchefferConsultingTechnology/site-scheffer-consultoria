import { getCalApi } from "@calcom/embed-react";

// TODO: replace with the company's real Cal.com booking page identifier
// (e.g. "scheffer-consultoria/30min"). Placeholder until the account is set up.
const CAL_LINK = "scheffer-consultoria/30min";

export function openCalModal() {
  getCalApi()
    .then((cal) => {
      cal("modal", { calLink: CAL_LINK });
    })
    .catch((error) => {
      console.error("Failed to open Cal.com scheduling modal", error);
    });
}
