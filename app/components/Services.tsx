import {
  Baby,
  Syringe,
  HeartHandshake,
  TestTube,
  Stethoscope,
  Pill,
  Microscope,
  ShieldPlus,
  Ribbon,
  PhoneCall,
  ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  {
    icon: Baby,
    title: "Maternal & Child Health",
    desc: "Antenatal and postnatal care for expectant mothers, plus growth monitoring and well-baby check-ups.",
    points: ["Antenatal visits", "Postnatal reviews", "Well-baby checks"],
    tag: "Family Care",
  },
  {
    icon: Syringe,
    title: "Childhood Immunisation",
    desc: "Full KEPI schedule immunisations for infants and children, plus tetanus protection for pregnant mothers.",
    points: ["BCG · Polio · Pentavalent", "Measles & rotavirus", "TT for mothers"],
    tag: "Preventative",
  },
  {
    icon: Pill,
    title: "In-House Pharmacy",
    desc: "Licensed on-site dispensary offering quality-assured essential medicines with clear dosage instructions.",
    points: ["Genuine medications", "Affordable pricing", "Expert counselling"],
    tag: "On-Site Dispensing",
  },
  {
    icon: TestTube,
    title: "Laboratory Diagnostics",
    desc: "Class-B licensed laboratory for routine blood, urine and rapid diagnostic tests — most results ready same visit.",
    points: ["Haemoglobin & blood sugar", "Malaria & HIV rapid tests", "Urinalysis"],
    tag: "Same-Day Results",
  },
  {
    icon: Stethoscope,
    title: "Outpatient Consultation",
    desc: "Diagnosis and personalized treatment for acute illnesses, minor injuries, and chronic disease follow-ups.",
    points: ["Acute illness care", "Chronic condition reviews", "Wound dressing"],
    tag: "Primary Care",
  },
  {
    icon: HeartHandshake,
    title: "Family Planning",
    desc: "Confidential counselling and full options of short- and long-acting family planning methods by trained nurses.",
    points: ["Oral pills & injections", "Implants & IUDs", "Confidential advice"],
    tag: "Reproductive",
  },
  {
    icon: ShieldPlus,
    title: "HIV Testing & Counselling",
    desc: "Strictly confidential testing with supportive pre- and post-test counselling and STI preventative care.",
    points: ["Rapid confidential tests", "Professional counselling", "STI prevention"],
    tag: "Confidential",
  },
  {
    icon: Ribbon,
    title: "TT Vaccination",
    desc: "Tetanus toxoid vaccination for pregnant mothers and women of reproductive age to ensure newborn safety.",
    points: ["Antenatal TT schedule", "Reproductive health", "Immunisation cards"],
    tag: "Maternal",
  },
  {
    icon: Microscope,
    title: "Routine Health Screening",
    desc: "Blood pressure checks, blood glucose screening, BMI assessments, and preventive wellness checks.",
    points: ["BP monitoring", "Blood sugar tests", "Wellness checks"],
    tag: "Screening",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-24 bg-canvas overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="container-page relative z-10">
        <div className="max-w-3xl" data-reveal>
          <span className="eyebrow">Comprehensive Healthcare</span>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
          >
            Everyday healthcare for the whole family
          </h2>
          <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
            Outpatient care for Clay City, Seasons and wider Kasarani — delivered
            by a qualified clinical team in a calm, clean environment.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 [perspective:1400px]">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i % 3) * 70}ms` }}
              className="svc-3d card-soft p-6 sm:p-7 h-full flex flex-col justify-between rounded-[1.75rem] border border-line relative overflow-hidden"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-3 font-display text-6xl font-semibold text-brand-100/80"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 border border-brand-200/60 shadow-sm">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-700 bg-brand-50 border border-brand-200/80 px-2.5 py-1 rounded-full">
                    {s.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold text-brand-950">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {s.desc}
                </p>
              </div>

              <ul className="relative mt-6 space-y-2 pt-4 border-t border-line">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-xs font-medium text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-500 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div
          className="mt-14 relative overflow-hidden rounded-3xl dark-wash text-white p-8 md:p-12 shadow-2xl"
          data-reveal
        >
          <div className="relative z-10 grid md:grid-cols-[1.6fr_1fr] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-balance">
                Not sure which service you need?
              </h3>
              <p className="mt-2 text-brand-100 max-w-xl text-sm leading-relaxed">
                Call reception — we will listen and guide you to the right
                consultation, lab test, or prescription. Walk-ins are always
                welcome.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:justify-self-end w-full md:w-auto">
              <a href="tel:+254721260994" className="btn btn-white">
                <PhoneCall className="h-4 w-4 text-brand-600" />
                0721 260994
              </a>
              <a
                href="#contact"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Book Appointment
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
