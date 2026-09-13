// Old in-page anchors from before routes existed. URL fragments never reach the server, so this
// can only be resolved client-side, after the browser has already loaded `/` and parsed the hash.
export const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = {
  servicos: "/",
  sobre: "/sobre",
  processo: "/processo",
  contato: "/contato",
  "servico-web": "/aplicacoes-web",
  "servico-mobile": "/apps-mobile",
  "servico-marketing": "/marketing-digital",
  "servico-social": "/social-media",
};
