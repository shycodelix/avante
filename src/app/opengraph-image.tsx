import { ImageResponse } from "next/og";

export const alt = "Avante Esports — organisation and creative studio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0c0d",
          color: "#f1ede3",
          padding: "68px 76px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 24,
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#8b8f92",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 18, height: 18, background: "#2f4bff" }} />
            <div style={{ display: "flex" }}>Esports organisation &amp; creative studio</div>
          </div>
          <div style={{ display: "flex" }}>Berlin · since 2019</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 176,
              lineHeight: 1,
              letterSpacing: -4,
              fontWeight: 700,
            }}
          >
            AVANTE
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#f1ede3",
              opacity: 0.74,
              maxWidth: 1040,
              whiteSpace: "nowrap",
            }}
          >
            We field the teams — and build the rooms they are watched in.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #2a2f31",
            paddingTop: 26,
            fontSize: 22,
            color: "#8b8f92",
          }}
        >
          <div style={{ display: "flex" }}>
            League of Legends · VALORANT · CS2 · Rocket League
          </div>
          <div style={{ display: "flex", color: "#2f4bff", letterSpacing: 1 }}>avante.gg</div>
        </div>
      </div>
    ),
    size,
  );
}
