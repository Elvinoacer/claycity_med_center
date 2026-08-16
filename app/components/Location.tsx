import { MapPin, Navigation, Clock, Phone, Car, Footprints } from "lucide-react";
import OpenStatus from "./OpenStatus";

const HOURS = [
  { day: "Monday", time: "8:00am – 5:00pm", open: true },
  { day: "Tuesday", time: "8:00am – 5:00pm", open: true },
  { day: "Wednesday", time: "8:00am – 5:00pm", open: true },
  { day: "Thursday", time: "8:00am – 5:00pm", open: true },
  { day: "Friday", time: "8:00am – 5:00pm", open: true },
  { day: "Saturday", time: "8:00am – 12:00pm", open: true },
  { day: "Sunday", time: "Closed", open: false },
];

export default function Location() {
  // OpenStreetMap embed for the clinic's coordinates
  const lat = -1.21836;
  const lon = 36.90319;
  const bbox = `${lon - 0.008}%2C${lat - 0.006}%2C${lon + 0.008}%2C${
    lat + 0.006
  }`;
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lon}`;
  const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=17/${lat}/${lon}`;

  return (
    <section
      id="location"
      className="cv-auto relative py-20 md:py-28 bg-white border-y border-line"
      aria-labelledby="location-heading"
    >
      <div className="container-page">
        <div className="max-w-3xl reveal">
          <span className="eyebrow">Find us</span>
          <h2
            id="location-heading"
            className="mt-4 font-display text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.08] font-semibold tracking-[-0.01em] text-brand-950 heading-underline text-balance"
          >
            On First Street, in the heart of Clay City
          </h2>
          <p className="mt-6 text-lg text-ink-soft leading-relaxed">
            We&rsquo;re a short walk from Seasons stage, just off Seasons Road
            in the Clay City estate, Kasarani. Look for the Co-op Kasarani
            branch — we&rsquo;re nearby on First Street.
          </p>
        </div>

        <div className="mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-6 lg:gap-8 items-stretch">
          {/* Map */}
          <div className="reveal card-soft overflow-hidden p-2 hover:shadow-[var(--shadow-lift)] transition-shadow duration-300">
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden">
              <iframe
                title="Map showing Claycity Medical Centre on First Street, Clay City, Kasarani"
                src={mapSrc}
                className="absolute inset-0 h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-2 py-3">
              <p className="text-sm text-ink-soft inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-600" />
                First Street, Clay City Estate, Kasarani
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
              >
                <Navigation className="h-3.5 w-3.5" />
                Open in Maps
              </a>
            </div>
          </div>

          {/* Hours + directions */}
          <div className="flex flex-col gap-5">
            <div className="reveal card-soft p-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-brand-700" />
                  <h3 className="font-display text-lg font-semibold text-brand-950">
                    Opening hours
                  </h3>
                </div>
                <OpenStatus />
              </div>
              <ul className="mt-4 divide-y divide-line">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <span className="text-ink-soft">{h.day}</span>
                    <span
                      className={`font-medium ${
                        h.open ? "text-brand-900" : "text-accent-600"
                      }`}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 rounded-xl bg-brand-50 border border-brand-100 p-3 text-xs text-brand-800">
                <strong>Walk-ins welcome.</strong> To skip the wait, call ahead
                on{" "}
                <a
                  href="tel:+254721260994"
                  className="font-semibold underline underline-offset-2"
                >
                  0721 260994
                </a>
                .
              </div>
            </div>

            <div className="reveal card-soft p-6">
              <h3 className="font-display text-lg font-semibold text-brand-950">
                Getting here
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Car className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-ink-soft">
                    <strong className="text-brand-900">By car:</strong> From
                    Thika Road, take the Kasarani exit onto Seasons Road, then
                    turn onto First Street. Parking available roadside.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Footprints className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-ink-soft">
                    <strong className="text-brand-900">On foot:</strong> We&rsquo;re
                    a 3-minute walk from Seasons matatu stage. Landmark: Co-op
                    Kasarani branch.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Phone className="h-4 w-4" />
                  </span>
                  <p className="text-sm text-ink-soft">
                    <strong className="text-brand-900">Need directions?</strong>{" "}
                    Call us and we&rsquo;ll guide you in person.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
