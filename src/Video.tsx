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
const ORANGE = "#d4740a";

/* ── Scene 1: Intro (0–90, 3s) – Logo Animation ── */
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
        src={staticFile("rieprecht-logo.svg")}
        style={{
          width: 650,
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

/* ── Scene 3: Abfallarten Header (165–210, 1.5s) ── */
const CategoryHeader: React.FC<{
  title: string;
  count: number;
  bgColor: string;
  textColor: string;
  accentColor: string;
  icon: string;
}> = ({ title, count, bgColor, textColor, accentColor, icon }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 120,
          marginBottom: 30,
          transform: `scale(${s})`,
          opacity: s,
        }}
      >
        {icon}
      </div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          color: textColor,
          textAlign: "center",
          transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px)`,
          opacity: s,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 600,
          fontSize: 36,
          color: accentColor,
          marginTop: 16,
          opacity: interpolate(frame, [20, 35], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {count} Produkte
      </div>
    </AbsoluteFill>
  );
};

/* ── Animated Product List ── */
const ProductList: React.FC<{
  products: string[];
  bgColor: string;
  cardColor: string;
  textColor: string;
}> = ({ products, bgColor, cardColor, textColor }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 18,
          width: "100%",
        }}
      >
        {products.map((product, i) => {
          const delay = i * 6;
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={product}
              style={{
                backgroundColor: cardColor,
                borderRadius: 20,
                padding: "26px 34px",
                transform: `translateX(${interpolate(s, [0, 1], [500, 0])}px)`,
                opacity: s,
              }}
            >
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 34,
                  color: textColor,
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

/* ── Scene 6: USPs (3s) ── */
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

/* ── Scene 7: Outro (3s) – Logo von links oben, wächst ── */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const totalFrames = 90;

  // Logo starts small at top-left, grows and moves to center
  const progress = interpolate(frame, [0, totalFrames - 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const logoX = interpolate(progress, [0, 1], [-300, 0]);
  const logoY = interpolate(progress, [0, 1], [-600, 0]);
  const logoScale = interpolate(progress, [0, 1], [0.15, 1]);
  const logoOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA text appears after logo settles
  const ctaOpacity = interpolate(frame, [totalFrames - 30, totalFrames - 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const ctaPulse = interpolate(
    Math.sin((frame - totalFrames + 30) * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );

  const contactOpacity = interpolate(frame, [totalFrames - 20, totalFrames - 8], [0, 1], {
    extrapolateRight: "clamp",
  });

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
        src={staticFile("rieprecht-logo.svg")}
        style={{
          width: 550,
          opacity: logoOpacity,
          transform: `translate(${logoX}px, ${logoY}px) scale(${logoScale})`,
          marginBottom: 40,
        }}
      />

      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 64,
          color: CREAM,
          textAlign: "center",
          transform: `scale(${ctaPulse})`,
          marginBottom: 50,
          opacity: ctaOpacity,
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
          opacity: contactOpacity,
          lineHeight: 1.8,
        }}
      >
        <div>rieprecht-gmbh.de</div>
        <div>0162-5231470</div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Product Data ── */
const abfallProducts = [
  "Betonbruch kleiner 50cm",
  "Bauschutt sauber",
  "Bau- und Abbruchholz (A1-A3)",
  "Holz behandelt/imprägniert (A4)",
  "Bitumengemische & Dachpappe",
  "Mineralwolle (KMF) verpackt",
  "Asbesthaltige Baustoffe im BB",
  "Baustoffe auf Gipsbasis",
  "Baumischabfall",
  "Grünschnitt",
];

const schuettgutProducts = [
  "Glensanda 0–11 mm",
  "Spielsand 0–2 mm",
  "Fallschutzsand 0–2 mm",
  "Plattensand F1 0–4 mm",
  "Betonmineralgemisch 0–45 mm",
  "Estrichkies 0–8 mm",
  "Mutterboden 0–8 mm",
  "Natursplitt 2–5 mm",
  "Kiesel gewaschen 8–16 mm",
  "Schottertragschicht 8–32 mm",
];

/* ── Main Composition ──
   Scene 1: Intro           0–90    (3s)
   Scene 2: Tagline         90–165  (2.5s)
   Scene 3: Abfall Header   165–210 (1.5s)
   Scene 4: Abfall Produkte 210–390 (6s)
   Scene 5: Schüttgut Head  390–435 (1.5s)
   Scene 6: Schüttgut Prod  435–615 (6s)
   Scene 7: USPs            615–705 (3s)
   Scene 8: Outro           705–795 (3s)
   Total: 795 frames = 26.5s @ 30fps
── */
export const RieprechtVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK_GREEN }}>
      <Sequence from={0} durationInFrames={90}>
        <Intro />
      </Sequence>

      <Sequence from={90} durationInFrames={75}>
        <Tagline />
      </Sequence>

      <Sequence from={165} durationInFrames={45}>
        <CategoryHeader
          title="Abfallentsorgung"
          count={10}
          bgColor={DARK_GREEN}
          textColor={CREAM}
          accentColor={LIGHT_GREEN}
          icon="♻️"
        />
      </Sequence>

      <Sequence from={210} durationInFrames={180}>
        <ProductList
          products={abfallProducts}
          bgColor={DARK_GREEN}
          cardColor={LIGHT_GREEN}
          textColor={CREAM}
        />
      </Sequence>

      <Sequence from={390} durationInFrames={45}>
        <CategoryHeader
          title={"Schüttgüter &\nBaustoffe"}
          count={10}
          bgColor={CREAM}
          textColor={BROWN}
          accentColor={ORANGE}
          icon="📦"
        />
      </Sequence>

      <Sequence from={435} durationInFrames={180}>
        <ProductList
          products={schuettgutProducts}
          bgColor={CREAM}
          cardColor="#e8ddd0"
          textColor={BROWN}
        />
      </Sequence>

      <Sequence from={615} durationInFrames={90}>
        <USPs />
      </Sequence>

      <Sequence from={705} durationInFrames={90}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
