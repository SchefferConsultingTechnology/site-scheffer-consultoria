import type { Locale } from "@/content/locale";

export type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    headingBefore: string;
    headingHighlight: string;
    headingAfter: string;
    paragraph: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: { value: string; label: string }[];
  };
  services: {
    eyebrow: string;
    heading: string;
    subtext: string;
    learnMore: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    link: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    link: string;
  };
};

export const homeContent: Record<Locale, HomeContent> = {
  pt: {
    metaTitle: "Scheffer Consultoria — Tecnologia, Web, Mobile e Marketing Digital",
    metaDescription:
      "Consultoria em soluções tecnológicas: aplicações web e mobile, marketing digital e social media. Anos de experiência, energia de quem começa agora.",
    hero: {
      badge: "Nova marca. Anos de bagagem.",
      headingBefore: "Soluções digitais que ",
      headingHighlight: "movem",
      headingAfter: " negócios adiante.",
      paragraph:
        "Da ideia ao lançamento: criamos aplicações web, apps mobile e estratégias de marketing digital que geram resultado real. Consultoria técnica com visão de negócio.",
      ctaPrimary: "Começar um projeto",
      ctaSecondary: "Ver serviços",
      stats: [
        { value: "30+", label: "anos de mercado" },
        { value: "80+", label: "projetos entregues" },
        { value: "24/7", label: "suporte dedicado" },
      ],
    },
    services: {
      eyebrow: "Serviços",
      heading: "Tudo que sua marca precisa para acontecer online.",
      subtext:
        "Times enxutos, entregas rápidas, código próprio e estratégia baseada em dados. Cuidamos da execução técnica e do posicionamento da marca.",
      learnMore: "Saiba mais",
    },
    about: {
      eyebrow: "Sobre",
      heading: "Nova por fora. Experiente por dentro.",
      paragraph:
        "Três décadas desenvolvendo aplicações e uma década em marketing digital — com identidade renovada e um processo de trabalho transparente.",
      link: "Conheça a Scheffer Consultoria",
    },
    contact: {
      eyebrow: "Vamos conversar",
      heading: "Pronto para tirar seu projeto do papel?",
      paragraph:
        "Conte o que você tem em mente. Respondemos em até 24 horas com um caminho claro para começar.",
      link: "Falar com a gente",
    },
  },
  en: {
    metaTitle: "Scheffer Consultoria — Technology, Web, Mobile and Digital Marketing",
    metaDescription:
      "Technology consulting: web and mobile applications, digital marketing, and social media. Years of experience, with the energy of a fresh start.",
    hero: {
      badge: "New brand. Years of experience.",
      headingBefore: "Digital solutions that ",
      headingHighlight: "move",
      headingAfter: " your business forward.",
      paragraph:
        "From idea to launch: we build web applications, mobile apps, and digital marketing strategies that generate real results. Technical consulting with a business mindset.",
      ctaPrimary: "Start a project",
      ctaSecondary: "See services",
      stats: [
        { value: "30+", label: "years in business" },
        { value: "80+", label: "projects delivered" },
        { value: "24/7", label: "dedicated support" },
      ],
    },
    services: {
      eyebrow: "Services",
      heading: "Everything your brand needs to happen online.",
      subtext:
        "Lean teams, fast delivery, proprietary code, and data-driven strategy. We handle the technical execution and brand positioning.",
      learnMore: "Learn more",
    },
    about: {
      eyebrow: "About",
      heading: "New on the outside. Experienced on the inside.",
      paragraph:
        "Three decades building applications and a decade in digital marketing — with a refreshed identity and a transparent way of working.",
      link: "Get to know Scheffer Consultoria",
    },
    contact: {
      eyebrow: "Let's talk",
      heading: "Ready to bring your project to life?",
      paragraph:
        "Tell us what you have in mind. We reply within 24 hours with a clear path to get started.",
      link: "Talk to us",
    },
  },
  es: {
    metaTitle: "Scheffer Consultoria — Tecnología, Web, Móvil y Marketing Digital",
    metaDescription:
      "Consultoría en soluciones tecnológicas: aplicaciones web y móviles, marketing digital y redes sociales. Años de experiencia, con la energía de quien recién empieza.",
    hero: {
      badge: "Nueva marca. Años de experiencia.",
      headingBefore: "Soluciones digitales que ",
      headingHighlight: "impulsan",
      headingAfter: " tu negocio hacia adelante.",
      paragraph:
        "De la idea al lanzamiento: creamos aplicaciones web, apps móviles y estrategias de marketing digital que generan resultados reales. Consultoría técnica con visión de negocio.",
      ctaPrimary: "Iniciar un proyecto",
      ctaSecondary: "Ver servicios",
      stats: [
        { value: "30+", label: "años en el mercado" },
        { value: "80+", label: "proyectos entregados" },
        { value: "24/7", label: "soporte dedicado" },
      ],
    },
    services: {
      eyebrow: "Servicios",
      heading: "Todo lo que tu marca necesita para triunfar en línea.",
      subtext:
        "Equipos ágiles, entregas rápidas, código propio y estrategia basada en datos. Nos encargamos de la ejecución técnica y el posicionamiento de la marca.",
      learnMore: "Saber más",
    },
    about: {
      eyebrow: "Nosotros",
      heading: "Nueva por fuera. Experimentada por dentro.",
      paragraph:
        "Tres décadas desarrollando aplicaciones y una década en marketing digital — con una identidad renovada y un proceso de trabajo transparente.",
      link: "Conoce Scheffer Consultoria",
    },
    contact: {
      eyebrow: "Hablemos",
      heading: "¿Listo para hacer realidad tu proyecto?",
      paragraph:
        "Cuéntanos qué tienes en mente. Respondemos en hasta 24 horas con un camino claro para empezar.",
      link: "Hablar con nosotros",
    },
  },
};
