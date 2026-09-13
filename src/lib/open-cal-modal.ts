import { getCalApi } from "@calcom/embed-react";

export const CAL_LINK = "scheffer-consulting-technology-wajei3/30min";

export function openCalModal() {
  getCalApi()
    .then((cal) => {
      cal("modal", { calLink: CAL_LINK });
    })
    .catch((error) => {
      console.error("Failed to open Cal.com scheduling modal", error);
    });
}
