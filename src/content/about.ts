import type { Locale } from "@/content/locale";

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  paragraph: string;
  items: string[];
};

export const aboutContent: Record<Locale, AboutContent> = {
  pt: {
    metaTitle: "Sobre — Scheffer Consultoria",
    metaDescription:
      "Conheça a Scheffer Consultoria: três décadas de experiência em desenvolvimento de aplicações e uma década em marketing digital, com identidade renovada e processo transparente.",
    eyebrow: "Sobre",
    headingLine1: "Nova por fora.",
    headingLine2: "Experiente por dentro.",
    paragraph:
      "Por trás da marca nova está uma trajetória consolidada: três décadas desenvolvendo aplicações e uma década dedicada a marketing digital, aplicadas a projetos de empresas de diversos portes. O resultado é a maturidade de quem já viu de tudo, com a agilidade de quem constrói cada projeto como se fosse o primeiro.",
    items: [
      "Consultoria estratégica de ponta a ponta",
      "Squads dedicados por projeto",
      "Código próprio, sem caixa-preta",
      "Relatórios e transparência mensal",
    ],
  },
  en: {
    metaTitle: "About — Scheffer Consultoria",
    metaDescription:
      "Get to know Scheffer Consultoria: three decades of experience in application development and a decade in digital marketing, with a refreshed identity and a transparent process.",
    eyebrow: "About",
    headingLine1: "New on the outside.",
    headingLine2: "Experienced on the inside.",
    paragraph:
      "Behind the new brand is a proven track record: three decades building applications and a decade dedicated to digital marketing, applied to projects for companies of every size. The result is the maturity of someone who's seen it all, with the agility of someone building every project as if it were the first.",
    items: [
      "End-to-end strategic consulting",
      "Dedicated squads per project",
      "Proprietary code, no black box",
      "Monthly reporting and transparency",
    ],
  },
  es: {
    metaTitle: "Nosotros — Scheffer Consultoria",
    metaDescription:
      "Conoce Scheffer Consultoria: tres décadas de experiencia en desarrollo de aplicaciones y una década en marketing digital, con una identidad renovada y un proceso transparente.",
    eyebrow: "Nosotros",
    headingLine1: "Nueva por fuera.",
    headingLine2: "Experimentada por dentro.",
    paragraph:
      "Detrás de la marca nueva hay una trayectoria consolidada: tres décadas desarrollando aplicaciones y una década dedicada al marketing digital, aplicadas a proyectos de empresas de todos los tamaños. El resultado es la madurez de quien ya lo ha visto todo, con la agilidad de quien construye cada proyecto como si fuera el primero.",
    items: [
      "Consultoría estratégica de principio a fin",
      "Equipos dedicados por proyecto",
      "Código propio, sin caja negra",
      "Informes y transparencia mensual",
    ],
  },
};
