"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  CalendarClock,
  User,
  MessageSquare,
} from "lucide-react";

const SERVICES_OPTIONS = [
  "General consultation",
  "Maternal & child health",
  "Childhood immunisation",
  "Family planning",
  "Laboratory test",
  "In-house pharmacy",
  "HIV testing & counselling",
  "Health screening",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    message: "",
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello Claycity Medical Centre,%0A%0AName: ${encodeURIComponent(
      form.name
    )}%0APhone: ${encodeURIComponent(form.phone)}%0AService: ${encodeURIComponent(
      form.service
    )}%0APreferred date: ${encodeURIComponent(
      form.date
    )}%0AMessage: ${encodeURIComponent(form.message)}`;
    setSubmitted(true);
    setTimeout(() => {
      window.open(`https://wa.me/254721260994?text=${msg}`, "_blank");
    }, 400);
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 overflow-hidden hero-wash border-t border-line"
      aria-labelledby="contact-heading"
    >
      <div className="container-page relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-stretch">
          <div className="flex flex-col" data-reveal>
            <span className="eyebrow">Get in Touch</span>
            <h2
              id="contact-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
            >
              Book a visit or ask a question
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
              The fastest way to reach us is by phone or WhatsApp — our reception desk is active during clinic opening hours.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+254721260994"
                className="card-soft flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-md shadow-brand-700/30">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Call Us Directly
                  </span>
                  <span className="block font-display text-lg font-semibold text-brand-950">
                    0721 260994
                  </span>
                  <span className="block text-xs text-ink-muted">
                    Mon–Sat during opening hours
                  </span>
                </span>
              </a>

              <a
                href="mailto:nabiclaycitymedical@yahoo.com"
                className="card-soft flex items-center gap-4 p-5 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 text-white shadow-md shadow-accent-500/30">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Email Desk
                  </span>
                  <span className="block font-display text-base font-semibold text-brand-950 break-all">
                    nabiclaycitymedical@yahoo.com
                  </span>
                  <span className="block text-xs text-ink-muted">
                    We reply promptly within 24 hours
                  </span>
                </span>
              </a>

              <div className="card-soft flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 border border-brand-200">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Physical Clinic Location
                  </span>
                  <span className="block font-display text-base font-semibold text-brand-950">
                    First Street, Clay City Estate
                  </span>
                  <span className="block text-xs text-ink-muted">
                    Kasarani, Nairobi · P.O. Box 784–00618
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div
            className="card-soft p-6 sm:p-8 lg:p-10 shadow-xl border-brand-200"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 sm:py-16">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-vital-100 text-vital-600">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand-950">
                  Opening WhatsApp…
                </h3>
                <p className="mt-2 text-sm text-ink-soft max-w-sm">
                  We are redirecting you to WhatsApp so your appointment enquiry lands directly at our clinic desk.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 btn btn-ghost"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" icon={User} htmlFor="name" required>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Wanjiku Kamau"
                      className="input"
                    />
                  </Field>
                  <Field label="Phone Number" icon={Phone} htmlFor="phone" required>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="07XX XXX XXX"
                      className="input"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Service Needed" icon={MessageSquare} htmlFor="service">
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                      className="input"
                    >
                      <option value="">Choose a service…</option>
                      {SERVICES_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Preferred Date" icon={CalendarClock} htmlFor="date">
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                      className="input"
                    />
                  </Field>
                </div>

                <Field label="Message (Optional)" icon={MessageSquare} htmlFor="message">
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us briefly about your visit or question…"
                    className="input resize-none"
                  />
                </Field>

                <button type="submit" className="btn btn-primary w-full py-3.5 shadow-lg">
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>
                <p className="text-center text-xs text-ink-muted">
                  Walk-ins are always welcome during regular clinic opening hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  icon: Icon,
  htmlFor,
  required,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink-muted mb-1.5">
        <Icon className="h-3.5 w-3.5 text-brand-600" />
        {label}
        {required && <span className="text-accent-500">*</span>}
      </span>
      {children}
    </label>
  );
}
