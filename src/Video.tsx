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

/* ── Scene 1: Intro (0–45, 1.5s) – Logo Animation ── */
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 10, mass: 0.8 } });
  const logoOpacity = interpolate(frame, [0, 10], [0, 1], {
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

/* ── Scene 7: USPs (4s) ── */
const usps = [
  "Persönlicher Ansprechpartner",
  "Im Osten Hamburgs",
  "Lieferung binnen 24h",
  "Zuverlässig & pünktlich",
  "Faires Preis-Leistungs-Verhältnis",
  "Über 15 Jahre Erfahrung",
  "Flexible Containergrößen",
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
          gap: 22,
          width: "100%",
          padding: "0 60px",
        }}
      >
        {usps.map((usp, i) => {
          const delay = i * 7;
          const s = spring({
            frame: Math.max(0, frame - delay - 6),
            fps,
            config: { damping: 12 },
          });

          return (
            <div
              key={usp}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `scale(${s})`,
                opacity: s,
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: LIGHT_GREEN,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 40,
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

/* ── Scene 8: Outro (5s / 150 Frames) – Logo + CTA + Kontakt ── */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Logo flies in from top-left (0–50)
  const logoProgress = interpolate(frame, [0, 50], [0, 1], {
    extrapolateRight: "clamp",
  });
  const logoX = interpolate(logoProgress, [0, 1], [-300, 0]);
  const logoY = interpolate(logoProgress, [0, 1], [-600, 0]);
  const logoScale = interpolate(logoProgress, [0, 1], [0.15, 1]);
  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: CTA tagline (30–60)
  const ctaOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 3: Subline "Worauf wartest du noch?" (50–70)
  const sublineOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 4: Phone number big (65–85)
  const phoneScale = spring({
    frame: Math.max(0, frame - 65),
    fps: 30,
    config: { damping: 10, mass: 0.8 },
  });
  const phoneOpacity = interpolate(frame, [65, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 5: Shop URL + Website (85–105)
  const urlOpacity = interpolate(frame, [85, 100], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Pulsing phone number
  const phonePulse = frame > 80
    ? interpolate(Math.sin((frame - 80) * 0.2), [-1, 1], [0.97, 1.03])
    : 1;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_GREEN,
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
      }}
    >
      {/* Logo */}
      <Img
        src={staticFile("rieprecht-logo.svg")}
        style={{
          width: 450,
          opacity: logoOpacity,
          transform: `translate(${logoX}px, ${logoY}px) scale(${logoScale})`,
          marginBottom: 30,
        }}
      />

      {/* CTA Headline */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 58,
          color: CREAM,
          textAlign: "center",
          marginBottom: 10,
          opacity: ctaOpacity,
        }}
      >
        Dein Container ist nur
      </div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 58,
          color: "#a8d54b",
          textAlign: "center",
          marginBottom: 20,
          opacity: ctaOpacity,
        }}
      >
        einen Anruf entfernt!
      </div>

      {/* Subline */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 600,
          fontSize: 34,
          color: CREAM,
          textAlign: "center",
          marginBottom: 40,
          opacity: sublineOpacity,
          fontStyle: "italic",
        }}
      >
        Worauf wartest du noch?
      </div>

      {/* Phone number – BIG */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 900,
          fontSize: 72,
          color: CREAM,
          textAlign: "center",
          backgroundColor: LIGHT_GREEN,
          borderRadius: 24,
          padding: "24px 50px",
          marginBottom: 30,
          opacity: phoneOpacity,
          transform: `scale(${phoneScale * phonePulse})`,
        }}
      >
        0162-5231470
      </div>

      {/* URLs */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 600,
          fontSize: 36,
          color: CREAM,
          textAlign: "center",
          opacity: urlOpacity,
          lineHeight: 2,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 16,
            padding: "12px 36px",
            marginBottom: 14,
          }}
        >
          shop.rieprecht-gmbh.de
        </div>
        <div style={{ fontSize: 30, opacity: 0.8 }}>
          rieprecht-gmbh.de
        </div>
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
   Scene 1: Intro           0–45    (1.5s)
   Scene 2: Tagline         45–120  (2.5s)
   Scene 3: Abfall Header   120–165 (1.5s)
   Scene 4: Abfall Produkte 165–345 (6s)
   Scene 5: Schüttgut Head  345–390 (1.5s)
   Scene 6: Schüttgut Prod  390–570 (6s)
   Scene 7: USPs            570–690 (4s)
   Scene 8: Outro           690–840 (5s)
   Total: 840 Frames = 28s @ 30fps
── */
export const RieprechtVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK_GREEN }}>
      <Sequence from={0} durationInFrames={45}>
        <Intro />
      </Sequence>

      <Sequence from={45} durationInFrames={75}>
        <Tagline />
      </Sequence>

      <Sequence from={120} durationInFrames={45}>
        <CategoryHeader
          title="Abfallentsorgung"
          count={10}
          bgColor={DARK_GREEN}
          textColor={CREAM}
          accentColor={LIGHT_GREEN}
          icon="♻️"
        />
      </Sequence>

      <Sequence from={165} durationInFrames={180}>
        <ProductList
          products={abfallProducts}
          bgColor={DARK_GREEN}
          cardColor={LIGHT_GREEN}
          textColor={CREAM}
        />
      </Sequence>

      <Sequence from={345} durationInFrames={45}>
        <CategoryHeader
          title={"Schüttgüter &\nBaustoffe"}
          count={10}
          bgColor={CREAM}
          textColor={BROWN}
          accentColor={ORANGE}
          icon="📦"
        />
      </Sequence>

      <Sequence from={390} durationInFrames={180}>
        <ProductList
          products={schuettgutProducts}
          bgColor={CREAM}
          cardColor="#e8ddd0"
          textColor={BROWN}
        />
      </Sequence>

      <Sequence from={570} durationInFrames={120}>
        <USPs />
      </Sequence>

      <Sequence from={690} durationInFrames={150}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
