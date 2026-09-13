import { Code2, Megaphone, Share2, Smartphone, type LucideIcon } from "lucide-react";

export type Service = {
  id: string;
  path: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
  headline: string;
  summary: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "servico-web",
    path: "/aplicacoes-web",
    icon: Code2,
    title: "Aplicações Web",
    desc: "Plataformas, dashboards e sites de alta performance sob medida para o seu negócio.",
    tag: "Full-stack",
    headline: "Plataformas que sustentam o crescimento do seu negócio.",
    summary:
      "Desenvolvemos aplicações web e dashboards sob medida, do zero ao lançamento, com arquitetura pensada para escalar. Cuidamos de performance, segurança e experiência do usuário em cada entrega.",
    bullets: [
      "Sites institucionais e landing pages de alta conversão",
      "Dashboards e sistemas internos sob medida",
      "Integrações com APIs, pagamentos e automações",
      "Código próprio, documentado e sem vendor lock-in",
    ],
  },
  {
    id: "servico-mobile",
    path: "/apps-mobile",
    icon: Smartphone,
    title: "Apps Mobile",
    desc: "Experiências nativas e híbridas para iOS e Android, com foco em usabilidade.",
    tag: "iOS · Android",
    headline: "Experiências nativas que seus usuários levam no bolso.",
    summary:
      "Criamos aplicativos para iOS e Android com foco em usabilidade e performance, do MVP à publicação nas lojas. Trabalhamos com tecnologias nativas e híbridas, escolhendo a stack certa para o seu caso.",
    bullets: [
      "Apps nativos (iOS/Android) e híbridos (React Native)",
      "Publicação e manutenção nas lojas (App Store / Google Play)",
      "Notificações push, pagamentos in-app e integrações",
      "Testes de usabilidade antes do lançamento",
    ],
  },
  {
    id: "servico-marketing",
    path: "/marketing-digital",
    icon: Megaphone,
    title: "Marketing Digital",
    desc: "Estratégia, tráfego pago e SEO para transformar cliques em clientes.",
    tag: "Performance",
    headline: "Estratégia e tráfego pago que viram clientes de verdade.",
    summary:
      "Planejamos e executamos campanhas de performance, SEO e mídia paga com metas claras de retorno. Acompanhamos os números de perto para ajustar o que não funciona e escalar o que traz resultado.",
    bullets: [
      "Tráfego pago (Google Ads, Meta Ads)",
      "SEO técnico e de conteúdo",
      "Funis de conversão e automação de marketing",
      "Relatórios mensais com métricas de resultado",
    ],
  },
  {
    id: "servico-social",
    path: "/social-media",
    icon: Share2,
    title: "Social Media",
    desc: "Gestão de redes, conteúdo criativo e presença de marca com consistência.",
    tag: "Conteúdo",
    headline: "Presença de marca consistente, do planejamento ao post.",
    summary:
      "Cuidamos do planejamento editorial, criação de conteúdo e gestão das redes sociais para manter sua marca presente e relevante. Da estratégia à publicação, com identidade visual consistente.",
    bullets: [
      "Planejamento editorial e calendário de conteúdo",
      "Criação de artes, vídeos e copywriting",
      "Gestão de comunidade e resposta a comentários/DMs",
      "Relatórios de engajamento e alcance",
    ],
  },
];
