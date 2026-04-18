import { useState } from "react";
import Header from "./components/Header";
import InputBox from "./components/InputBox";
import OptionsList from "./components/OptionsList";
import ResultCard from "./components/ResultCard";
import { decide } from "./utils/decisionEngine.js";
import { Zap } from "lucide-react";

interface DecisionResult {
  choice: string;
  message: string;
  category: string;
  score: number;
  confidence: number;
  scores: Array<{ option: string; score: number; category: string; message: string }>;
}

export default function App() {
  const [options, setOptions] = useState<string[]>([]);
  const [result, setResult] = useState<DecisionResult | null>(null);
  const [shaking, setShaking] = useState(false);

  const addOption = (opt: string) => {
    if (options.includes(opt)) return;
    setOptions((prev) => [...prev, opt]);
    setResult(null);
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
    setResult(null);
  };

  const handleDecide = () => {
    if (options.length < 2) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
      return;
    }
    const res = decide(options);
    setResult(res as DecisionResult);
  };

  const handleReset = () => {
    setOptions([]);
    setResult(null);
  };

  return (
    <div
      className="min-h-screen py-12 px-4"
      style={{ background: "#0B0F1A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(57,255,20,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-xl mx-auto">
        <Header />

        <div
          className="rounded-2xl p-6 mb-4"
          style={{
            background: "rgba(17,24,39,0.8)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          <InputBox onAdd={addOption} />
          <OptionsList options={options} onRemove={removeOption} />

          {!result && (
            <button
              onClick={handleDecide}
              className="w-full py-4 rounded-xl font-black text-base tracking-widest uppercase transition-all duration-200 active:scale-95"
              style={{
                background:
                  options.length >= 2
                    ? "#39FF14"
                    : "rgba(57,255,20,0.15)",
                color: options.length >= 2 ? "#0B0F1A" : "#39FF1460",
                boxShadow:
                  options.length >= 2
                    ? "0 0 30px #39FF1460, 0 0 60px #39FF1420"
                    : "none",
                animation: shaking ? "shake 0.4s ease" : undefined,
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Zap size={18} fill="currentColor" />
                Decide For Me
                <Zap size={18} fill="currentColor" />
              </span>
            </button>
          )}

          {options.length < 2 && !result && (
            <p className="text-center text-xs text-gray-600 mt-3">
              Add at least 2 options to decide
            </p>
          )}
        </div>

        {result && (
          <ResultCard result={result} onReset={handleReset} />
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
