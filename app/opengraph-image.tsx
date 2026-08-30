import { headers } from "next/headers";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Claycity Medical Centre — Trusted outpatient care in Kasarani";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OpenGraphImage() {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const origin = host ? `${protocol}://${host}` : "https://claycitymed.co.ke";
  const bannerUrl = `${origin}/images/claycity_banner.webp`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#07191d",
          color: "white",
        }}
      >
        <img
          src={bannerUrl}
          alt=""
          width="1200"
          height="630"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(7,25,29,0.82) 0%, rgba(7,25,29,0.42) 55%, rgba(7,25,29,0.28) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#a8dfd6",
              marginBottom: 20,
            }}
          >
            Claycity Medical Centre
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 900,
              fontSize: 64,
              lineHeight: 1.04,
              fontWeight: 700,
            }}
          >
            Trusted outpatient care, close to home.
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Kasarani · Nairobi · First Street, Clay City
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
