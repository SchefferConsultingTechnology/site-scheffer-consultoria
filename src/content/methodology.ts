import type { Locale } from "@/content/locale";

export type MethodologyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  paragraph: string;
  steps: { n: string; t: string; d: string }[];
};

export const methodologyContent: Record<Locale, MethodologyContent> = {
  pt: {
    metaTitle: "Metodologia — Scheffer Consultoria",
    metaDescription:
      "Veja como trabalhamos: descoberta, estratégia, execução e crescimento — um processo enxuto e transparente do diagnóstico ao resultado.",
    eyebrow: "Metodologia",
    heading: "Como trabalhamos",
    paragraph:
      "Um processo enxuto e transparente, do primeiro diagnóstico ao acompanhamento contínuo de resultado.",
    steps: [
      { n: "01", t: "Descoberta", d: "Entendemos o negócio, o público e os objetivos reais." },
      { n: "02", t: "Estratégia", d: "Definimos escopo, stack e o plano de comunicação." },
      { n: "03", t: "Execução", d: "Design, código e conteúdo caminhando em paralelo." },
      { n: "04", t: "Crescimento", d: "Medimos, ajustamos e escalamos o que funciona." },
    ],
  },
  en: {
    metaTitle: "Methodology — Scheffer Consultoria",
    metaDescription:
      "See how we work: discovery, strategy, execution, and growth — a lean, transparent process from diagnosis to results.",
    eyebrow: "Methodology",
    heading: "How we work",
    paragraph: "A lean, transparent process, from the first diagnosis to ongoing results tracking.",
    steps: [
      {
        n: "01",
        t: "Discovery",
        d: "We understand the business, the audience, and the real goals.",
      },
      { n: "02", t: "Strategy", d: "We define scope, tech stack, and the communication plan." },
      { n: "03", t: "Execution", d: "Design, code, and content moving forward in parallel." },
      { n: "04", t: "Growth", d: "We measure, adjust, and scale what works." },
    ],
  },
  es: {
    metaTitle: "Metodología — Scheffer Consultoria",
    metaDescription:
      "Descubre cómo trabajamos: descubrimiento, estrategia, ejecución y crecimiento — un proceso ágil y transparente del diagnóstico al resultado.",
    eyebrow: "Metodología",
    heading: "Cómo trabajamos",
    paragraph:
      "Un proceso ágil y transparente, desde el primer diagnóstico hasta el seguimiento continuo de resultados.",
    steps: [
      {
        n: "01",
        t: "Descubrimiento",
        d: "Entendemos el negocio, el público y los objetivos reales.",
      },
      {
        n: "02",
        t: "Estrategia",
        d: "Definimos el alcance, la tecnología y el plan de comunicación.",
      },
      { n: "03", t: "Ejecución", d: "Diseño, código y contenido avanzando en paralelo." },
      { n: "04", t: "Crecimiento", d: "Medimos, ajustamos y escalamos lo que funciona." },
    ],
  },
};
