import Image from "next/image";
import { ShieldCheck, Award, Users, HeartHandshake } from "lucide-react";
import Card3DTilt from "./interactive/Card3DTilt";
import nurseImg from "@/public/images/nurse-portrait.jpg";
import maternityImg from "@/public/images/maternity-care.jpg";

const STATS = [
  { value: "Level-2", label: "Licensed clinic (KMPDC)" },
  { value: "Class B", label: "On-site laboratory (KMLTTB)" },
  { value: "Mon–Sat", label: "Open six days a week" },
  { value: "Walk-in", label: "No appointment needed" },
];

const VALUES = [
  {
    icon: HeartHandshake,
    title: "Caring, Not Clinical",
    desc: "We take time to listen and explain. You are a neighbour, not a queue number — every visit is treated with warmth and dignity.",
  },
  {
    icon: ShieldCheck,
    title: "Licensed & Audited",
    desc: "Registered with the Kenya Medical Practitioners & Dentists Council as a Level-2 clinic, with an active Class-B laboratory licence.",
  },
  {
    icon: Award,
    title: "Affordable & Honest",
    desc: "Clear out-of-pocket pricing, no surprise bills. Cash and M-Pesa accepted, with fair community pricing.",
  },
  {
    icon: Users,
    title: "Family-Centred Care",
    desc: "From a baby's first vaccine to a grandparent's blood pressure check, we keep the entire family healthy across generations.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-16 md:py-24 bg-white border-y border-line overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="container-page">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1" data-reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card3DTilt intensity={8} className="rounded-2xl">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-brand-900/15 ring-2 ring-brand-100 bg-brand-950">
                    <Image
                      src={nurseImg}
                      alt="Dedicated healthcare nurse at Claycity Medical Centre"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                      Qualified Clinical Staff
                    </div>
                  </div>
                </Card3DTilt>

                <div className="card-soft p-5 bg-brand-50 border-brand-100">
                  <p className="font-display text-3xl font-semibold text-brand-700">
                    100%
                  </p>
                  <p className="text-xs font-medium text-ink-soft mt-1">
                    Confidential &amp; compassionate care on every visit.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="card-soft p-5 bg-gradient-to-br from-brand-600 to-brand-900 text-white border-brand-700 shadow-lg">
                  <p className="font-display text-2xl font-semibold">Since 2018</p>
                  <p className="text-xs text-brand-100 mt-1">
                    Quietly serving the Clay City &amp; Seasons community.
                  </p>
                </div>

                <Card3DTilt intensity={8} className="rounded-2xl">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-brand-900/15 ring-2 ring-brand-100 bg-brand-950">
                    <Image
                      src={maternityImg}
                      alt="Maternal and child health visit at Claycity Medical Centre"
                      fill
                      placeholder="blur"
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold">
                      Maternal &amp; Child Health
                    </div>
                  </div>
                </Card3DTilt>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2" data-reveal>
            <span className="eyebrow">About Our Clinic</span>
            <h2
              id="about-heading"
              className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
            >
              A neighborhood clinic with a big heart for Kasarani
            </h2>

            <div className="mt-5 space-y-3.5 text-ink-soft leading-relaxed text-base">
              <p>
                Claycity Medical Centre is a licensed Level-2 outpatient clinic on First Street in the Clay City estate of Kasarani, Nairobi. We were founded to bring dependable, affordable medical care within walking distance of local families.
              </p>
              <p>
                Led by in-charge Susan W. Njagi and a team of registered clinical officers, nurses and laboratory technologists, we focus on clinical excellence across maternal &amp; child health, immunisations, diagnostic lab tests, pharmacy, and family consultations.
              </p>
              <p>
                We keep our doors open six days a week, welcome walk-ins alongside booked visits, and treat every patient with the same attentiveness we would expect for our own relatives.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl bg-canvas border border-line p-4 text-center hover:border-brand-300 hover:shadow-md transition-all duration-300"
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

        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto" data-reveal>
            <span className="eyebrow">Core Standards</span>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold text-brand-950 text-balance">
              What you will experience on every visit
            </h3>
          </div>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 [perspective:1000px]">
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}
                className="svc-3d card-soft p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 border border-brand-100">
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
