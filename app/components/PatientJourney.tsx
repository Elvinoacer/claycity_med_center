import {
  UserPlus,
  ClipboardList,
  Stethoscope,
  TestTube,
  Pill,
  Wallet,
  ClipboardCheck,
  CheckCircle2,
} from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Arrival & registration",
    desc: "Walk in or call ahead. At reception you’ll share your name, ID and any NHIF details so we can open your visit record.",
    duration: "≈ 5 min",
  },
  {
    icon: ClipboardList,
    title: "Vitals & triage",
    desc: "A nurse takes your vitals — temperature, BP, weight — and notes your symptoms to prioritise your care.",
    duration: "≈ 8 min",
  },
  {
    icon: Stethoscope,
    title: "Consultation",
    desc: "A clinical officer examines you, listens to your history and explains what’s going on in plain language.",
    duration: "≈ 15 min",
  },
  {
    icon: TestTube,
    title: "Lab tests (if needed)",
    desc: "If a test is required, our on-site Class-B laboratory runs it the same visit so you don’t have to come back.",
    duration: "≈ 20 min",
  },
  {
    icon: Pill,
    title: "Pharmacy & advice",
    desc: "Pick up prescribed medication at our in-house pharmacy and leave with clear advice on what to do next.",
    duration: "≈ 5 min",
  },
  {
    icon: Wallet,
    title: "Payment & follow-up",
    desc: "Pay by cash or M-Pesa at reception. We’ll book any follow-up visit before you head home.",
    duration: "≈ 5 min",
  },
];

const BRING = [
  "National ID or child's birth certificate",
  "Previous clinic / immunisation records",
  "List of any medication you currently take",
  "NHIF card if you have one (optional)",
  "M-Pesa or cash for payment",
];

export default function PatientJourney() {
  return (
    <section
      id="patient-journey"
      className="cv-auto relative py-20 md:py-28 dark-wash grain overflow-hidden"
      aria-labelledby="journey-heading"
    >
      <div className="blob bg-brand-500 w-[26rem] h-[26rem] -top-24 -left-24 opacity-20" />
      <div className="blob bg-accent-500 w-[20rem] h-[20rem] bottom-0 right-0 opacity-10" />

      <div className="container-page relative z-10">
        <div className="max-w-3xl reveal">
          <span className="eyebrow eyebrow-dark">Your visit, step by step</span>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-white heading-underline text-balance"
          >
            A calm, simple path from door to discharge
          </h2>
          <p className="mt-6 text-lg text-brand-100/90 leading-relaxed">
            We&rsquo;ve designed every visit to feel predictable and unhurried.
            Here&rsquo;s what to expect from the moment you arrive at First
            Street to the moment you head home.
          </p>
        </div>

        {/* Steps grid */}
        <ol className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="reveal group relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 hover:bg-white/[0.1] hover:border-white/20 hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${(i % 3) * 60}ms` }}
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-lg shadow-brand-500/30">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide text-brand-200 bg-white/10 border border-white/15 rounded-full px-2.5 py-1">
                  {s.duration}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="font-display text-2xl font-semibold text-white/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-white">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-brand-100/80">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* What to bring / payments */}
        <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-5">
          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 lg:p-8">
            <div className="flex items-center gap-2 text-brand-200">
              <ClipboardCheck className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Before you come
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white text-balance">
              What to bring with you
            </h3>
            <p className="mt-2 text-brand-100/80 text-sm leading-relaxed">
              A short checklist so your visit goes smoothly from the moment you
              walk in.
            </p>
            <ul className="mt-5 space-y-2.5">
              {BRING.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-300 shrink-0" />
                  <span className="text-brand-50">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 lg:p-8">
            <div className="flex items-center gap-2 text-brand-200">
              <Wallet className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Payments we accept
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-white text-balance">
              Simple, transparent payments
            </h3>
            <p className="mt-2 text-brand-100/80 text-sm leading-relaxed">
              Fees are charged per visit and payable at reception before you
              leave. We&rsquo;ll always tell you the cost of any lab test or
              procedure before we do it.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/[0.07] p-4">
                <p className="font-semibold text-white">M-Pesa</p>
                <p className="text-xs text-brand-200/80 mt-1">
                  Till number at reception
                </p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.07] p-4">
                <p className="font-semibold text-white">Cash</p>
                <p className="text-xs text-brand-200/80 mt-1">
                  Kenyan shillings
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-brand-200/70">
              NHIF affiliation is not yet confirmed — please ask at reception
              for the latest position if you wish to use NHIF.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
