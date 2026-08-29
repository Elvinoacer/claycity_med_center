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
  ArrowRight,
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
      className="immersive-contact"
      aria-labelledby="contact-heading"
    >
      <div className="container-page immersive-contact-inner">
        <div className="immersive-contact-grid">
          <div className="immersive-contact-copy" data-reveal>
            <span className="immersive-kicker">Get in touch</span>
            <h2 id="contact-heading">
              Book a visit<br />
              <em>or ask a question.</em>
            </h2>
            <p className="immersive-contact-lede">
              The fastest way to reach us is by phone or WhatsApp — our reception
              desk is active during clinic opening hours.
            </p>

            <div className="immersive-contact-cards">
              <a href="tel:+254721260994" className="immersive-contact-card">
                <span className="immersive-contact-card-icon phone">
                  <Phone size={18} />
                </span>
                <span>
                  <small>Call us directly</small>
                  <strong>0721 260994</strong>
                  <span>Mon–Sat during opening hours</span>
                </span>
              </a>

              <a
                href="mailto:nabiclaycitymedical@yahoo.com"
                className="immersive-contact-card"
              >
                <span className="immersive-contact-card-icon mail">
                  <Mail size={18} />
                </span>
                <span>
                  <small>Email desk</small>
                  <strong className="break-all">nabiclaycitymedical@yahoo.com</strong>
                  <span>We reply within 24 hours</span>
                </span>
              </a>

              <div className="immersive-contact-card static">
                <span className="immersive-contact-card-icon map">
                  <MapPin size={18} />
                </span>
                <span>
                  <small>Physical clinic</small>
                  <strong>First Street, Clay City Estate</strong>
                  <span>Kasarani, Nairobi · P.O. Box 784–00618</span>
                </span>
              </div>
            </div>
          </div>

          <div
            className="immersive-contact-form-wrap"
            data-reveal
            style={{ ["--reveal-delay" as string]: "100ms" }}
          >
            {submitted ? (
              <div className="immersive-contact-success">
                <span className="immersive-contact-success-icon">
                  <CheckCircle2 size={32} />
                </span>
                <h3>Opening WhatsApp…</h3>
                <p>
                  We are redirecting you so your appointment enquiry lands
                  directly at our clinic desk.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="immersive-text-link"
                >
                  Send another message <ArrowRight size={15} />
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="immersive-contact-form">
                <div className="immersive-form-row">
                  <label htmlFor="name">
                    <span>
                      <User size={13} /> Full name *
                    </span>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Wanjiku Kamau"
                    />
                  </label>
                  <label htmlFor="phone">
                    <span>
                      <Phone size={13} /> Phone number *
                    </span>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="07XX XXX XXX"
                    />
                  </label>
                </div>

                <div className="immersive-form-row">
                  <label htmlFor="service">
                    <span>
                      <MessageSquare size={13} /> Service needed
                    </span>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) =>
                        setForm({ ...form, service: e.target.value })
                      }
                    >
                      <option value="">Choose a service…</option>
                      {SERVICES_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="date">
                    <span>
                      <CalendarClock size={13} /> Preferred date
                    </span>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        setForm({ ...form, date: e.target.value })
                      }
                    />
                  </label>
                </div>

                <label htmlFor="message">
                  <span>
                    <MessageSquare size={13} /> Message (optional)
                  </span>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="Tell us briefly about your visit or question…"
                  />
                </label>

                <button type="submit" className="immersive-button coral-button full">
                  <Send size={16} />
                  Send via WhatsApp
                  <ArrowRight size={15} />
                </button>
                <p className="immersive-form-note">
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
