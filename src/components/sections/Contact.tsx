"use client";

import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Phone,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  RotateCcw,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";

// ─── Form schema ───────────────────────────────────────────────────────────────
// trim() so whitespace-only input fails; max() keeps messages a sane size.
const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be 100 characters or less"),
  email: z.string().trim().email("Please enter a valid email address").max(200, "Email must be 200 characters or less"),
  subject: z.string().trim().min(5, "Subject must be at least 5 characters").max(150, "Subject must be 150 characters or less"),
  message: z.string().trim().min(20, "Message must be at least 20 characters").max(1500, "Message must be 1500 characters or less"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// Set in .env.local / the host's env; inlined into the static build at build time.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

// ─── Form field component ──────────────────────────────────────────────────────
function Field({
  id,
  label,
  error,
  children,
  required,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span aria-hidden className="text-brand-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-xs font-semibold text-gray-900 dark:text-white">
          <AlertCircle size={12} aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = cn(
  "w-full px-4 py-3 rounded-xl text-sm transition-all duration-200 scroll-mt-28", // scroll-mt: keep focused fields clear of the fixed navbar
  "bg-white/60 dark:bg-white/[0.04] backdrop-blur-md",
  "border border-gray-200 dark:border-white/[0.1] shadow-[inset_0_1px_2px_rgba(22,38,35,0.04)]",
  "text-gray-900 dark:text-white",
  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  "focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:shadow-[0_0_24px_-4px_rgb(var(--brand-500)/0.5)]",
  "hover:border-gray-300 dark:hover:border-white/15"
);

// Errors use the darkest palette ink so they never look like the teal focus state.
const inputErrorClasses =
  "border-gray-900 dark:border-white focus:border-gray-900 dark:focus:border-white focus:ring-gray-900/20 dark:focus:ring-white/30";

/** Ties an input to its error message for screen readers. */
const fieldA11y = (id: string, error?: string) => ({
  "aria-required": true,
  "aria-invalid": !!error,
  "aria-describedby": error ? `${id}-error` : undefined,
});

const CONTACT_INFO = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: "text-brand-500",
    bg: "bg-brand-500/10",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    value: "asad-ali-full-stack-developer",
    href: personalInfo.socials.find((s) => s.platform === "LinkedIn")!.url,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    value: "Asad-ali-ZAFFAR-iqball",
    href: personalInfo.socials.find((s) => s.platform === "GitHub")!.url,
    color: "text-gray-700 dark:text-gray-300",
    bg: "bg-gray-200 dark:bg-white/10",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone?.replace(/\s/g, "")}`,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: personalInfo.location,
    href: undefined,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error" | "copied" | "copyFailed">("idle");
  const reduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const emailBody = (data: ContactFormData) => `${data.message}

— ${data.name} (${data.email})`;

  // Static site with no backend: Web3Forms emails the message to me. On failure the form keeps its data.
  const onSubmit = async (data: ContactFormData) => {
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Portfolio: ${data.subject}`,
          from_name: data.name,
          name: data.name,
          email: data.email, // Web3Forms sets this as Reply-To
          message: data.message,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.message);
      reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const copyMessage = async () => {
    const data = getValues();
    try {
      await navigator.clipboard.writeText(`To: ${personalInfo.email}\nSubject: ${data.subject}\n\n${emailBody(data)}`);
      setStatus("copied");
    } catch {
      setStatus("copyFailed");
    }
  };

  const clearForm = () => {
    reset();
    setStatus("idle");
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <m.div
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          // Centre via motion x: an animated scale overwrites Tailwind's translate class and the orb jumps
          style={{ x: "-50%" }}
          className="absolute -bottom-32 left-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl"
        />
        {/* Floating glass shapes (CSS 3D, no WebGL needed) */}
        <div aria-hidden className="hidden dark:block glass-panel absolute top-24 right-[8%] h-24 w-24 rounded-3xl rotate-12 animate-float shadow-[0_0_60px_-10px_rgb(var(--violet-500)/0.6)]" />
        <div aria-hidden className="hidden dark:block glass-panel absolute bottom-28 left-[6%] h-16 w-16 rounded-2xl -rotate-12 animate-float [animation-delay:2s] shadow-[0_0_50px_-10px_rgb(var(--cyan-400)/0.6)]" />
        <div aria-hidden className="glass-panel absolute top-1/2 left-[45%] h-10 w-10 rounded-full animate-float [animation-delay:4s] shadow-[0_0_40px_-8px_rgb(var(--brand-500)/0.7)] hidden dark:lg:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get in Touch"
          title="Let&apos;s Build Something Extraordinary."
          description="Whether you have an opportunity, a question, or just want to connect — my inbox is always open."
        />

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-start">
          {/* Contact form */}
          <GlassCard className="p-8">
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="contact-name" label="Full Name" error={errors.name?.message} required>
                    <input
                      {...register("name")}
                      {...fieldA11y("contact-name", errors.name?.message)}
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      className={cn(
                        inputClasses,
                        errors.name && inputErrorClasses
                      )}
                    />
                  </Field>

                  <Field id="contact-email" label="Email Address" error={errors.email?.message} required>
                    <input
                      {...register("email")}
                      {...fieldA11y("contact-email", errors.email?.message)}
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={cn(
                        inputClasses,
                        errors.email && inputErrorClasses
                      )}
                    />
                  </Field>
                </div>

                <Field id="contact-subject" label="Subject" error={errors.subject?.message} required>
                  <input
                    {...register("subject")}
                    {...fieldA11y("contact-subject", errors.subject?.message)}
                    id="contact-subject"
                    type="text"
                    placeholder="Collaboration opportunity at Acme Corp"
                    className={cn(
                      inputClasses,
                      errors.subject && inputErrorClasses
                    )}
                  />
                </Field>

                <Field id="contact-message" label="Message" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    {...fieldA11y("contact-message", errors.message?.message)}
                    id="contact-message"
                    rows={6}
                    placeholder="Tell me about your project, opportunity, or question..."
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message && inputErrorClasses
                    )}
                  />
                </Field>

                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1.5">
                    <Clock size={12} />
                    Typical response within 24 hours
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    className="bg-gradient-to-r from-brand-600 via-brand-500 to-violet-600 border-transparent"
                    size="md"
                    isLoading={status === "sending"}
                    icon={<Send size={16} />}
                  >
                    Send Message
                  </Button>
                </div>

                {/* Status after "Send": on failure the form keeps its data until the visitor clears it */}
                <div role="status" aria-live="polite">
                  {status === "sent" && (
                    <p className="mt-2 flex items-start gap-2 rounded-xl border border-brand-500/30 bg-brand-500/5 p-4 text-sm font-medium text-gray-900 dark:text-white">
                      <CheckCircle2 size={16} aria-hidden className="mt-0.5 flex-shrink-0 text-brand-500" />
                      Thanks! Your message has been sent. I&apos;ll get back to you soon.
                    </p>
                  )}
                  {(status === "error" || status === "copied" || status === "copyFailed") && (
                    <div className="mt-2 rounded-xl border border-brand-500/30 bg-brand-500/5 p-4 text-sm text-gray-700 dark:text-gray-300">
                      <p className="flex items-start gap-2 font-medium text-gray-900 dark:text-white">
                        {status === "copied" ? (
                          <CheckCircle2 size={16} aria-hidden className="mt-0.5 flex-shrink-0 text-brand-500" />
                        ) : (
                          <AlertCircle size={16} aria-hidden className="mt-0.5 flex-shrink-0" />
                        )}
                        {status === "error" && "Sorry, your message couldn't be sent. It's still in the form, so you can try again or copy it."}
                        {status === "copied" && `Message copied. Paste it into an email to ${personalInfo.email}.`}
                        {status === "copyFailed" && "Couldn't copy automatically. Your message is still in the form, so you can select and copy it."}
                      </p>
                      <p className="mt-2">
                        You can also email me directly at{" "}
                        <a href={`mailto:${personalInfo.email}`} className="text-brand-600 dark:text-brand-400 underline">
                          {personalInfo.email}
                        </a>
                        .
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" variant="secondary" size="sm" icon={<Copy size={14} />} iconPosition="left" onClick={copyMessage}>
                          Copy message
                        </Button>
                        <Button type="button" variant="ghost" size="sm" icon={<RotateCcw size={14} />} iconPosition="left" onClick={clearForm}>
                          Clear form
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </form>
          </GlassCard>

          {/* Contact info panel */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon, label, value, href, color, bg }) => (
                <m.div
                  key={label}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03] hover:border-brand-500/30 transition-all duration-200 group"
                    >
                      <div className={cn("p-2.5 rounded-lg flex-shrink-0", color, bg)}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate group-hover:text-brand-500 dark:group-hover:text-brand-400 transition-colors">
                          {value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-gray-200/80 dark:border-white/[0.06] bg-white/60 dark:bg-white/[0.03]">
                      <div className={cn("p-2.5 rounded-lg flex-shrink-0", color, bg)}>
                        {icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  )}
                </m.div>
              ))}
            </div>

            {/* Availability card */}
            <GlassCard className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow" />
                <p className="font-semibold text-sm text-gray-900 dark:text-white">
                  Available for Opportunities
                </p>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                Open to Laravel and full-stack engineering roles with product
                teams and remote-first companies — building scalable web
                applications with PHP, Laravel, Vue.js, React.js and TypeScript.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-200/80 dark:border-white/[0.06] flex flex-wrap gap-2">
                {["Remote OK", "Full-time", "Laravel", "Full-Stack"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200/80 dark:border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
