// Old in-page anchors from before routes existed. URL fragments never reach the server, so this
// can only be resolved client-side, after the browser has already loaded `/` and parsed the hash.
export const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = {
  servicos: "/",
  sobre: "/about",
  processo: "/methodology",
  contato: "/contact",
  "servico-web": "/web-apps",
  "servico-mobile": "/mobile-apps",
  "servico-marketing": "/digital-marketing",
  "servico-social": "/social-media",
};
