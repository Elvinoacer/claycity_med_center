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
      className="relative py-20 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="container-page">
        <div className="max-w-3xl">
          <span className="eyebrow">What we offer</span>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
          >
            Everyday healthcare for the whole family
          </h2>
          <p className="mt-5 text-lg text-ink-soft leading-relaxed">
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
              className="card-soft group relative overflow-hidden p-6 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-brand-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-md shadow-brand-600/30">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="font-display text-3xl font-semibold text-brand-100 group-hover:text-brand-200 transition-colors">
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
              </div>
            </article>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white p-8 md:p-12">
          <div className="blob bg-brand-400 w-[20rem] h-[20rem] -top-16 -right-10 opacity-30" />
          <div className="relative grid md:grid-cols-[1.6fr_1fr] gap-6 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold">
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
              <a href="#contact" className="btn btn-accent">
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
