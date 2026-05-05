"use client";
import { useEffect, useState } from "react";

const WORDS = ["SHADOW SAGE", "ARCHIVIST", "PROPHET", "SOVEREIGN", "RITUALIST"];

export default function Landing({ onStart, totalMinted }: { onStart: () => void; totalMinted: number }) {
  const [wi, setWi] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setWi(i => (i + 1) % WORDS.length); setVisible(true); }, 300);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-6 py-16 text-center relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-8 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #1a7a1a, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-6 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #4dff4d, transparent 70%)" }} />

      {/* Black Cat SVG */}
      <div className="mb-8 animate-[catFloat_4s_ease-in-out_infinite] drop-shadow-[0_0_30px_rgba(46,204,46,0.5)]">
        <svg width="140" height="140" viewBox="0 0 160 160" fill="none">
          <ellipse cx="80" cy="108" rx="44" ry="36" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
          <circle cx="80" cy="64" r="30" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
          <polygon points="56,42 46,14 70,32" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
          <polygon points="58,40 51,20 68,33" fill="#1a7a1a"/>
          <polygon points="104,42 114,14 90,32" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
          <polygon points="102,40 109,20 92,33" fill="#1a7a1a"/>
          <ellipse cx="67" cy="62" rx="8" ry="10" fill="#2ecc2e"/>
          <ellipse cx="93" cy="62" rx="8" ry="10" fill="#2ecc2e"/>
          <ellipse cx="67" cy="62" rx="3" ry="9" fill="#050a05"/>
          <ellipse cx="93" cy="62" rx="3" ry="9" fill="#050a05"/>
          <ellipse cx="67" cy="62" rx="10" ry="12" fill="none" stroke="#4dff4d" strokeWidth="1" opacity="0.5"/>
          <ellipse cx="93" cy="62" rx="10" ry="12" fill="none" stroke="#4dff4d" strokeWidth="1" opacity="0.5"/>
          <polygon points="80,72 76,77 84,77" fill="#2ecc2e"/>
          <line x1="32" y1="68" x2="62" y2="72" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="32" y1="74" x2="62" y2="74" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="98" y1="72" x2="128" y2="68" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.6"/>
          <line x1="98" y1="74" x2="128" y2="74" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.6"/>
          <path d="M124 122 Q152 92 142 62 Q137 47 127 57" stroke="#2ecc2e" strokeWidth="6" fill="none" strokeLinecap="round"/>
          <text x="80" y="115" textAnchor="middle" fontSize="16" fill="#4dff4d" opacity="0.9">⬡</text>
        </svg>
      </div>

      <div className="font-mono text-xs text-ritual-bright tracking-[0.4em] uppercase mb-4 opacity-70">
        Ritual Chain · Onchain Identity
      </div>

      <h1 className="font-display font-black text-5xl sm:text-7xl text-ritual-cream leading-none tracking-tight mb-2" style={{ textShadow: "0 0 40px rgba(46,204,46,0.25)" }}>
        WHO ARE YOU
      </h1>
      <h2 className="font-display font-light italic text-2xl sm:text-4xl text-ritual-bright tracking-widest mb-2">
        IN THE RITUAL?
      </h2>

      <div className="h-8 mb-6">
        <span
          className="font-mono text-sm text-ritual-pale/60 tracking-widest transition-all duration-300"
          style={{ opacity: visible ? 1 : 0, display: "inline-block", transform: visible ? "translateY(0)" : "translateY(6px)" }}
        >
          Are you the {WORDS[wi]}?
        </span>
      </div>

      <p className="font-body text-ritual-pale/60 text-base max-w-md leading-relaxed mb-10 font-light">
        Answer 8 sacred questions. Your Ritualist archetype gets revealed and sealed permanently onchain.
        The chain remembers everything.
      </p>

      {/* Stats row */}
      <div className="flex gap-10 mb-10">
        {[
          { label: "Identities Sealed", val: totalMinted.toString() },
          { label: "Chain", val: "Ritual Testnet" },
          { label: "Cost", val: "Free" },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className="font-display font-bold text-xl text-ritual-cream">{s.val}</div>
            <div className="font-mono text-xs text-ritual-pale/30 uppercase tracking-widest mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="group relative border-2 border-ritual-bright text-ritual-cream font-display font-bold text-sm tracking-[0.2em] px-12 py-4 uppercase overflow-hidden transition-all duration-300 hover:text-ritual-black hover:shadow-[0_0_30px_rgba(46,204,46,0.4)]"
      >
        <span className="absolute inset-0 bg-ritual-bright transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        <span className="relative flex items-center gap-3">⬡ Begin the Ritual ⬡</span>
      </button>

      <p className="mt-4 font-mono text-xs text-ritual-pale/25 tracking-widest">
        ⚠ WARNING: Results may expose uncomfortable truths about your Ritualist nature
      </p>
    </section>
  );
}
