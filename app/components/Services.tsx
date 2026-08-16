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
    desc: "Antenatal and postnatal care for mothers, plus well-baby check-ups to give every child the healthiest start in life.",
    points: ["Antenatal visits", "Postnatal reviews", "Well-baby checks"],
  },
  {
    icon: Syringe,
    title: "Childhood Immunisation",
    desc: "Full KEPI schedule immunisations for infants and children, plus tetanus protection for pregnant mothers.",
    points: ["BCG · Polio · Pentavalent", "Measles & rotavirus", "TT for mothers"],
  },
  {
    icon: HeartHandshake,
    title: "Family Planning",
    desc: "Confidential counselling and a full range of short- and long-acting family planning methods, fitted by trained nurses.",
    points: ["Pills & injections", "Implants & IUDs", "Counselling"],
  },
  {
    icon: TestTube,
    title: "Laboratory Services",
    desc: "Class-B licensed on-site laboratory for routine blood, urine and rapid diagnostic tests — most results the same day.",
    points: ["Haemoglobin · Blood sugar", "Malaria & HIV rapid tests", "Urinalysis"],
  },
  {
    icon: Stethoscope,
    title: "Outpatient Consultation",
    desc: "Diagnosis and treatment of everyday illness and minor injuries by our clinical officers and nursing team.",
    points: ["Acute illness", "Chronic follow-up", "Minor wound care"],
  },
  {
    icon: Pill,
    title: "In-house Pharmacy",
    desc: "Convenient on-site dispensing for prescribed medication so you leave with what you need to get better.",
    points: ["Essential medicines", "Affordable pricing", "Counselling"],
  },
  {
    icon: ShieldPlus,
    title: "HIV Testing & Counselling",
    desc: "Confidential HIV testing with pre- and post-test counselling, plus STI prevention and condom distribution.",
    points: ["Rapid HIV tests", "Pre & post counselling", "STI prevention"],
  },
  {
    icon: Ribbon,
    title: "TT Vaccination",
    desc: "Tetanus toxoid vaccination for pregnant women and women of reproductive age to protect mothers and newborns.",
    points: ["Antenatal TT doses", "Reproductive health", "Recorded updates"],
  },
  {
    icon: Microscope,
    title: "Health Screening",
    desc: "Routine screening for blood pressure, blood sugar and basic wellness checks to keep you ahead of any risk.",
    points: ["BP checks", "Blood sugar", "BMI & wellness"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="cv-auto relative py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <div className="max-w-3xl reveal">
          <span className="eyebrow">What we offer</span>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
          >
            Everyday healthcare for the whole family
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            Our services cover the everyday health needs of the Clay City,
            Seasons and wider Kasarani community — from a baby&rsquo;s first
            vaccine to a mother&rsquo;s antenatal visit and quick lab tests.
            Every consultation is delivered by a caring, qualified team in a
            calm and clean environment.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.title}
              className="reveal card-soft group relative overflow-hidden p-6 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)] hover:border-brand-200 transition-all duration-300"
              style={{ animationDelay: `${(i % 3) * 60}ms` }}
            >
              {/* Gradient hairline that sweeps in on hover */}
              <span
                className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out bg-gradient-to-r from-brand-500 via-brand-400 to-accent-400"
                aria-hidden="true"
              />
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 border border-brand-100 group-hover:bg-gradient-to-br group-hover:from-brand-500 group-hover:to-brand-700 group-hover:text-white group-hover:border-transparent group-hover:shadow-lg group-hover:shadow-brand-600/30 transition-all duration-300">
                  <s.icon className="h-6 w-6" />
                </span>
                <span className="font-display text-3xl font-semibold text-brand-100 group-hover:text-brand-200 transition-colors" >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-brand-950">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.desc}
              </p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                    {p}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="reveal-fade mt-14 relative overflow-hidden rounded-3xl dark-wash text-white p-8 md:p-12 grain">
          <div className="blob bg-brand-400 w-[20rem] h-[20rem] -top-20 -right-10 opacity-25" />
          <div className="relative z-10 grid md:grid-cols-[1.6fr_1fr] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-balance">
                Not sure which service you need?
              </h3>
              <p className="mt-2 text-brand-100 max-w-xl">
                Call our team — we&rsquo;ll listen to your concern and guide you
                to the right consultation, lab test or referral. Walk-ins are
                welcome during opening hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 md:justify-self-end w-full md:w-auto">
              <a href="tel:+254721260994" className="btn btn-white">
                <PhoneCall className="h-4 w-4" />
                0721 260994
              </a>
              <a
                href="#contact"
                className="btn bg-white/10 text-white border border-white/20 hover:bg-white/20"
              >
                Send a message
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
