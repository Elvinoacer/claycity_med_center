"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "Do I need to book an appointment, or can I walk in?",
    a: "Walk-ins are always welcome during opening hours. If you'd like to reduce your waiting time, give us a quick call on 0721 260994 and we'll suggest the best time to come.",
  },
  {
    q: "What are your payment options?",
    a: "We accept cash (Kenyan shillings) and M-Pesa via our till at reception. Fees are charged per visit and we'll always tell you the cost of any lab test or procedure before we do it.",
  },
  {
    q: "Do you accept NHIF?",
    a: "NHIF affiliation is not yet confirmed. Please ask at reception for the latest position if you wish to use NHIF — we'll be honest with you about what's currently possible.",
  },
  {
    q: "Can my child be vaccinated at the clinic?",
    a: "Yes. We follow the full KEPI immunisation schedule, including BCG, polio, pentavalent, measles and rotavirus vaccines. Bring your child's immunisation card so we can update it.",
  },
  {
    q: "Is the laboratory on site?",
    a: "Yes. Our Class-B licensed laboratory is on site, which means most routine tests — including haemoglobin, blood sugar, malaria, HIV rapid tests and urinalysis — are run during your visit.",
  },
  {
    q: "Are family planning services confidential?",
    a: "Absolutely. All family planning, HIV testing and STI-related services are completely confidential. Counselling is provided before any method is given.",
  },
  {
    q: "What should I bring to my first visit?",
    a: "Please bring your national ID (or your child's birth certificate), any previous clinic or immunisation records, a list of medication you currently take, and cash or M-Pesa for payment.",
  },
  {
    q: "Do you offer emergency or 24-hour services?",
    a: "We are an outpatient clinic open Monday to Saturday. For emergencies outside our hours, we recommend Shekinah Medical Centre (0.3 km west) or St. Francis Community Hospital (~2 km north) — both offer 24-hour care.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28"
      aria-labelledby="faq-heading"
    >
      <div className="container-page">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-16">
          <div>
            <span className="eyebrow">Good to know</span>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
            >
              Questions we hear often
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              Can&rsquo;t find what you&rsquo;re looking for? Call{" "}
              <a
                href="tel:+254721260994"
                className="font-semibold text-brand-700 underline underline-offset-4 decoration-brand-300 hover:text-brand-900"
              >
                0721 260994
              </a>{" "}
              and our team will help.
            </p>

            <div className="mt-8 card-soft p-6 bg-gradient-to-br from-brand-700 to-brand-900 text-white border-0">
              <p className="font-display text-xl font-semibold">
                Still have a question?
              </p>
              <p className="mt-1.5 text-sm text-brand-100">
                Send us a message and we&rsquo;ll reply within one working day.
              </p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-white text-brand-800 font-semibold text-sm px-5 py-3 hover:bg-brand-50 transition-colors"
              >
                Send a message
              </a>
            </div>
          </div>

          {/* Accordion */}
          <div className="space-y-3">
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`card-soft overflow-hidden transition-all ${
                    isOpen ? "ring-1 ring-brand-200" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 text-left p-5"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-brand-950">
                      {f.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
                        isOpen
                          ? "bg-brand-600 text-white rotate-180"
                          : "bg-brand-50 text-brand-700"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft">
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
