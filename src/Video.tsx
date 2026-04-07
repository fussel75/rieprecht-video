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
const ACCENT_GREEN = "#a8d54b";

/* ── Scene 1: Dramatic Logo Intro (0–60, 2.0s) ── */
const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo slams in from large scale
  const logoScale = spring({
    frame,
    fps,
    config: { damping: 8, mass: 1.2 },
    from: 3,
    to: 1,
  });
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Radial light burst behind logo
  const burstScale = interpolate(frame, [10, 50], [0.1, 2.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const burstOpacity = interpolate(frame, [10, 50], [0.6, 0], {
    extrapolateLeft: "clamp",
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
      {/* Light burst */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          transform: `scale(${burstScale})`,
          opacity: burstOpacity,
        }}
      />
      <Img
        src={staticFile("rieprecht-logo.svg")}
        style={{
          width: 650,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
          filter:
            "drop-shadow(0 0 15px rgba(255,255,255,0.8)) drop-shadow(0 0 30px rgba(255,255,255,0.4))",
        }}
      />
    </AbsoluteFill>
  );
};

/* ── Scene 2: Tagline Slam (60–135, 2.5s) ── */
const Tagline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const line1 = spring({ frame, fps, config: { damping: 14 } });
  const line2 = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 14 },
  });

  // Green underline wipe
  const underlineScale = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
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
            transform: `translateY(${interpolate(line1, [0, 1], [120, 0])}px)`,
            opacity: line1,
          }}
        >
          Dein Entsorger.
          <div
            style={{
              height: 6,
              backgroundColor: ACCENT_GREEN,
              transform: `scaleX(${underlineScale})`,
              transformOrigin: "left",
              marginTop: 8,
              borderRadius: 3,
            }}
          />
        </div>
        <div
          style={{
            transform: `translateY(${interpolate(line2, [0, 1], [120, 0])}px)`,
            opacity: line2,
            marginTop: 20,
          }}
        >
          Dein Schüttgutlieferant.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 3: Truck Drives (135–285, 5.0s) ── */
const TruckDrive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Photo pan: truck drives from right to left
  const panX = interpolate(frame, [0, 120], [400, -400], {
    extrapolateRight: "clamp",
  });

  // Ken Burns zoom
  const zoom = interpolate(frame, [0, 120], [1.0, 1.15], {
    extrapolateRight: "clamp",
  });

  // Fade in
  const photoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Text slide in
  const textX = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 12 },
  });
  const subTextOpacity = interpolate(frame, [50, 65], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Exit: zoom in and fade
  const exitZoom = interpolate(frame, [120, 150], [1, 1.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [120, 145], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: DARK_GREEN, opacity: exitOpacity }}
    >
      {/* Photo container */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: photoOpacity,
        }}
      >
        <Img
          src={staticFile("truck-loading.jpg")}
          style={{
            position: "absolute",
            height: "100%",
            width: "auto",
            minWidth: "200%",
            left: "50%",
            top: 0,
            transform: `translateX(calc(-50% + ${panX}px)) scale(${zoom * exitZoom})`,
            objectFit: "cover",
          }}
        />

        {/* Gradient overlays for text legibility */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.7) 100%)",
            zIndex: 1,
          }}
        />
      </div>

      {/* Text overlays */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          zIndex: 2,
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 900,
            fontSize: 68,
            color: "white",
            textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            transform: `translateX(${interpolate(textX, [0, 1], [600, 0])}px)`,
            opacity: textX,
          }}
        >
          Wir kommen
          <br />
          zu dir!
        </div>
        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 600,
            fontSize: 36,
            color: ACCENT_GREEN,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            marginTop: 20,
            opacity: subTextOpacity,
          }}
        >
          Containerlieferung & Abholung
        </div>
      </div>

      {/* Bottom badge */}
      <div
        style={{
          position: "absolute",
          bottom: 140,
          left: 0,
          right: 0,
          zIndex: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(45, 80, 22, 0.9)",
            borderRadius: 20,
            padding: "18px 40px",
            opacity: subTextOpacity,
          }}
        >
          <span
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 700,
              fontSize: 32,
              color: "white",
            }}
          >
            Rieprecht Entsorgung - Transport
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 4: Container Reveal + Loading Animation (285–435, 5.0s) ── */
const ContainerReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Clip-path iris open
  const revealProgress = spring({
    frame,
    fps,
    config: { damping: 12, mass: 1.0 },
  });
  const clipInset = interpolate(revealProgress, [0, 1], [50, 0]);

  // Ken Burns
  const zoom = interpolate(frame, [0, 150], [1.0, 1.12], {
    extrapolateRight: "clamp",
  });
  const panY = interpolate(frame, [0, 150], [30, -30], {
    extrapolateRight: "clamp",
  });

  // Text overlays
  const badgeY = spring({
    frame: Math.max(0, frame - 25),
    fps,
    config: { damping: 12 },
  });
  const sizeOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flexOpacity = interpolate(frame, [55, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Particles (simulated loading/unloading)
  const particles = [
    { delay: 75, x: -120, y: -400, rot: -45, color: "#3a6b1a" },
    { delay: 80, x: 80, y: -350, rot: 30, color: "#4a8b2a" },
    { delay: 85, x: -40, y: -450, rot: -20, color: "#2d5016" },
    { delay: 90, x: 150, y: -380, rot: 55, color: "#5a9b3a" },
    { delay: 95, x: -180, y: -320, rot: -60, color: "#3a6b1a" },
  ];

  // Exit
  const exitScale = interpolate(frame, [130, 150], [1, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(frame, [130, 148], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: DARK_GREEN, opacity: exitOpacity }}
    >
      {/* Photo with clip-path reveal */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          clipPath: `inset(${clipInset}%)`,
        }}
      >
        <Img
          src={staticFile("container-open.jpg")}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${zoom * exitScale}) translateY(${panY}px)`,
          }}
        />

        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.6) 100%)",
          }}
        />
      </div>

      {/* Particles */}
      {particles.map((p, i) => {
        const pFrame = Math.max(0, frame - p.delay);
        const pProgress = interpolate(pFrame, [0, 30], [0, 1], {
          extrapolateRight: "clamp",
        });
        const pY = interpolate(pProgress, [0, 1], [0, p.y]);
        const pX = interpolate(pProgress, [0, 1], [0, p.x]);
        const pRot = interpolate(pProgress, [0, 1], [0, p.rot]);
        const pOpacity = interpolate(pFrame, [0, 5, 20, 30], [0, 1, 1, 0], {
          extrapolateRight: "clamp",
        });

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "55%",
              width: 40,
              height: 40,
              borderRadius: 8,
              backgroundColor: p.color,
              transform: `translate(${pX}px, ${pY}px) rotate(${pRot}deg)`,
              opacity: pOpacity,
              zIndex: 3,
            }}
          />
        );
      })}

      {/* Text overlays */}
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 0,
          right: 0,
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Badge */}
        <div
          style={{
            backgroundColor: "rgba(45, 80, 22, 0.9)",
            borderRadius: 20,
            padding: "16px 40px",
            transform: `translateY(${interpolate(badgeY, [0, 1], [-100, 0])}px)`,
            opacity: badgeY,
          }}
        >
          <span
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 800,
              fontSize: 48,
              color: "white",
            }}
          >
            Deine Mulde
          </span>
        </div>

        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
            fontSize: 38,
            color: "white",
            textShadow: "0 3px 15px rgba(0,0,0,0.8)",
            opacity: sizeOpacity,
          }}
        >
          Von 5m³ bis 10m³
        </div>

        <div
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 600,
            fontSize: 34,
            color: ACCENT_GREEN,
            textShadow: "0 2px 10px rgba(0,0,0,0.8)",
            opacity: flexOpacity,
          }}
        >
          Flexibel & schnell
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 5: Split Screen (435–555, 4.0s) ── */
const SplitScreen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Top panel slides from left
  const topSlide = spring({ frame, fps, config: { damping: 14 } });
  const topX = interpolate(topSlide, [0, 1], [-1080, 0]);

  // Bottom panel slides from right
  const bottomSlide = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 14 },
  });
  const bottomX = interpolate(bottomSlide, [0, 1], [1080, 0]);

  // Text fade in
  const topTextOpacity = interpolate(frame, [22, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bottomTextOpacity = interpolate(frame, [32, 45], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Orange accent lines
  const accentScale = interpolate(frame, [40, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Exit: slide out
  const exitProgress = interpolate(frame, [95, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const topExit = interpolate(exitProgress, [0, 1], [0, -1080]);
  const bottomExit = interpolate(exitProgress, [0, 1], [0, 1080]);

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_GREEN }}>
      {/* Top panel - Truck */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          overflow: "hidden",
          transform: `translateX(${topX + topExit}px)`,
        }}
      >
        <Img
          src={staticFile("truck-loading.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(45, 80, 22, 0.5)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            right: 60,
            opacity: topTextOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 900,
              fontSize: 56,
              color: "white",
              textShadow: "0 3px 15px rgba(0,0,0,0.5)",
            }}
          >
            Transport & Lieferung
          </div>
          <div
            style={{
              height: 5,
              backgroundColor: ORANGE,
              transform: `scaleX(${accentScale})`,
              transformOrigin: "left",
              marginTop: 12,
              borderRadius: 3,
              width: "70%",
            }}
          />
        </div>
      </div>

      {/* Divider line */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: ACCENT_GREEN,
          zIndex: 2,
          transform: `translateY(-3px)`,
        }}
      />

      {/* Bottom panel - Container */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          overflow: "hidden",
          transform: `translateX(${bottomX + bottomExit}px)`,
        }}
      >
        <Img
          src={staticFile("container-open.jpg")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.45)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 60,
            right: 60,
            opacity: bottomTextOpacity,
          }}
        >
          <div
            style={{
              fontFamily: "Arial, Helvetica, sans-serif",
              fontWeight: 900,
              fontSize: 56,
              color: "white",
              textShadow: "0 3px 15px rgba(0,0,0,0.5)",
            }}
          >
            Container 5–10m³
          </div>
          <div
            style={{
              height: 5,
              backgroundColor: ORANGE,
              transform: `scaleX(${accentScale})`,
              transformOrigin: "left",
              marginTop: 12,
              borderRadius: 3,
              width: "60%",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Scene 6: USPs (555–705, 5.0s) ── */
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

  const headerScale = spring({ frame, fps, config: { damping: 10 } });

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
          fontSize: 56,
          color: DARK_GREEN,
          textAlign: "center",
          marginBottom: 60,
          transform: `scale(${headerScale})`,
          opacity: headerScale,
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
          padding: "0 50px",
        }}
      >
        {usps.map((usp, i) => {
          const delay = i * 7 + 6;
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12 },
          });

          const dotScale = spring({
            frame: Math.max(0, frame - delay - 2),
            fps,
            config: { damping: 8, mass: 0.5 },
          });

          return (
            <div
              key={usp}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                transform: `translateX(${interpolate(s, [0, 1], [-400, 0])}px)`,
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
                  transform: `scale(${dotScale})`,
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

/* ── Scene 7: Abfall Flash (705–795, 3.0s) ── */
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

const AbfallFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_GREEN,
        padding: "60px 40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
        }}
      >
        <span style={{ fontSize: 60 }}>♻️</span>
        <span
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            fontSize: 48,
            color: CREAM,
          }}
        >
          Abfallentsorgung
        </span>
      </div>

      {/* Product cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {abfallProducts.map((product, i) => {
          const delay = 10 + i * 5;
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12 },
          });

          // Fade out at end
          const fadeOut = interpolate(frame, [70, 85], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={product}
              style={{
                backgroundColor: LIGHT_GREEN,
                borderRadius: 16,
                padding: "18px 28px",
                transform: `translateX(${interpolate(s, [0, 1], [600, 0])}px)`,
                opacity: s * fadeOut,
              }}
            >
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 30,
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

/* ── Scene 8: Schüttgut Flash (795–885, 3.0s) ── */
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

const SchuettgutFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: CREAM,
        padding: "60px 40px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 40,
          transform: `scale(${headerSpring})`,
          opacity: headerSpring,
        }}
      >
        <span style={{ fontSize: 60 }}>📦</span>
        <span
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 800,
            fontSize: 44,
            color: BROWN,
          }}
        >
          Schüttgüter & Baustoffe
        </span>
      </div>

      {/* Product cards - slide from LEFT for variety */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {schuettgutProducts.map((product, i) => {
          const delay = 10 + i * 5;
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps,
            config: { damping: 12 },
          });

          const fadeOut = interpolate(frame, [70, 85], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={product}
              style={{
                backgroundColor: "#e8ddd0",
                borderRadius: 16,
                padding: "18px 28px",
                transform: `translateX(${interpolate(s, [0, 1], [-600, 0])}px)`,
                opacity: s * fadeOut,
              }}
            >
              <span
                style={{
                  fontFamily: "Arial, Helvetica, sans-serif",
                  fontWeight: 700,
                  fontSize: 30,
                  color: BROWN,
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

/* ── Scene 9: CTA Outro (885–990, 3.5s) ── */
const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo bounce in from top
  const logoSpring = spring({ frame, fps, config: { damping: 10, mass: 0.8 } });
  const logoY = interpolate(logoSpring, [0, 1], [-400, 0]);
  const logoOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  // CTA text
  const ctaOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subline
  const sublineOpacity = interpolate(frame, [30, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phone number
  const phoneSpring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 8, mass: 1.0 },
  });
  const phoneOpacity = interpolate(frame, [38, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // URLs
  const urlOpacity = interpolate(frame, [55, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing phone
  const phonePulse =
    frame > 55
      ? interpolate(Math.sin((frame - 55) * 0.2), [-1, 1], [0.97, 1.03])
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
          width: 420,
          opacity: logoOpacity,
          transform: `translateY(${logoY}px) scale(${logoSpring})`,
          marginBottom: 30,
          filter:
            "drop-shadow(0 0 15px rgba(255,255,255,0.8)) drop-shadow(0 0 30px rgba(255,255,255,0.4))",
        }}
      />

      {/* CTA */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 56,
          color: CREAM,
          textAlign: "center",
          marginBottom: 8,
          opacity: ctaOpacity,
        }}
      >
        Dein Container ist nur
      </div>
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 800,
          fontSize: 56,
          color: ACCENT_GREEN,
          textAlign: "center",
          marginBottom: 18,
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
          fontSize: 32,
          color: CREAM,
          textAlign: "center",
          marginBottom: 35,
          opacity: sublineOpacity,
          fontStyle: "italic",
        }}
      >
        Worauf wartest du noch?
      </div>

      {/* Phone */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 900,
          fontSize: 68,
          color: CREAM,
          textAlign: "center",
          backgroundColor: LIGHT_GREEN,
          borderRadius: 24,
          padding: "22px 46px",
          marginBottom: 28,
          opacity: phoneOpacity,
          transform: `scale(${phoneSpring * phonePulse})`,
        }}
      >
        0162-5231470
      </div>

      {/* URLs */}
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontWeight: 600,
          fontSize: 34,
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
            padding: "10px 34px",
            marginBottom: 12,
          }}
        >
          shop24.rieprecht-gmbh.de
        </div>
        <div style={{ fontSize: 28, opacity: 0.8 }}>rieprecht-gmbh.de</div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Main Composition ──
   Scene 1: Logo Intro      0–60     (2.0s)
   Scene 2: Tagline          60–135   (2.5s)
   Scene 3: Truck Drive      135–285  (5.0s)
   Scene 4: Container Reveal 285–435  (5.0s)
   Scene 5: Split Screen     435–555  (4.0s)
   Scene 6: USPs             555–705  (5.0s)
   Scene 7: Abfall Flash     705–795  (3.0s)
   Scene 8: Schüttgut Flash  795–885  (3.0s)
   Scene 9: CTA Outro        885–990  (3.5s)
   Total: 990 Frames = 33s @ 30fps
── */
export const RieprechtVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: DARK_GREEN }}>
      <Sequence from={0} durationInFrames={60}>
        <Intro />
      </Sequence>

      <Sequence from={60} durationInFrames={75}>
        <Tagline />
      </Sequence>

      <Sequence from={135} durationInFrames={150}>
        <TruckDrive />
      </Sequence>

      <Sequence from={285} durationInFrames={150}>
        <ContainerReveal />
      </Sequence>

      <Sequence from={435} durationInFrames={120}>
        <SplitScreen />
      </Sequence>

      <Sequence from={555} durationInFrames={150}>
        <USPs />
      </Sequence>

      <Sequence from={705} durationInFrames={90}>
        <AbfallFlash />
      </Sequence>

      <Sequence from={795} durationInFrames={90}>
        <SchuettgutFlash />
      </Sequence>

      <Sequence from={885} durationInFrames={105}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
