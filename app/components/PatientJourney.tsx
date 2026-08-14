import {
  UserPlus,
  ClipboardList,
  Stethoscope,
  TestTube,
  Pill,
  Wallet,
  HomeIcon,
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

export default function PatientJourney() {
  return (
    <section
      id="patient-journey"
      className="relative py-20 md:py-28"
      aria-labelledby="journey-heading"
    >
      {/* soft dotted backdrop */}
      <div className="absolute inset-0 bg-dot-grid opacity-30" />

      <div className="container-page relative">
        <div className="max-w-3xl">
          <span className="eyebrow">Your visit, step by step</span>
          <h2
            id="journey-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
          >
            A calm, simple path from door to discharge
          </h2>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
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
              className="card-soft relative p-6 hover:-translate-y-1 transition-transform"
            >
              <div className="flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide text-brand-700 bg-brand-50 border border-brand-100 rounded-full px-2.5 py-1">
                  {s.duration}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2.5">
                <span className="font-display text-2xl font-semibold text-brand-200">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-brand-950">
                  {s.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.desc}
              </p>
            </li>
          ))}
        </ol>

        {/* What to bring */}
        <div className="mt-12 grid lg:grid-cols-[1fr_1.2fr] gap-5">
          <div className="card-soft p-6 lg:p-8 bg-gradient-to-br from-brand-700 to-brand-900 text-white border-0">
            <div className="flex items-center gap-2 text-brand-200">
              <HomeIcon className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Before you come
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold">
              What to bring with you
            </h3>
            <p className="mt-2 text-brand-100 text-sm leading-relaxed">
              A short checklist so your visit goes smoothly from the moment you
              walk in.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "National ID or child's birth certificate",
                "Previous clinic / immunisation records",
                "List of any medication you currently take",
                "NHIF card if you have one (optional)",
                "M-Pesa or cash for payment",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-brand-300 shrink-0" />
                  <span className="text-brand-50">{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-soft p-6 lg:p-8">
            <div className="flex items-center gap-2 text-brand-700">
              <Wallet className="h-5 w-5" />
              <span className="text-xs font-semibold uppercase tracking-wide">
                Payments we accept
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-semibold text-brand-950">
              Simple, transparent payments
            </h3>
            <p className="mt-2 text-ink-soft text-sm leading-relaxed">
              Fees are charged per visit and payable at reception before you
              leave. We&rsquo;ll always tell you the cost of any lab test or
              procedure before we do it.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl border border-line p-4">
                <p className="font-semibold text-brand-900">M-Pesa</p>
                <p className="text-xs text-ink-muted mt-1">
                  Till number at reception
                </p>
              </div>
              <div className="rounded-xl border border-line p-4">
                <p className="font-semibold text-brand-900">Cash</p>
                <p className="text-xs text-ink-muted mt-1">
                  Kenyan shillings
                </p>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-muted">
              NHIF affiliation is not yet confirmed — please ask at reception
              for the latest position if you wish to use NHIF.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
