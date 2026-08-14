import Image from "next/image";
import { ShieldCheck, Award, Users, HeartHandshake } from "lucide-react";

const STATS = [
  { value: "Level-2", label: "Licensed clinic (KMPDC)" },
  { value: "Class B", label: "On-site laboratory (KMLTTB)" },
  { value: "Mon–Sat", label: "Open six days a week" },
  { value: "Walk-in", label: "No appointment needed" },
];

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Caring, not clinical",
    desc: "We take time to listen and explain. You are a neighbour, not a queue number — every visit is treated with patience and respect.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & audited",
    desc: "Registered with the Kenya Medical Practitioners & Dentists Council as a Level-2 clinic, with an active Class-B laboratory licence.",
  },
  {
    icon: Award,
    title: "Affordable & honest",
    desc: "Clear out-of-pocket pricing, no hidden fees. Cash and M-Pesa accepted, with fair pricing designed for our community.",
  },
  {
    icon: Users,
    title: "Family-focused",
    desc: "From a baby&rsquo;s first vaccine to a grandmother&rsquo;s BP check, we keep the whole family healthy across every season of life.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-gradient-to-b from-brand-50/40 to-canvas"
      aria-labelledby="about-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/images/nurse-portrait.jpg"
                    alt="Friendly nurse at Claycity Medical Centre"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="card-soft p-5">
                  <p className="font-display text-3xl font-semibold text-brand-700">
                    100%
                  </p>
                  <p className="text-sm text-ink-soft mt-1">
                    Confidential &amp; respectful care, every visit.
                  </p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="card-soft p-5 bg-brand-700 text-white border-brand-700">
                  <p className="font-display text-3xl font-semibold">
                    Since 2018
                  </p>
                  <p className="text-sm text-brand-100 mt-1">
                    Quietly serving the Clay City &amp; Seasons community.
                  </p>
                </div>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <Image
                    src="/images/maternity-care.jpg"
                    alt="Maternal and child health visit at Claycity Medical Centre"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Copy side */}
          <div className="order-1 lg:order-2">
            <span className="eyebrow">About the clinic</span>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-brand-950 heading-underline"
            >
              A small clinic with a big heart for Kasarani
            </h2>

            <div className="mt-6 space-y-4 text-ink-soft leading-relaxed">
              <p>
                Claycity Medical Centre is a privately-run Level-2 dispensary
                perched on First Street in the Clay City estate of Kasarani,
                Nairobi. We were founded to bring dependable, affordable
                outpatient care within walking distance of the families who
                call this corner of the city home.
              </p>
              <p>
                Led by our in-charge Susan W. Njagi and a small team of
                clinical officers, nurses and a Class-B licensed laboratory
                technologist, we focus on the fundamentals done well: maternal
                &amp; child health, immunisation, family planning, HIV testing
                and the everyday illnesses that interrupt life&rsquo;s rhythm.
              </p>
              <p>
                We keep our doors open six days a week, see walk-ins alongside
                booked visits, and treat every patient — from a newborn to a
                grandparent — with the same patience and dignity we would want
                for our own family.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-white border border-line p-4 text-center"
                >
                  <dt className="font-display text-xl font-semibold text-brand-700">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-ink-muted leading-snug">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Values row */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="eyebrow">Our values</span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-brand-950">
              What you&rsquo;ll feel from your first visit
            </h3>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <div key={v.title} className="card-soft p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <v.icon className="h-5 w-5" />
                </span>
                <h4 className="mt-4 font-display text-lg font-semibold text-brand-950">
                  {v.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
