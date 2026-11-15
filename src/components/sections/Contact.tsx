"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { personalInfo } from "@/data";
import { cn } from "@/lib/utils";

// ─── Form schema ───────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

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
        {required && <span className="text-brand-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = cn(
  "w-full px-4 py-3 rounded-xl text-sm transition-all duration-200",
  "bg-white/60 dark:bg-white/[0.04] backdrop-blur-md",
  "border border-white/80 dark:border-white/[0.1] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]",
  "text-gray-900 dark:text-white",
  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
  "focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 focus:shadow-[0_0_24px_-4px_rgb(var(--brand-500)/0.5)]",
  "hover:border-gray-300 dark:hover:border-white/15"
);

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
  const [submitState, setSubmitState] = useState<"idle" | "success">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Static site with no backend: hand the message to the visitor's email app, addressed to me.
  const onSubmit = (data: ContactFormData) => {
    const body = `${data.message}

— ${data.name} (${data.email})`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
    setSubmitState("success");
    reset();
    setTimeout(() => setSubmitState("idle"), 15000);
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 overflow-hidden"
      aria-label="Contact section"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl"
        />
        {/* Floating glass shapes (CSS 3D, no WebGL needed) */}
        <div aria-hidden className="glass-panel absolute top-24 right-[8%] h-24 w-24 rounded-3xl rotate-12 animate-float shadow-[0_0_60px_-10px_rgb(var(--violet-500)/0.6)]" />
        <div aria-hidden className="glass-panel absolute bottom-28 left-[6%] h-16 w-16 rounded-2xl -rotate-12 animate-float [animation-delay:2s] shadow-[0_0_50px_-10px_rgb(var(--cyan-400)/0.6)]" />
        <div aria-hidden className="glass-panel absolute top-1/2 left-[45%] h-10 w-10 rounded-full animate-float [animation-delay:4s] shadow-[0_0_40px_-8px_rgb(var(--brand-500)/0.7)] hidden lg:block" />
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
            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">
                    Almost there!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Your email app should now be open with the message ready — just press send.
                    If nothing opened, email me at{" "}
                    <a href={`mailto:${personalInfo.email}`} className="text-brand-600 dark:text-brand-400 underline">
                      {personalInfo.email}
                    </a>
                    .
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field id="contact-name" label="Full Name" error={errors.name?.message} required>
                    <input
                      {...register("name")}
                      id="contact-name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      className={cn(
                        inputClasses,
                        errors.name && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                      )}
                    />
                  </Field>

                  <Field id="contact-email" label="Email Address" error={errors.email?.message} required>
                    <input
                      {...register("email")}
                      id="contact-email"
                      type="email"
                      placeholder="john@example.com"
                      autoComplete="email"
                      className={cn(
                        inputClasses,
                        errors.email && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                      )}
                    />
                  </Field>
                </div>

                <Field id="contact-subject" label="Subject" error={errors.subject?.message} required>
                  <input
                    {...register("subject")}
                    id="contact-subject"
                    type="text"
                    placeholder="Collaboration opportunity at Acme Corp"
                    className={cn(
                      inputClasses,
                      errors.subject && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
                    )}
                  />
                </Field>

                <Field id="contact-message" label="Message" error={errors.message?.message} required>
                  <textarea
                    {...register("message")}
                    id="contact-message"
                    rows={6}
                    placeholder="Tell me about your project, opportunity, or question..."
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message && "border-red-400 focus:border-red-400 focus:ring-red-400/30"
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
                    icon={<Send size={16} />}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>

          {/* Contact info panel */}
          <div className="space-y-6">
            {/* Info cards */}
            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon, label, value, href, color, bg }) => (
                <motion.div
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
                </motion.div>
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
