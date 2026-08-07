import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "64px",
          background:
            "linear-gradient(145deg, #0b1c18 0%, #0f766e 48%, #b45309 120%)",
          color: "#f7faf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#5eead4",
              boxShadow: "0 0 0 8px rgba(94, 234, 212, 0.25)",
            }}
          />
          SIGNAL URL
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            부비주소 신호 장부
          </div>
          <div style={{ fontSize: 28, opacity: 0.88, maxWidth: 820, lineHeight: 1.4 }}>
            다중 주장 · 호스트 · 관찰일을 대조하고, 단일 공식 도메인을 단정하지 않습니다.
          </div>
        </div>
        <div style={{ fontSize: 22, opacity: 0.75 }}>signalurl.com</div>
      </div>
    ),
    size,
  );
}
