import { useEffect, useState } from "react";
import { Trophy, RotateCcw, TrendingUp } from "lucide-react";

interface ScoreEntry {
  option: string;
  score: number;
  category: string;
  message: string;
}

interface Result {
  choice: string;
  message: string;
  category: string;
  score: number;
  confidence: number;
  scores: ScoreEntry[];
}

interface Props {
  result: Result;
  onReset: () => void;
}

const categoryColors: Record<string, string> = {
  gym: "#39FF14",
  study: "#00E5FF",
  work: "#00E5FF",
  self: "#39FF14",
  growth: "#00E5FF",
  rest: "#888",
  social: "#f59e0b",
  chores: "#888",
  hobby: "#f59e0b",
  food: "#888",
  entertainment: "#FF4D4D",
  waste: "#FF4D4D",
  unknown: "#888",
};

export default function ResultCard({ result, onReset }: Props) {
  const [barWidth, setBarWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    setBarWidth(0);
    const t1 = setTimeout(() => setVisible(true), 50);
    const t2 = setTimeout(() => setBarWidth(result.confidence), 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [result]);

  const accentColor = categoryColors[result.category] ?? "#39FF14";

  return (
    <div
      className="rounded-2xl p-6 transition-all duration-500"
      style={{
        background: "#111827",
        border: `1px solid ${accentColor}40`,
        boxShadow: `0 0 40px ${accentColor}20`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Trophy size={18} style={{ color: accentColor }} />
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          Decision Made
        </span>
      </div>

      <h2
        className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight"
        style={{ textShadow: `0 0 20px ${accentColor}60` }}
      >
        {result.choice}
      </h2>

      <p className="text-gray-400 text-sm mb-6">{result.message}</p>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-widest flex items-center gap-1">
            <TrendingUp size={12} />
            Confidence
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: accentColor }}
          >
            {result.confidence}%
          </span>
        </div>
        <div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${barWidth}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}bb)`,
              boxShadow: `0 0 10px ${accentColor}80`,
            }}
          />
        </div>
      </div>

      {result.scores.length > 1 && (
        <div className="mb-6">
          <p className="text-xs text-gray-600 uppercase tracking-widest mb-3">
            All Options Ranked
          </p>
          <div className="flex flex-col gap-2">
            {[...result.scores]
              .sort((a, b) => b.score - a.score)
              .map((s, i) => {
                const c = categoryColors[s.category] ?? "#888";
                const isWinner = s.option === result.choice;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg px-3 py-2"
                    style={{
                      background: isWinner
                        ? `${accentColor}12`
                        : "rgba(255,255,255,0.02)",
                      border: isWinner
                        ? `1px solid ${accentColor}30`
                        : "1px solid rgba(255,255,255,0.04)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: c }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: isWinner ? "#fff" : "#9ca3af" }}
                      >
                        {s.option}
                      </span>
                    </div>
                    <span
                      className="text-xs font-bold"
                      style={{ color: c }}
                    >
                      {s.score}/10
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95"
        style={{
          background: "rgba(255,255,255,0.05)",
          color: "#9ca3af",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#fff";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.09)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "#9ca3af";
          (e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.05)";
        }}
      >
        <RotateCcw size={14} />
        Reset & Try Again
      </button>
    </div>
  );
}
