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
    // Construct a WhatsApp/SMS-friendly message and open the phone link
    const msg = `Hello Claycity Medical Centre,%0A%0AName: ${encodeURIComponent(
      form.name
    )}%0APhone: ${encodeURIComponent(form.phone)}%0AService: ${encodeURIComponent(
      form.service
    )}%0APreferred date: ${encodeURIComponent(
      form.date
    )}%0AMessage: ${encodeURIComponent(form.message)}`;
    setSubmitted(true);
    // Open WhatsApp link (works on desktop and mobile)
    setTimeout(() => {
      window.open(`https://wa.me/254721260994?text=${msg}`, "_blank");
    }, 400);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      <div className="blob bg-brand-300 w-[28rem] h-[28rem] -top-24 right-0 opacity-30" />
      <div className="blob bg-accent-200 w-[20rem] h-[20rem] -bottom-24 -left-16 opacity-25" />

      <div className="container-page relative">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-stretch">
          {/* Left: details */}
          <div className="flex flex-col">
            <span className="eyebrow">Get in touch</span>
            <h2
              id="contact-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
            >
              Book a visit or ask a question
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              The fastest way to reach us is by phone — our reception is staffed
              during opening hours. Otherwise, send a message and we&rsquo;ll
              reply within one working day.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="tel:+254721260994"
                className="card-soft flex items-center gap-4 p-5 hover:-translate-y-0.5 transition-transform"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/30">
                  <Phone className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Call us
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
                className="card-soft flex items-center gap-4 p-5 hover:-translate-y-0.5 transition-transform"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-500 text-white shadow-md shadow-accent-500/30">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Email us
                  </span>
                  <span className="block font-display text-base font-semibold text-brand-950 break-all">
                    nabiclaycitymedical@yahoo.com
                  </span>
                  <span className="block text-xs text-ink-muted">
                    We reply within 24 hours
                  </span>
                </span>
              </a>

              <div className="card-soft flex items-center gap-4 p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-ink-muted">
                    Visit us
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

          {/* Right: form */}
          <div className="card-soft p-6 sm:p-8 lg:p-10">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-10 sm:py-16">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <CheckCircle2 className="h-8 w-8" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-brand-950">
                  Opening WhatsApp…
                </h3>
                <p className="mt-2 text-sm text-ink-soft max-w-sm">
                  We&rsquo;re redirecting you to WhatsApp so your message lands
                  directly with our reception. If nothing happens, call us on{" "}
                  <a
                    href="tel:+254721260994"
                    className="font-semibold text-brand-700 underline underline-offset-2"
                  >
                    0721 260994
                  </a>
                  .
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
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Full name"
                    icon={User}
                    htmlFor="name"
                    required
                  >
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
                  <Field
                    label="Phone number"
                    icon={Phone}
                    htmlFor="phone"
                    required
                  >
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
                  <Field
                    label="Service needed"
                    icon={MessageSquare}
                    htmlFor="service"
                  >
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
                  <Field
                    label="Preferred date"
                    icon={CalendarClock}
                    htmlFor="date"
                  >
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

                <Field
                  label="Message (optional)"
                  icon={MessageSquare}
                  htmlFor="message"
                >
                  <textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us briefly what you need…"
                    className="input resize-none"
                  />
                </Field>

                <button type="submit" className="btn btn-primary w-full">
                  <Send className="h-4 w-4" />
                  Send via WhatsApp
                </button>
                <p className="text-center text-xs text-ink-muted">
                  By sending this message you agree to be contacted by
                  Claycity Medical Centre about your enquiry.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Local style for inputs */}
      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.85rem;
          border: 1px solid var(--color-line);
          background: #fff;
          color: var(--color-ink);
          font-size: 0.95rem;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        :global(.input:focus) {
          outline: none;
          border-color: var(--color-brand-500);
          box-shadow: 0 0 0 4px rgba(20, 173, 141, 0.12);
        }
        :global(.input::placeholder) {
          color: var(--color-ink-muted);
        }
      `}</style>
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
