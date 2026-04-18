import { useState } from "react";
import { Plus } from "lucide-react";
import optionsList from "../data/options.json";

interface Props {
  onAdd: (option: string) => void;
}

export default function InputBox({ onAdd }: Props) {
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (val.trim().length > 0) {
      setFiltered(
        optionsList
          .filter((o) => o.toLowerCase().includes(val.toLowerCase()))
          .slice(0, 5)
      );
    } else {
      setFiltered([]);
    }
  };

  const submit = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
    setFiltered([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit(value);
  };

  return (
    <div className="relative mb-6">
      <div
        className="flex gap-2 rounded-xl p-1"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(57,255,20,0.25)",
          backdropFilter: "blur(10px)",
        }}
      >
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type an option... (e.g. Study, Go to gym)"
          className="flex-1 bg-transparent text-white placeholder-gray-500 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={() => submit(value)}
          className="flex items-center gap-2 px-5 py-2 rounded-lg font-bold text-sm transition-all duration-200 active:scale-95"
          style={{
            background: "#39FF14",
            color: "#0B0F1A",
            boxShadow: "0 0 16px #39FF1480",
          }}
        >
          <Plus size={16} />
          Add
        </button>
      </div>

      {filtered.length > 0 && (
        <ul
          className="absolute left-0 right-0 mt-1 rounded-xl overflow-hidden z-10"
          style={{
            background: "#111827",
            border: "1px solid rgba(57,255,20,0.2)",
          }}
        >
          {filtered.map((opt) => (
            <li
              key={opt}
              onClick={() => submit(opt)}
              className="px-4 py-2 text-sm text-gray-300 cursor-pointer hover:text-white transition-colors"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(57,255,20,0.08)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "")
              }
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
