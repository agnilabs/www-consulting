import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "agni labs - AI consulting, built around you";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FF4E02",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "96px",
              fontWeight: 700,
              color: "#000000",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            agni labs
          </h1>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 400,
              color: "#000000",
              opacity: 0.8,
              margin: 0,
              textAlign: "center",
            }}
          >
            AI consulting, built around you
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
