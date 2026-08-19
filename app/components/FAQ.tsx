"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";

const FAQS = [
  {
    q: "Do I need to book an appointment, or can I walk in?",
    a: "Walk-ins are always welcome during opening hours. If you'd like to reduce your waiting time, give us a quick call on 0721 260994 and we'll suggest the best time to come.",
  },
  {
    q: "What are your payment options?",
    a: "We accept M-Pesa (official till number at reception) and cash in Kenyan Shillings. All fees are transparent and communicated before any lab test or procedure is conducted.",
  },
  {
    q: "Do you accept NHIF / SHA?",
    a: "We are currently private outpatient only and charge affordable out-of-pocket fees. Please call or ask at reception for our latest insurance position.",
  },
  {
    q: "Can my child be vaccinated at the clinic?",
    a: "Yes. We offer the full KEPI routine childhood immunisation schedule (BCG, Polio, Pentavalent, Measles-Rubella, Rotavirus, etc.) as well as Tetanus Toxoid (TT) for mothers.",
  },
  {
    q: "Is the laboratory on site?",
    a: "Yes. We operate an on-site Class-B licensed laboratory (KMLTTB registered), which means routine blood tests, malaria checks, urinalysis and blood sugar results are provided during the same visit.",
  },
  {
    q: "Are family planning services confidential?",
    a: "Completely. All reproductive health consultations, counselling and contraceptive procedures (pills, injectables, implants, IUDs) are private and handled by trained clinical staff.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring your National ID (or child's birth notification / immunization card), any previous medical records or prescription lists, and M-Pesa/cash for payment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 bg-canvas"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          <div data-reveal>
            <span className="eyebrow">Good to Know</span>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
            >
              Questions we hear often
            </h2>
            <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
              Can&rsquo;t find what you&rsquo;re looking for? Call{" "}
              <a
                href="tel:+254721260994"
                className="font-semibold text-brand-700 underline underline-offset-4 decoration-brand-300 hover:text-brand-900"
              >
                0721 260994
              </a>{" "}
              and our reception desk will assist.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-brand-700 to-brand-950 text-white shadow-xl">
              <p className="font-display text-xl font-semibold">
                Still have a question?
              </p>
              <p className="mt-2 text-sm text-brand-100/90 leading-relaxed">
                Send us a quick WhatsApp message or call our line directly.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-900 font-semibold text-sm px-5 py-3 hover:bg-brand-50 shadow-md transition-all"
              >
                <MessageCircle className="h-4 w-4 text-brand-600" />
                Send a Message
              </a>
            </div>
          </div>

          <div className="space-y-3" data-reveal>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-brand-300 shadow-md ring-1 ring-brand-200"
                      : "bg-white/80 border-line hover:border-brand-200 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left font-display font-semibold text-base sm:text-lg text-brand-950"
                    aria-expanded={isOpen}
                  >
                    <span>{f.q}</span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 bg-brand-600 text-white"
                          : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm sm:text-base leading-relaxed text-ink-soft border-t border-line/50 pt-3">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
