import ImmersiveHome from "./components/ImmersiveHome";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Claycity Medical Centre",
  description:
    "Licensed Level-2 outpatient clinic in Clay City, Kasarani, Nairobi. Maternal & child health, immunisation, in-house pharmacy, HIV testing, laboratory diagnostics and outpatient care.",
  url: "https://claycitymed.co.ke",
  telephone: "+254712265746",
  email: "nabiclaycitymedical@yahoo.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "First Street, Clay City Estate",
    addressLocality: "Kasarani, Nairobi",
    postalCode: "00618",
    addressCountry: "KE",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -1.21836,
    longitude: 36.90319,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  priceRange: "KES",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ImmersiveHome />
    </>
  );
}
