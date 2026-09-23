import { ImageResponse } from "next/og"
import { SITE_LOCATION, SITE_NAME, SITE_ROLE } from "@/data/site"

export const alt = "Alejandro Linares | Gobernanza digital, tecnología y liderazgo"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export const dynamic = "force-static"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#101112",
          color: "#F2F0E9",
          padding: "72px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#9A9A9A",
          }}
        >
          {SITE_LOCATION}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 88,
              lineHeight: 0.9,
              fontWeight: 700,
              letterSpacing: "-0.04em",
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 28,
              fontSize: 28,
              color: "#F2F0E9",
            }}
          >
            {SITE_ROLE}
          </div>
        </div>
      </div>
    ),
    size,
  )
}
