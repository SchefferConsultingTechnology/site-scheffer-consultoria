import type { Locale } from "@/content/locale";

export const SERVICE_INTEREST_IDS = ["web", "mobile", "marketing", "social", "other"] as const;
export type ServiceInterestId = (typeof SERVICE_INTEREST_IDS)[number];

export type ContactContent = {
  metaTitle: string;
  metaDescription: string;
  page: {
    eyebrow: string;
    heading: string;
    paragraph: string;
    scheduleButton: string;
    whatsappButton: string;
    successMessage: string;
    errorMessage: string;
  };
  form: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    interestsLabel: string;
    interestsAriaLabel: string;
    interests: Record<ServiceInterestId, string>;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneChannelsAriaLabel: string;
    whatsappChannelLabel: string;
    telegramChannelLabel: string;
    countrySelectorLabel: string;
    countrySelectorSearchPlaceholder: string;
    countrySelectorNoResults: string;
    companyLabel: string;
    companyPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    validation: {
      nameRequired: string;
      emailInvalid: string;
      phoneInvalid: string;
      messageTooShort: string;
      messageTooLong: string;
    };
  };
  email: {
    subjectTemplate: string;
    heading: string;
    body: string;
    summaryLabelCompany: string;
    summaryLabelPhone: string;
    summaryLabelSubject: string;
    summaryMessageLabel: string;
    ctaText: string;
    whatsappButton: string;
    scheduleButton: string;
    footerNote: string;
  };
};

export const contactContent: Record<Locale, ContactContent> = {
  pt: {
    metaTitle: "Contato — Scheffer Consultoria",
    metaDescription:
      "Fale com a Scheffer Consultoria: conte seu projeto e receba um caminho claro para começar, com resposta em até 24 horas.",
    page: {
      eyebrow: "Vamos conversar",
      heading: "Pronto para tirar seu projeto do papel?",
      paragraph:
        "Conte o que você tem em mente. Respondemos em até 24 horas com um caminho claro para começar.",
      scheduleButton: "Agendar reunião",
      whatsappButton: "WhatsApp",
      successMessage: "Mensagem enviada! Respondemos em até 24 horas.",
      errorMessage:
        "Não foi possível enviar sua mensagem agora. Tente novamente ou escreva para contato@schefferconsultoria.com.br.",
    },
    form: {
      nameLabel: "Nome",
      namePlaceholder: "Seu nome",
      emailLabel: "E-mail",
      emailPlaceholder: "voce@empresa.com",
      interestsLabel: "Assunto (opcional, selecione um ou mais)",
      interestsAriaLabel: "Sobre o que você quer falar?",
      interests: {
        web: "Aplicações Web",
        mobile: "Apps Mobile",
        marketing: "Marketing Digital",
        social: "Social Media",
        other: "Outros assuntos",
      },
      phoneLabel: "Telefone (opcional)",
      phonePlaceholder: "48 99999-9999",
      phoneChannelsAriaLabel: "Esse telefone é WhatsApp ou Telegram?",
      whatsappChannelLabel: "WhatsApp",
      telegramChannelLabel: "Telegram",
      countrySelectorLabel: "País",
      countrySelectorSearchPlaceholder: "Buscar país ou código",
      countrySelectorNoResults: "Nenhum país encontrado.",
      companyLabel: "Empresa (opcional)",
      companyPlaceholder: "Nome da empresa",
      messageLabel: "Mensagem",
      messagePlaceholder: "Conte um pouco sobre o seu projeto",
      submitButton: "Enviar mensagem",
      validation: {
        nameRequired: "Informe seu nome completo.",
        emailInvalid: "Informe um e-mail válido.",
        phoneInvalid: "Informe um número de telefone válido.",
        messageTooShort: "Conte um pouco mais sobre o seu projeto.",
        messageTooLong: "Mensagem muito longa.",
      },
    },
    email: {
      subjectTemplate: "Recebemos sua mensagem, {name}! — Scheffer Consultoria",
      heading: "Recebemos sua mensagem, {name}!",
      body: "Obrigado por entrar em contato. Nossa equipe vai analisar o que você enviou e responder em até 24 horas.",
      summaryLabelCompany: "Empresa",
      summaryLabelPhone: "Telefone",
      summaryLabelSubject: "Assunto",
      summaryMessageLabel: "Mensagem enviada",
      ctaText: "Se preferir um retorno mais rápido enquanto isso, fale com a gente agora:",
      whatsappButton: "WhatsApp",
      scheduleButton: "Agendar reunião",
      footerNote:
        "Scheffer Consultoria — este é um e-mail automático de confirmação, não é necessário responder.",
    },
  },
  en: {
    metaTitle: "Contact — Scheffer Consultoria",
    metaDescription:
      "Talk to Scheffer Consultoria: tell us about your project and get a clear path to get started, with a reply within 24 hours.",
    page: {
      eyebrow: "Let's talk",
      heading: "Ready to bring your project to life?",
      paragraph:
        "Tell us what you have in mind. We reply within 24 hours with a clear path to get started.",
      scheduleButton: "Schedule a meeting",
      whatsappButton: "WhatsApp",
      successMessage: "Message sent! We'll reply within 24 hours.",
      errorMessage:
        "We couldn't send your message right now. Please try again or e-mail us at contato@schefferconsultoria.com.br.",
    },
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      emailPlaceholder: "you@company.com",
      interestsLabel: "Subject (optional, select one or more)",
      interestsAriaLabel: "What would you like to talk about?",
      interests: {
        web: "Web Applications",
        mobile: "Mobile Apps",
        marketing: "Digital Marketing",
        social: "Social Media",
        other: "Other topics",
      },
      phoneLabel: "Phone (optional)",
      phonePlaceholder: "555 123 4567",
      phoneChannelsAriaLabel: "Is this number WhatsApp or Telegram?",
      whatsappChannelLabel: "WhatsApp",
      telegramChannelLabel: "Telegram",
      countrySelectorLabel: "Country",
      countrySelectorSearchPlaceholder: "Search country or code",
      countrySelectorNoResults: "No country found.",
      companyLabel: "Company (optional)",
      companyPlaceholder: "Company name",
      messageLabel: "Message",
      messagePlaceholder: "Tell us a bit about your project",
      submitButton: "Send message",
      validation: {
        nameRequired: "Please enter your full name.",
        emailInvalid: "Please enter a valid email address.",
        phoneInvalid: "Please enter a valid phone number.",
        messageTooShort: "Tell us a bit more about your project.",
        messageTooLong: "Message is too long.",
      },
    },
    email: {
      subjectTemplate: "We received your message, {name}! — Scheffer Consultoria",
      heading: "We received your message, {name}!",
      body: "Thank you for reaching out. Our team will review what you sent and reply within 24 hours.",
      summaryLabelCompany: "Company",
      summaryLabelPhone: "Phone",
      summaryLabelSubject: "Subject",
      summaryMessageLabel: "Message sent",
      ctaText: "If you'd like a faster reply in the meantime, reach out now:",
      whatsappButton: "WhatsApp",
      scheduleButton: "Schedule a meeting",
      footerNote:
        "Scheffer Consultoria — this is an automatic confirmation e-mail, no reply is needed.",
    },
  },
  es: {
    metaTitle: "Contacto — Scheffer Consultoria",
    metaDescription:
      "Habla con Scheffer Consultoria: cuéntanos tu proyecto y recibe un camino claro para empezar, con respuesta en hasta 24 horas.",
    page: {
      eyebrow: "Hablemos",
      heading: "¿Listo para hacer realidad tu proyecto?",
      paragraph:
        "Cuéntanos qué tienes en mente. Respondemos en hasta 24 horas con un camino claro para empezar.",
      scheduleButton: "Agendar una reunión",
      whatsappButton: "WhatsApp",
      successMessage: "¡Mensaje enviado! Responderemos en hasta 24 horas.",
      errorMessage:
        "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo o escríbenos a contato@schefferconsultoria.com.br.",
    },
    form: {
      nameLabel: "Nombre",
      namePlaceholder: "Tu nombre",
      emailLabel: "Correo electrónico",
      emailPlaceholder: "tu@empresa.com",
      interestsLabel: "Asunto (opcional, selecciona uno o más)",
      interestsAriaLabel: "¿Sobre qué quieres hablar?",
      interests: {
        web: "Aplicaciones Web",
        mobile: "Apps Móviles",
        marketing: "Marketing Digital",
        social: "Redes Sociales",
        other: "Otros temas",
      },
      phoneLabel: "Teléfono (opcional)",
      phonePlaceholder: "612 345 678",
      phoneChannelsAriaLabel: "¿Este número es WhatsApp o Telegram?",
      whatsappChannelLabel: "WhatsApp",
      telegramChannelLabel: "Telegram",
      countrySelectorLabel: "País",
      countrySelectorSearchPlaceholder: "Buscar país o código",
      countrySelectorNoResults: "No se encontró ningún país.",
      companyLabel: "Empresa (opcional)",
      companyPlaceholder: "Nombre de la empresa",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntanos un poco sobre tu proyecto",
      submitButton: "Enviar mensaje",
      validation: {
        nameRequired: "Ingresa tu nombre completo.",
        emailInvalid: "Ingresa un correo electrónico válido.",
        phoneInvalid: "Ingresa un número de teléfono válido.",
        messageTooShort: "Cuéntanos un poco más sobre tu proyecto.",
        messageTooLong: "El mensaje es demasiado largo.",
      },
    },
    email: {
      subjectTemplate: "¡Recibimos tu mensaje, {name}! — Scheffer Consultoria",
      heading: "¡Recibimos tu mensaje, {name}!",
      body: "Gracias por ponerte en contacto. Nuestro equipo revisará lo que enviaste y responderá en hasta 24 horas.",
      summaryLabelCompany: "Empresa",
      summaryLabelPhone: "Teléfono",
      summaryLabelSubject: "Asunto",
      summaryMessageLabel: "Mensaje enviado",
      ctaText: "Si prefieres una respuesta más rápida mientras tanto, contáctanos ahora:",
      whatsappButton: "WhatsApp",
      scheduleButton: "Agendar una reunión",
      footerNote:
        "Scheffer Consultoria — este es un correo automático de confirmación, no es necesario responder.",
    },
  },
};
