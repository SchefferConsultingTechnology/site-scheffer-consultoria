import type { ReactNode } from "react";

import type { Locale } from "@/content/locale";

export type PrivacyPolicyContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  intro: string;
  backToHome: string;
  sections: { title: string; body: ReactNode }[];
};

export const privacyPolicyContent: Record<Locale, PrivacyPolicyContent> = {
  pt: {
    metaTitle: "Política de Privacidade — Scheffer Consultoria",
    metaDescription:
      "Política de privacidade da Scheffer Consultoria: quais dados coletamos, como usamos e os direitos do titular conforme a LGPD.",
    eyebrow: "Legal",
    title: "Política de Privacidade",
    lastUpdatedLabel: "Última atualização:",
    lastUpdated: "25 de agosto de 2026",
    intro:
      "Esta política explica quais dados pessoais coletamos através deste site, como os usamos e quais direitos você tem sobre eles, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
    backToHome: "Voltar ao início",
    sections: [
      {
        title: "1. Quem somos",
        body: (
          <>
            <p>
              Este site é operado pela <strong>Scheffer Consultoria</strong> ("nós"), CNPJ [inserir
              CNPJ], com sede em [inserir endereço completo]. Para dúvidas sobre esta política ou
              sobre o tratamento dos seus dados, entre em contato pelo e-mail{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
            <p>
              Encarregado de Proteção de Dados (DPO): [inserir nome/e-mail do encarregado, se
              aplicável].
            </p>
          </>
        ),
      },
      {
        title: "2. Quais dados coletamos",
        body: (
          <>
            <p>Coletamos dados pessoais quando você interage voluntariamente com o site:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Formulário de contato:</strong> nome, e-mail, telefone (opcional), empresa
                (opcional) e o conteúdo da mensagem enviada.
              </li>
              <li>
                <strong>Agendamento de reunião:</strong> ao usar a ferramenta de agendamento
                (Cal.com), os dados informados por você nesse widget são coletados diretamente pelo
                provedor Cal.com, conforme a política de privacidade dele.
              </li>
              <li>
                <strong>Dados técnicos:</strong> informações de uso básicas geradas automaticamente
                pelo navegador (ex.: data e hora de acesso), necessárias ao funcionamento do site e
                à prevenção de abusos no formulário de contato.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "3. Para que usamos seus dados",
        body: (
          <ul className="grid gap-2">
            <li>Responder às mensagens enviadas pelo formulário de contato;</li>
            <li>Agendar e confirmar reuniões solicitadas;</li>
            <li>Manter a segurança do site e prevenir envios automatizados (spam);</li>
            <li>Cumprir obrigações legais e regulatórias, quando aplicável.</li>
          </ul>
        ),
      },
      {
        title: "4. Base legal para o tratamento",
        body: (
          <p>
            Tratamos seus dados com base no <strong>consentimento</strong> (ao preencher e enviar o
            formulário de contato ou o agendamento) e no <strong>legítimo interesse</strong> em
            responder a solicitações de contato e manter a segurança do site, nos termos do art. 7º
            da Lei nº 13.709/2018 (LGPD).
          </p>
        ),
      },
      {
        title: "5. Com quem compartilhamos os dados",
        body: (
          <>
            <p>Não vendemos dados pessoais. Compartilhamos dados apenas com:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Resend</strong>, provedor utilizado para o envio das mensagens recebidas
                pelo formulário de contato ao nosso e-mail;
              </li>
              <li>
                <strong>Cal.com</strong>, provedor utilizado para o agendamento de reuniões;
              </li>
              <li>Autoridades públicas, quando exigido por lei ou ordem judicial.</li>
            </ul>
          </>
        ),
      },
      {
        title: "6. Cookies",
        body: (
          <p>
            O site em si não utiliza cookies próprios de rastreamento ou de analytics. O widget de
            agendamento (Cal.com), quando aberto, pode definir cookies próprios necessários ao seu
            funcionamento, conforme a política de privacidade do Cal.com.
          </p>
        ),
      },
      {
        title: "7. Armazenamento e segurança",
        body: (
          <p>
            Os dados enviados pelo formulário de contato são transmitidos por e-mail à nossa equipe
            e não ficam armazenados em banco de dados próprio do site. Adotamos medidas técnicas e
            organizacionais razoáveis para proteger os dados durante a transmissão. Ainda assim,
            nenhum sistema é totalmente livre de riscos.
          </p>
        ),
      },
      {
        title: "8. Por quanto tempo guardamos seus dados",
        body: (
          <p>
            Mantemos os dados recebidos pelo prazo necessário para responder ao seu contato e para
            cumprir eventuais obrigações legais, após o que são descartados ou anonimizados.
          </p>
        ),
      },
      {
        title: "9. Seus direitos como titular de dados",
        body: (
          <>
            <p>Nos termos da LGPD, você pode solicitar a qualquer momento:</p>
            <ul className="mt-3 grid gap-2">
              <li>Confirmação da existência de tratamento e acesso aos seus dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>Eliminação dos dados tratados com base no seu consentimento;</li>
              <li>Revogação do consentimento, a qualquer momento;</li>
              <li>Informação sobre com quem compartilhamos seus dados.</li>
            </ul>
            <p className="mt-3">
              Para exercer esses direitos, envie um e-mail para{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
          </>
        ),
      },
      {
        title: "10. Alterações desta política",
        body: (
          <p>
            Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas
            ou por exigência legal. A data da última atualização está indicada no topo desta página.
          </p>
        ),
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy — Scheffer Consultoria",
    metaDescription:
      "Scheffer Consultoria's privacy policy: what data we collect, how we use it, and your rights under Brazil's LGPD.",
    eyebrow: "Legal",
    title: "Privacy Policy",
    lastUpdatedLabel: "Last updated:",
    lastUpdated: "August 25, 2026",
    intro:
      "This policy explains what personal data we collect through this site, how we use it, and what rights you have over it, in compliance with Brazil's General Data Protection Law (LGPD — Federal Law No. 13,709/2018).",
    backToHome: "Back to home",
    sections: [
      {
        title: "1. Who we are",
        body: (
          <>
            <p>
              This website is operated by <strong>Scheffer Consultoria</strong> ("we," "us"),
              Brazilian company registration (CNPJ) [insert CNPJ], headquartered at [insert full
              address], Brazil. For questions about this policy or how your data is handled, contact
              us at{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
            <p>Data Protection Officer (DPO): [insert DPO name/e-mail, if applicable].</p>
          </>
        ),
      },
      {
        title: "2. What data we collect",
        body: (
          <>
            <p>We collect personal data when you voluntarily interact with the site:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Contact form:</strong> name, e-mail, phone (optional), company (optional),
                and the content of the message sent.
              </li>
              <li>
                <strong>Meeting scheduling:</strong> when you use the scheduling tool (Cal.com), the
                data you provide in that widget is collected directly by the Cal.com provider, under
                its own privacy policy.
              </li>
              <li>
                <strong>Technical data:</strong> basic usage information automatically generated by
                the browser (e.g. date and time of access), necessary for the site to function and
                to prevent abuse of the contact form.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "3. What we use your data for",
        body: (
          <ul className="grid gap-2">
            <li>Replying to messages sent through the contact form;</li>
            <li>Scheduling and confirming requested meetings;</li>
            <li>Keeping the site secure and preventing automated submissions (spam);</li>
            <li>Complying with legal and regulatory obligations, when applicable.</li>
          </ul>
        ),
      },
      {
        title: "4. Legal basis for processing",
        body: (
          <p>
            We process your data based on <strong>consent</strong> (when you fill out and submit the
            contact form or a scheduling request) and on <strong>legitimate interest</strong> in
            responding to contact requests and keeping the site secure, under article 7 of Brazilian
            Federal Law No. 13,709/2018 (LGPD).
          </p>
        ),
      },
      {
        title: "5. Who we share data with",
        body: (
          <>
            <p>We do not sell personal data. We share data only with:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Resend</strong>, the provider used to deliver messages received through the
                contact form to our e-mail;
              </li>
              <li>
                <strong>Cal.com</strong>, the provider used for meeting scheduling;
              </li>
              <li>Public authorities, when required by law or court order.</li>
            </ul>
          </>
        ),
      },
      {
        title: "6. Cookies",
        body: (
          <p>
            The site itself does not use its own tracking or analytics cookies. The scheduling
            widget (Cal.com), when opened, may set its own cookies necessary for it to function,
            under Cal.com's own privacy policy.
          </p>
        ),
      },
      {
        title: "7. Storage and security",
        body: (
          <p>
            Data submitted through the contact form is transmitted by e-mail to our team and is not
            stored in a database of the site's own. We adopt reasonable technical and organizational
            measures to protect data during transmission. Even so, no system is entirely free of
            risk.
          </p>
        ),
      },
      {
        title: "8. How long we keep your data",
        body: (
          <p>
            We keep the data received for as long as necessary to respond to your contact and to
            comply with any legal obligations, after which it is discarded or anonymized.
          </p>
        ),
      },
      {
        title: "9. Your rights as a data subject",
        body: (
          <>
            <p>Under the LGPD, you may request at any time:</p>
            <ul className="mt-3 grid gap-2">
              <li>Confirmation that processing exists and access to your data;</li>
              <li>Correction of incomplete, inaccurate, or outdated data;</li>
              <li>Anonymization, blocking, or deletion of unnecessary or excessive data;</li>
              <li>Portability of your data to another service provider;</li>
              <li>Deletion of data processed based on your consent;</li>
              <li>Withdrawal of consent, at any time;</li>
              <li>Information about who we share your data with.</li>
            </ul>
            <p className="mt-3">
              To exercise these rights, send an e-mail to{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
          </>
        ),
      },
      {
        title: "10. Changes to this policy",
        body: (
          <p>
            We may update this policy periodically to reflect changes in our practices or as
            required by law. The date of the last update is shown at the top of this page.
          </p>
        ),
      },
    ],
  },
  es: {
    metaTitle: "Política de Privacidad — Scheffer Consultoria",
    metaDescription:
      "Política de privacidad de Scheffer Consultoria: qué datos recopilamos, cómo los usamos y los derechos del titular conforme a la LGPD.",
    eyebrow: "Legal",
    title: "Política de Privacidad",
    lastUpdatedLabel: "Última actualización:",
    lastUpdated: "25 de agosto de 2026",
    intro:
      "Esta política explica qué datos personales recopilamos a través de este sitio, cómo los usamos y qué derechos tienes sobre ellos, en cumplimiento con la Ley General de Protección de Datos de Brasil (LGPD — Ley federal n.º 13.709/2018).",
    backToHome: "Volver al inicio",
    sections: [
      {
        title: "1. Quiénes somos",
        body: (
          <>
            <p>
              Este sitio web es operado por <strong>Scheffer Consultoria</strong> ("nosotros"), con
              registro de empresa brasileña (CNPJ) [insertar CNPJ], con sede en [insertar dirección
              completa], Brasil. Para preguntas sobre esta política o sobre el tratamiento de tus
              datos, contáctanos en{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
            <p>
              Encargado de Protección de Datos (DPO): [insertar nombre/correo del encargado, si
              corresponde].
            </p>
          </>
        ),
      },
      {
        title: "2. Qué datos recopilamos",
        body: (
          <>
            <p>Recopilamos datos personales cuando interactúas voluntariamente con el sitio:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Formulario de contacto:</strong> nombre, correo electrónico, teléfono
                (opcional), empresa (opcional) y el contenido del mensaje enviado.
              </li>
              <li>
                <strong>Agendamiento de reuniones:</strong> al usar la herramienta de agendamiento
                (Cal.com), los datos que proporcionas en ese widget son recopilados directamente por
                el proveedor Cal.com, conforme a su propia política de privacidad.
              </li>
              <li>
                <strong>Datos técnicos:</strong> información básica de uso generada automáticamente
                por el navegador (por ejemplo, fecha y hora de acceso), necesaria para el
                funcionamiento del sitio y la prevención de abusos en el formulario de contacto.
              </li>
            </ul>
          </>
        ),
      },
      {
        title: "3. Para qué usamos tus datos",
        body: (
          <ul className="grid gap-2">
            <li>Responder a los mensajes enviados a través del formulario de contacto;</li>
            <li>Agendar y confirmar las reuniones solicitadas;</li>
            <li>Mantener la seguridad del sitio y prevenir envíos automatizados (spam);</li>
            <li>Cumplir con obligaciones legales y regulatorias, cuando corresponda.</li>
          </ul>
        ),
      },
      {
        title: "4. Base legal para el tratamiento",
        body: (
          <p>
            Tratamos tus datos con base en el <strong>consentimiento</strong> (al completar y enviar
            el formulario de contacto o el agendamiento) y en el <strong>interés legítimo</strong>{" "}
            de responder a las solicitudes de contacto y mantener la seguridad del sitio, conforme
            al artículo 7 de la Ley federal brasileña n.º 13.709/2018 (LGPD).
          </p>
        ),
      },
      {
        title: "5. Con quién compartimos los datos",
        body: (
          <>
            <p>No vendemos datos personales. Compartimos datos únicamente con:</p>
            <ul className="mt-3 grid gap-2">
              <li>
                <strong>Resend</strong>, el proveedor utilizado para enviar a nuestro correo los
                mensajes recibidos a través del formulario de contacto;
              </li>
              <li>
                <strong>Cal.com</strong>, el proveedor utilizado para el agendamiento de reuniones;
              </li>
              <li>Autoridades públicas, cuando lo exija la ley o una orden judicial.</li>
            </ul>
          </>
        ),
      },
      {
        title: "6. Cookies",
        body: (
          <p>
            El sitio en sí no utiliza cookies propias de seguimiento o de análisis. El widget de
            agendamiento (Cal.com), al abrirse, puede establecer sus propias cookies necesarias para
            su funcionamiento, conforme a la política de privacidad de Cal.com.
          </p>
        ),
      },
      {
        title: "7. Almacenamiento y seguridad",
        body: (
          <p>
            Los datos enviados a través del formulario de contacto se transmiten por correo
            electrónico a nuestro equipo y no se almacenan en una base de datos propia del sitio.
            Adoptamos medidas técnicas y organizativas razonables para proteger los datos durante la
            transmisión. Aun así, ningún sistema está completamente libre de riesgos.
          </p>
        ),
      },
      {
        title: "8. Por cuánto tiempo conservamos tus datos",
        body: (
          <p>
            Conservamos los datos recibidos durante el tiempo necesario para responder a tu contacto
            y cumplir con las obligaciones legales que correspondan, tras lo cual se eliminan o se
            anonimizan.
          </p>
        ),
      },
      {
        title: "9. Tus derechos como titular de los datos",
        body: (
          <>
            <p>Conforme a la LGPD, puedes solicitar en cualquier momento:</p>
            <ul className="mt-3 grid gap-2">
              <li>Confirmación de la existencia de tratamiento y acceso a tus datos;</li>
              <li>Corrección de datos incompletos, inexactos o desactualizados;</li>
              <li>Anonimización, bloqueo o eliminación de datos innecesarios o excesivos;</li>
              <li>Portabilidad de los datos a otro proveedor de servicios;</li>
              <li>Eliminación de los datos tratados con base en tu consentimiento;</li>
              <li>Revocación del consentimiento, en cualquier momento;</li>
              <li>Información sobre con quién compartimos tus datos.</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, envía un correo a{" "}
              <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
                contato@schefferconsultoria.com.br
              </a>
              .
            </p>
          </>
        ),
      },
      {
        title: "10. Cambios a esta política",
        body: (
          <p>
            Podemos actualizar esta política periódicamente para reflejar cambios en nuestras
            prácticas o por exigencia legal. La fecha de la última actualización se indica en la
            parte superior de esta página.
          </p>
        ),
      },
    ],
  },
};
