import { Code2, Megaphone, Share2, Smartphone, type LucideIcon } from "lucide-react";

import type { Locale } from "@/content/locale";

export type Service = {
  id: string;
  path: string;
  icon: LucideIcon;
  title: Record<Locale, string>;
  desc: Record<Locale, string>;
  tag: Record<Locale, string>;
  headline: Record<Locale, string>;
  summary: Record<Locale, string>;
  bullets: Record<Locale, string[]>;
  metaTitle: Record<Locale, string>;
  metaDescription: Record<Locale, string>;
};

export const services: Service[] = [
  {
    id: "web",
    path: "/web-apps",
    icon: Code2,
    title: { pt: "Aplicações Web", en: "Web Applications", es: "Aplicaciones Web" },
    desc: {
      pt: "Plataformas, dashboards e sites de alta performance sob medida para o seu negócio.",
      en: "High-performance platforms, dashboards, and websites built for your business.",
      es: "Plataformas, paneles y sitios web de alto rendimiento hechos a medida para tu negocio.",
    },
    tag: { pt: "Full-stack", en: "Full-stack", es: "Full-stack" },
    headline: {
      pt: "Plataformas que sustentam o crescimento do seu negócio.",
      en: "Platforms that sustain your business's growth.",
      es: "Plataformas que sostienen el crecimiento de tu negocio.",
    },
    summary: {
      pt: "Desenvolvemos aplicações web e dashboards sob medida, do zero ao lançamento, com arquitetura pensada para escalar. Cuidamos de performance, segurança e experiência do usuário em cada entrega.",
      en: "We build custom web applications and dashboards, from scratch to launch, with architecture designed to scale. We take care of performance, security, and user experience in every delivery.",
      es: "Desarrollamos aplicaciones web y paneles a medida, desde cero hasta el lanzamiento, con una arquitectura pensada para escalar. Cuidamos el rendimiento, la seguridad y la experiencia del usuario en cada entrega.",
    },
    bullets: {
      pt: [
        "Sites institucionais e landing pages de alta conversão",
        "Dashboards e sistemas internos sob medida",
        "Integrações com APIs, pagamentos e automações",
        "Código próprio, documentado e sem vendor lock-in",
      ],
      en: [
        "High-conversion institutional sites and landing pages",
        "Custom dashboards and internal systems",
        "Integrations with APIs, payments, and automations",
        "Proprietary, documented code with no vendor lock-in",
      ],
      es: [
        "Sitios institucionales y landing pages de alta conversión",
        "Paneles y sistemas internos a medida",
        "Integraciones con APIs, pagos y automatizaciones",
        "Código propio, documentado y sin dependencia de proveedor",
      ],
    },
    metaTitle: {
      pt: "Aplicações Web — Scheffer Consultoria",
      en: "Web Applications — Scheffer Consultoria",
      es: "Aplicaciones Web — Scheffer Consultoria",
    },
    metaDescription: {
      pt: "Desenvolvimento de aplicações web, dashboards e sites de alta performance sob medida. Arquitetura escalável, código próprio e foco em resultado.",
      en: "Custom high-performance web applications, dashboards, and websites. Scalable architecture, proprietary code, and a focus on results.",
      es: "Desarrollo de aplicaciones web, paneles y sitios de alto rendimiento a medida. Arquitectura escalable, código propio y enfoque en resultados.",
    },
  },
  {
    id: "mobile",
    path: "/mobile-apps",
    icon: Smartphone,
    title: { pt: "Apps Mobile", en: "Mobile Apps", es: "Apps Móviles" },
    desc: {
      pt: "Experiências nativas e híbridas para iOS e Android, com foco em usabilidade.",
      en: "Native and hybrid experiences for iOS and Android, built with usability in mind.",
      es: "Experiencias nativas e híbridas para iOS y Android, enfocadas en la usabilidad.",
    },
    tag: { pt: "iOS · Android", en: "iOS · Android", es: "iOS · Android" },
    headline: {
      pt: "Experiências nativas que seus usuários levam no bolso.",
      en: "Native experiences your users carry in their pocket.",
      es: "Experiencias nativas que tus usuarios llevan en el bolsillo.",
    },
    summary: {
      pt: "Criamos aplicativos para iOS e Android com foco em usabilidade e performance, do MVP à publicação nas lojas. Trabalhamos com tecnologias nativas e híbridas, escolhendo a stack certa para o seu caso.",
      en: "We build iOS and Android apps focused on usability and performance, from MVP to store launch. We work with native and hybrid technologies, choosing the right stack for your case.",
      es: "Creamos aplicaciones para iOS y Android enfocadas en la usabilidad y el rendimiento, desde el MVP hasta la publicación en las tiendas. Trabajamos con tecnologías nativas e híbridas, eligiendo la pila adecuada para tu caso.",
    },
    bullets: {
      pt: [
        "Apps nativos (iOS/Android) e híbridos (React Native)",
        "Publicação e manutenção nas lojas (App Store / Google Play)",
        "Notificações push, pagamentos in-app e integrações",
        "Testes de usabilidade antes do lançamento",
      ],
      en: [
        "Native (iOS/Android) and hybrid (React Native) apps",
        "Store publishing and maintenance (App Store / Google Play)",
        "Push notifications, in-app payments, and integrations",
        "Usability testing before launch",
      ],
      es: [
        "Apps nativas (iOS/Android) e híbridas (React Native)",
        "Publicación y mantenimiento en las tiendas (App Store / Google Play)",
        "Notificaciones push, pagos in-app e integraciones",
        "Pruebas de usabilidad antes del lanzamiento",
      ],
    },
    metaTitle: {
      pt: "Apps Mobile — Scheffer Consultoria",
      en: "Mobile Apps — Scheffer Consultoria",
      es: "Apps Móviles — Scheffer Consultoria",
    },
    metaDescription: {
      pt: "Apps nativos e híbridos para iOS e Android, do MVP à publicação nas lojas. Foco em usabilidade, performance e resultado real.",
      en: "Native and hybrid apps for iOS and Android, from MVP to store launch. Focused on usability, performance, and real results.",
      es: "Apps nativas e híbridas para iOS y Android, desde el MVP hasta la publicación en las tiendas. Enfoque en usabilidad, rendimiento y resultados reales.",
    },
  },
  {
    id: "marketing",
    path: "/digital-marketing",
    icon: Megaphone,
    title: { pt: "Marketing Digital", en: "Digital Marketing", es: "Marketing Digital" },
    desc: {
      pt: "Estratégia, tráfego pago e SEO para transformar cliques em clientes.",
      en: "Strategy, paid traffic, and SEO that turn clicks into customers.",
      es: "Estrategia, tráfico pago y SEO para convertir clics en clientes.",
    },
    tag: { pt: "Performance", en: "Performance", es: "Rendimiento" },
    headline: {
      pt: "Estratégia e tráfego pago que viram clientes de verdade.",
      en: "Strategy and paid traffic that become real customers.",
      es: "Estrategia y tráfico pago que se convierten en clientes reales.",
    },
    summary: {
      pt: "Planejamos e executamos campanhas de performance, SEO e mídia paga com metas claras de retorno. Acompanhamos os números de perto para ajustar o que não funciona e escalar o que traz resultado.",
      en: "We plan and run performance, SEO, and paid media campaigns with clear return targets. We track the numbers closely to adjust what isn't working and scale what delivers results.",
      es: "Planificamos y ejecutamos campañas de rendimiento, SEO y medios pagos con metas claras de retorno. Monitoreamos los números de cerca para ajustar lo que no funciona y escalar lo que da resultado.",
    },
    bullets: {
      pt: [
        "Tráfego pago (Google Ads, Meta Ads)",
        "SEO técnico e de conteúdo",
        "Funis de conversão e automação de marketing",
        "Relatórios mensais com métricas de resultado",
      ],
      en: [
        "Paid traffic (Google Ads, Meta Ads)",
        "Technical and content SEO",
        "Conversion funnels and marketing automation",
        "Monthly reports with performance metrics",
      ],
      es: [
        "Tráfico pago (Google Ads, Meta Ads)",
        "SEO técnico y de contenido",
        "Embudos de conversión y automatización de marketing",
        "Informes mensuales con métricas de resultado",
      ],
    },
    metaTitle: {
      pt: "Marketing Digital — Scheffer Consultoria",
      en: "Digital Marketing — Scheffer Consultoria",
      es: "Marketing Digital — Scheffer Consultoria",
    },
    metaDescription: {
      pt: "Estratégia, tráfego pago e SEO para transformar cliques em clientes. Campanhas de performance com metas claras de retorno.",
      en: "Strategy, paid traffic, and SEO that turn clicks into customers. Performance campaigns with clear return targets.",
      es: "Estrategia, tráfico pago y SEO para convertir clics en clientes. Campañas de rendimiento con metas claras de retorno.",
    },
  },
  {
    id: "social",
    path: "/social-media",
    icon: Share2,
    title: { pt: "Social Media", en: "Social Media", es: "Social Media" },
    desc: {
      pt: "Gestão de redes, conteúdo criativo e presença de marca com consistência.",
      en: "Social media management, creative content, and consistent brand presence.",
      es: "Gestión de redes, contenido creativo y presencia de marca con consistencia.",
    },
    tag: { pt: "Conteúdo", en: "Content", es: "Contenido" },
    headline: {
      pt: "Presença de marca consistente, do planejamento ao post.",
      en: "Consistent brand presence, from planning to posting.",
      es: "Presencia de marca consistente, de la planificación a la publicación.",
    },
    summary: {
      pt: "Cuidamos do planejamento editorial, criação de conteúdo e gestão das redes sociais para manter sua marca presente e relevante. Da estratégia à publicação, com identidade visual consistente.",
      en: "We handle editorial planning, content creation, and social media management to keep your brand present and relevant. From strategy to publishing, with a consistent visual identity.",
      es: "Nos encargamos de la planificación editorial, la creación de contenido y la gestión de redes sociales para mantener tu marca presente y relevante. De la estrategia a la publicación, con una identidad visual consistente.",
    },
    bullets: {
      pt: [
        "Planejamento editorial e calendário de conteúdo",
        "Criação de artes, vídeos e copywriting",
        "Gestão de comunidade e resposta a comentários/DMs",
        "Relatórios de engajamento e alcance",
      ],
      en: [
        "Editorial planning and content calendar",
        "Graphics, video, and copywriting creation",
        "Community management and comment/DM responses",
        "Engagement and reach reports",
      ],
      es: [
        "Planificación editorial y calendario de contenido",
        "Creación de artes, videos y copywriting",
        "Gestión de comunidad y respuesta a comentarios/DMs",
        "Informes de interacción y alcance",
      ],
    },
    metaTitle: {
      pt: "Social Media — Scheffer Consultoria",
      en: "Social Media — Scheffer Consultoria",
      es: "Social Media — Scheffer Consultoria",
    },
    metaDescription: {
      pt: "Planejamento editorial, criação de conteúdo e gestão de redes sociais com consistência de marca e resultado mensurável.",
      en: "Editorial planning, content creation, and social media management with brand consistency and measurable results.",
      es: "Planificación editorial, creación de contenido y gestión de redes sociales con consistencia de marca y resultados medibles.",
    },
  },
];
