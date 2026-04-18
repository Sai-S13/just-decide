import { X } from "lucide-react";
import { analyzeOption } from "../utils/analyzer.js";

interface Props {
  options: string[];
  onRemove: (index: number) => void;
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

export default function OptionsList({ options, onRemove }: Props) {
  if (options.length === 0) return null;

  return (
    <div className="mb-6">
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
        Your Options ({options.length})
      </p>
      <div className="flex flex-col gap-2">
        {options.map((opt, i) => {
          const data = analyzeOption(opt);
          const color = categoryColors[data.category] ?? "#888";
          return (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg px-4 py-3 group transition-all duration-200"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                <span className="text-white text-sm font-medium">{opt}</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-bold"
                  style={{
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                  }}
                >
                  {data.category === "unknown" ? "?" : data.category}
                </span>
              </div>
              <button
                onClick={() => onRemove(i)}
                className="text-gray-600 hover:text-red-400 transition-colors ml-3"
              >
                <X size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
