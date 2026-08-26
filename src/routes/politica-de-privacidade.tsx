import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import logo from "@/assets/logo_resumido.png";
import { SITE_URL } from "@/lib/site-config";

const PAGE_URL = `${SITE_URL}/politica-de-privacidade`;

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    links: [{ rel: "canonical", href: PAGE_URL }],
    meta: [
      { title: "Política de Privacidade — Scheffer Consultoria" },
      {
        name: "description",
        content:
          "Política de privacidade da Scheffer Consultoria: quais dados coletamos, como usamos e os direitos do titular conforme a LGPD.",
      },
      { property: "og:url", content: PAGE_URL },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PoliticaDePrivacidade,
});

const LAST_UPDATED = "25 de agosto de 2026";

const sections = [
  {
    title: "1. Quem somos",
    body: (
      <>
        <p>
          Este site é operado pela <strong>Scheffer Consultoria</strong> ("nós"), CNPJ [inserir
          CNPJ], com sede em [inserir endereço completo]. Para dúvidas sobre esta política ou sobre
          o tratamento dos seus dados, entre em contato pelo e-mail{" "}
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
            <strong>Agendamento de reunião:</strong> ao usar a ferramenta de agendamento (Cal.com),
            os dados informados por você nesse widget são coletados diretamente pelo provedor
            Cal.com, conforme a política de privacidade dele.
          </li>
          <li>
            <strong>Dados técnicos:</strong> informações de uso básicas geradas automaticamente pelo
            navegador (ex.: data e hora de acesso), necessárias ao funcionamento do site e à
            prevenção de abusos no formulário de contato.
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
        responder a solicitações de contato e manter a segurança do site, nos termos do art. 7º da
        Lei nº 13.709/2018 (LGPD).
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
            <strong>Resend</strong>, provedor utilizado para o envio das mensagens recebidas pelo
            formulário de contato ao nosso e-mail;
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
        Os dados enviados pelo formulário de contato são transmitidos por e-mail à nossa equipe e
        não ficam armazenados em banco de dados próprio do site. Adotamos medidas técnicas e
        organizacionais razoáveis para proteger os dados durante a transmissão. Ainda assim, nenhum
        sistema é totalmente livre de riscos.
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
        Podemos atualizar esta política periodicamente para refletir mudanças em nossas práticas ou
        por exigência legal. A data da última atualização está indicada no topo desta página.
      </p>
    ),
  },
];

function PoliticaDePrivacidade() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <img
              src={logo}
              alt="Scheffer Consultoria"
              className="h-11 w-11 rounded-full object-cover ring-1 ring-border"
            />
            <span className="font-display text-base font-semibold tracking-tight">
              Scheffer<span className="text-primary mx-2">Consultoria</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Legal</p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: {LAST_UPDATED}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Esta política explica quais dados pessoais coletamos através deste site, como os usamos e
          quais direitos você tem sobre eles, em conformidade com a Lei Geral de Proteção de Dados
          (LGPD — Lei nº 13.709/2018).
        </p>

        <div className="mt-12 grid gap-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-display text-xl font-semibold sm:text-2xl">{section.title}</h2>
              <div className="mt-3 grid gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base [&_strong]:text-foreground/90 [&_ul]:list-disc [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-center sm:px-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Scheffer Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
