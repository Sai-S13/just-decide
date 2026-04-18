export default function Header() {
  return (
    <div className="text-center mb-10">
      <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white mb-2">
        JUST{" "}
        <span
          className="neon-green"
          style={{ color: "#39FF14", textShadow: "0 0 20px #39FF14, 0 0 40px #39FF14aa" }}
        >
          DECIDE
        </span>
        <span className="ml-3" style={{ color: "#39FF14" }}>
          ⚡
        </span>
      </h1>
      <p className="text-gray-400 text-lg font-medium tracking-widest uppercase">
        Stop overthinking.{" "}
        <span style={{ color: "#00E5FF" }}>Start acting.</span>
      </p>
    </div>
  );
}
