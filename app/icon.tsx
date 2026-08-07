import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b1c18",
          borderRadius: 14,
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 999,
            background: "#14b8a6",
            boxShadow: "0 0 0 8px rgba(20, 184, 166, 0.28)",
          }}
        />
      </div>
    ),
    size,
  );
}
