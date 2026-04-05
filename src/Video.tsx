import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

const DARK_GREEN = "#2d5016";
const LIGHT_GREEN = "#3a6b1a";
const CREAM = "#f5f0e8";
const BROWN = "#1a0a00";

/* ── Scene 1: Intro (0–90, 3s) ── */
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_GREEN,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 600,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

/* ── Scene 2: Tagline (90–165, 2.5s) ── */
const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1Y = spring({ frame, fps, config: { damping: 14 } });
  const line2Y = spring({
    frame: Math.max(0, frame - 10),
    fps,
    config: { damping: 14 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CREAM,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 72,
          color: DARK_GREEN,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        <div
          style={{
            transform: `translateY(${interpolate(line1Y, [0, 1], [80, 0])}px)`,
            opacity: line1Y,
          }}
        >
          Dein Entsorger.
        </div>
        <div
          style={{
            transform: `translateY(${interpolate(line2Y, [0, 1], [80, 0])}px)`,
            opacity: line2Y,
          }}
        >
          Dein Schüttgutlieferant.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 3: Produkte (165–300, 4.5s) ── */
const products = [
  "Container 7 m³",
  "Container 10 m³",
  "Bauschutt",
  "Sperrmüll",
  "Gartenabfälle",
];

const Produkte: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_GREEN,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 52,
          color: CREAM,
          textAlign: "center",
          marginBottom: 50,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Unsere Leistungen
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 24,
          width: "100%",
          padding: "0 60px",
        }}
      >
        {products.map((product, i) => {
          const delay = i * 8;
          const s = spring({
            frame: Math.max(0, frame - delay - 10),
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={product}
              style={{
                backgroundColor: LIGHT_GREEN,
                borderRadius: 24,
                padding: "32px 40px",
                transform: `translateX(${interpolate(s, [0, 1], [400, 0])}px)`,
                opacity: s,
              }}
            >
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 42,
                  color: CREAM,
                }}
              >
                {product}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 4: USPs (300–390, 3s) ── */
const usps = [
  "Im Osten Hamburgs",
  "Lieferung binnen 24h",
  "Zuverlässig & pünktlich",
  "Top Preis-Leistung",
];

const USPs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CREAM,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 52,
          color: DARK_GREEN,
          textAlign: "center",
          marginBottom: 60,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        Warum Rieprecht?
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 30,
          width: "100%",
          padding: "0 60px",
        }}
      >
        {usps.map((usp, i) => {
          const delay = i * 8;
          const s = spring({
            frame: Math.max(0, frame - delay - 8),
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={usp}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 24,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  backgroundColor: LIGHT_GREEN,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 46,
                  color: BROWN,
                }}
              >
                {usp}
              </span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 5: Outro (390–450, 2s) ── */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 12 } });
  const pulse = interpolate(
    Math.sin(frame * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_GREEN,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 400,
          opacity: s,
          marginBottom: 50,
        }}
      />

      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          color: CREAM,
          textAlign: "center",
          transform: `scale(${pulse})`,
          marginBottom: 60,
          opacity: s,
        }}
      >
        Jetzt bestellen!
      </div>

      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 600,
          fontSize: 38,
          color: CREAM,
          textAlign: "center",
          opacity: interpolate(frame, [15, 25], [0, 1], {
            extrapolateRight: "clamp",
          }),
          lineHeight: 1.8,
        }}
      >
        <div>rieprecht-gmbh.de</div>
        <div>0162-5231470</div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ── */
export const RieprechtVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK_GREEN }}>
      {/* Scene 1: Intro – 0 to 90 (3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>

      {/* Scene 2: Tagline – 90 to 165 (2.5s) */}
      <Sequence from={90} durationInFrames={75}>
        <Tagline />
      </Sequence>

      {/* Scene 3: Produkte – 165 to 300 (4.5s) */}
      <Sequence from={165} durationInFrames={135}>
        <Produkte />
      </Sequence>

      {/* Scene 4: USPs – 300 to 390 (3s) */}
      <Sequence from={300} durationInFrames={90}>
        <USPs />
      </Sequence>

      {/* Scene 5: Outro – 390 to 450 (2s) */}
      <Sequence from={390} durationInFrames={60}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
