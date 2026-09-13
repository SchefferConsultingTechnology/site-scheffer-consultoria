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
  buildContactSchema,
  formatPhoneInput,
  SERVICE_INTEREST_IDS,
  type ContactFormValues,
} from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/send-contact-email.server";
import { contactContent } from "@/content/contact";
import type { Locale } from "@/content/locale";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<Status>("idle");
  const renderedAt = useState(() => Date.now())[0];
  const t = contactContent[locale].form;
  const pageT = contactContent[locale].page;

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(buildContactSchema(locale)),
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
      locale,
    },
  });

  const phoneValue = form.watch("phone");

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const result = await sendContactEmail({ data: { ...values, renderedAt, locale } });
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
        {pageT.successMessage}
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
                <FormLabel>{t.nameLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.namePlaceholder} {...field} />
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
                <FormLabel>{t.emailLabel}</FormLabel>
                <FormControl>
                  <Input type="email" placeholder={t.emailPlaceholder} {...field} />
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
              <FormLabel>{t.interestsLabel}</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  variant="outline"
                  size="sm"
                  value={field.value}
                  onValueChange={field.onChange}
                  className="flex-wrap justify-start"
                  aria-label={t.interestsAriaLabel}
                >
                  {SERVICE_INTEREST_IDS.map((id) => (
                    <ToggleGroupItem key={id} value={id}>
                      {t.interests[id]}
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
                <FormLabel>{t.phoneLabel}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder={t.phonePlaceholder}
                    {...field}
                    onChange={(e) => field.onChange(formatPhoneInput(e.target.value))}
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
                        aria-label={t.phoneChannelsAriaLabel}
                      >
                        <ToggleGroupItem value="whatsapp" aria-label={t.whatsappChannelLabel}>
                          {t.whatsappChannelLabel}
                        </ToggleGroupItem>
                        <ToggleGroupItem value="telegram" aria-label={t.telegramChannelLabel}>
                          {t.telegramChannelLabel}
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
                <FormLabel>{t.companyLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.companyPlaceholder} {...field} />
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
              <FormLabel>{t.messageLabel}</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder={t.messagePlaceholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {status === "error" && (
          <p className="text-sm text-destructive" role="alert">
            {pageT.errorMessage}
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
          {t.submitButton}
        </Button>
      </form>
    </Form>
  );
}
