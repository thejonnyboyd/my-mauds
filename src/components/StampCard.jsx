import { theme } from "../theme";

const STAMPS_PER_CARD = 10;
const CONFETTI_COLORS = [theme.coral, theme.teal, theme.amber, theme.brown];
const CONFETTI_COUNT = 16;

const CONFETTI_KEYFRAMES = `
@keyframes mauds-confetti {
  0%   { transform: translateY(0)    scale(1);   opacity: 1; }
  100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
}
`;

function ConfettiBurst() {
  return (
    <>
      <style>{CONFETTI_KEYFRAMES}</style>
      <div style={{ position: "relative", height: 64, marginBottom: 4 }}>
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          width: 0, height: 0,
        }}>
          {Array.from({ length: CONFETTI_COUNT }, (_, i) => {
            const angle = (i / CONFETTI_COUNT) * 360;
            const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
            const size = i % 3 === 0 ? 10 : 7;
            return (
              <div key={i} style={{
                position: "absolute",
                top: 0, left: 0,
                transform: `rotate(${angle}deg)`,
                transformOrigin: "0 0",
              }}>
                <div style={{
                  width: size, height: size,
                  marginLeft: -(size / 2),
                  borderRadius: i % 2 === 0 ? "50%" : 2,
                  background: color,
                  animation: `mauds-confetti 0.9s ease-out ${i * 35}ms both`,
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function StampCard({ visited, isOpen, onClose }) {
  const totalVisited = visited.size;
  const cardsCompleted = Math.floor(totalVisited / STAMPS_PER_CARD);
  const stampsOnCurrentCard = totalVisited % STAMPS_PER_CARD;
  const isJustCompleted = stampsOnCurrentCard === 0 && totalVisited > 0;
  const displayStamps = isJustCompleted ? STAMPS_PER_CARD : stampsOnCurrentCard;
  const remaining = STAMPS_PER_CARD - displayStamps;

  return (
    <>
      {/* Backdrop — blurs the map behind it */}
      <div
        onClick={onClose}
        style={{
          position: "absolute", inset: 0, zIndex: 1100,
          background: "rgba(0,0,0,0.25)",
          backdropFilter: isOpen ? "blur(6px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(6px)" : "none",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease, backdrop-filter 0.3s ease",
        }}
      />

      {/* Centred card */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: isOpen ? "translate(-50%, -50%)" : "translate(-50%, calc(-50% + 16px))",
        zIndex: 1200,
        width: "calc(100% - 40px)", maxWidth: 380,
        background: "white", borderRadius: 20,
        boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
        transition: "transform 0.3s ease, opacity 0.3s ease",
        display: "flex", flexDirection: "column",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 20px 12px",
        }}>
          <span style={{ fontWeight: 700, fontSize: 16 }}>My Stamp Card</span>
          <button onClick={onClose} style={{
            background: "#f3f4f6", border: "none", borderRadius: 999,
            width: 32, height: 32, cursor: "pointer", fontSize: 16,
          }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding: "0 20px 32px" }}>

          {/* Cards completed badge */}
          {cardsCompleted > 0 && (
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: theme.amber + "33",
              border: `1.5px solid ${theme.amber}`,
              borderRadius: 999, padding: "4px 12px", marginBottom: 16,
              fontSize: 12, fontWeight: 700, color: theme.brown,
            }}>
              {cardsCompleted} card{cardsCompleted > 1 ? "s" : ""} completed
            </div>
          )}

          {/* Confetti + congrats — only mounted when panel is open so animation replays */}
          {isOpen && isJustCompleted && (
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <ConfettiBurst />
              <p style={{ fontWeight: 800, fontSize: 18, color: theme.coral, marginBottom: 4 }}>
                Card complete!
              </p>
              <p style={{ fontSize: 13, color: theme.brown }}>
                You've visited {totalVisited} Maud's shops!
              </p>
            </div>
          )}

          {/* Stamp grid — 5 columns × 2 rows */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 10,
            background: theme.cream,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}>
            {Array.from({ length: STAMPS_PER_CARD }, (_, i) => {
              const filled = i < displayStamps;
              return (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  aspectRatio: "1",
                  borderRadius: "50%",
                  background: filled ? "white" : "transparent",
                  border: filled ? `2px solid ${theme.coral}33` : `2px dashed ${theme.brown}55`,
                  fontSize: 22,
                  boxShadow: filled ? "0 2px 6px rgba(0,0,0,0.07)" : "none",
                  transition: "all 0.2s ease",
                }}>
                  {filled ? "🍦" : ""}
                </div>
              );
            })}
          </div>

          {/* Stats row */}
          <div style={{
            display: "flex", justifyContent: "space-around",
            background: "#f9fafb", borderRadius: 12, padding: "12px 0",
          }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: theme.coral, lineHeight: 1 }}>
                {totalVisited}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 4 }}>
                total visits
              </p>
            </div>
            <div style={{ width: 1, background: "#e5e7eb" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: theme.teal, lineHeight: 1 }}>
                {isJustCompleted ? "10 / 10" : `${displayStamps} / 10`}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 4 }}>
                this card
              </p>
            </div>
            <div style={{ width: 1, background: "#e5e7eb" }} />
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 24, fontWeight: 800, color: theme.amber, lineHeight: 1 }}>
                {isJustCompleted ? "0" : remaining}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", fontWeight: 600, marginTop: 4 }}>
                until next card
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
