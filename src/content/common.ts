import type { Locale } from "@/content/locale";

export type CommonContent = {
  nav: {
    services: string;
    about: string;
    methodology: string;
    contact: string;
  };
  cta: string;
  footer: {
    copyrightSuffix: string; // "Scheffer Consultoria. All rights reserved." (year prefixed at render time)
    privacyPolicy: string;
  };
  languageSelector: {
    ariaLabel: string;
  };
  mobileMenu: {
    openLabel: string;
    closeLabel: string;
    title: string;
  };
};

export const commonContent: Record<Locale, CommonContent> = {
  pt: {
    nav: {
      services: "Serviços",
      about: "Sobre",
      methodology: "Metodologia",
      contact: "Contato",
    },
    cta: "Falar agora",
    footer: {
      copyrightSuffix: "Scheffer Consultoria. Todos os direitos reservados.",
      privacyPolicy: "Política de Privacidade",
    },
    languageSelector: {
      ariaLabel: "Selecionar idioma",
    },
    mobileMenu: {
      openLabel: "Abrir menu",
      closeLabel: "Fechar menu",
      title: "Menu",
    },
  },
  en: {
    nav: {
      services: "Services",
      about: "About",
      methodology: "Methodology",
      contact: "Contact",
    },
    cta: "Talk to us",
    footer: {
      copyrightSuffix: "Scheffer Consultoria. All rights reserved.",
      privacyPolicy: "Privacy Policy",
    },
    languageSelector: {
      ariaLabel: "Select language",
    },
    mobileMenu: {
      openLabel: "Open menu",
      closeLabel: "Close menu",
      title: "Menu",
    },
  },
  es: {
    nav: {
      services: "Servicios",
      about: "Nosotros",
      methodology: "Metodología",
      contact: "Contacto",
    },
    cta: "Hablar ahora",
    footer: {
      copyrightSuffix: "Scheffer Consultoria. Todos los derechos reservados.",
      privacyPolicy: "Política de Privacidad",
    },
    languageSelector: {
      ariaLabel: "Seleccionar idioma",
    },
    mobileMenu: {
      openLabel: "Abrir menú",
      closeLabel: "Cerrar menú",
      title: "Menú",
    },
  },
};
