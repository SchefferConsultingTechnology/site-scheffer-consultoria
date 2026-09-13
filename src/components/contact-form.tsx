import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  contactSchema,
  formatBrazilPhone,
  SERVICE_INTERESTS,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/send-contact-email.server";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const renderedAt = useState(() => Date.now())[0];

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      phoneChannels: [],
      interests: [],
      company: "",
      message: "",
      honeypot: "",
      renderedAt,
    },
  });

  const phoneValue = form.watch("phone");

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const result = await sendContactEmail({ data: { ...values, renderedAt } });
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Contact form submission failed", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-border bg-background/50 p-6 text-sm text-foreground">
        Mensagem enviada! Respondemos em até 24 horas.
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden="true"
          {...form.register("honeypot")}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="voce@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="interests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assunto (opcional, selecione um ou mais)</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  size="sm"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex-wrap justify-start"
                  aria-label="Sobre o que você quer falar?"
                >
                  {SERVICE_INTERESTS.map((interest) => (
                    <ToggleGroupItem key={interest.id} value={interest.id}>
                      {interest.label}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone (opcional)</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="numeric"
                    placeholder="(00) 00000-0000"
                    {...field}
                    onChange={(e) => field.onChange(formatBrazilPhone(e.target.value))}
                  />
                </FormControl>
                {phoneValue && (
                  <FormField
                    control={form.control}
                    name="phoneChannels"
                    render={({ field: channelsField }) => (
                      <ToggleGroup
                        type="multiple"
                        variant="outline"
                        size="sm"
                        value={channelsField.value}
                        onValueChange={channelsField.onChange}
                        className="justify-start"
                        aria-label="Esse telefone é WhatsApp ou Telegram?"
                      >
                        <ToggleGroupItem value="whatsapp" aria-label="É WhatsApp">
                          WhatsApp
                        </ToggleGroupItem>
                        <ToggleGroupItem value="telegram" aria-label="É Telegram">
                          Telegram
                        </ToggleGroupItem>
                      </ToggleGroup>
                    )}
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa (opcional)</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da empresa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="Conte um pouco sobre o seu projeto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            Não foi possível enviar sua mensagem agora. Tente novamente ou escreva para{" "}
            <a href="mailto:contato@schefferconsultoria.com.br" className="underline">
              contato@schefferconsultoria.com.br
            </a>
            .
          </p>
        )}

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="h-12 w-full gap-2 rounded-full px-6 text-sm font-semibold shadow-[var(--shadow-glow)] sm:w-auto"
        >
          {status === "submitting" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Enviar mensagem
        </Button>
      </form>
    </Form>
  );
}
