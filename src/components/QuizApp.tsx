"use client";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RITUALMIND_ABI } from "@/lib/web3";
import { QUESTIONS, ARCHETYPES, tallyAnswers, type ArchetypeKey } from "@/lib/questions";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
type Screen = "landing" | "quiz" | "result" | "profile";

export default function QuizApp() {
  const { address, isConnected } = useAccount();
  const [screen, setScreen] = useState<Screen>("landing");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeKey[]>([]);
  const [result, setResult] = useState<ArchetypeKey | null>(null);
  const [sealing, setSealing] = useState(false);
  const [sealed, setSealed] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();
  const { data: existingIdentity } = useReadContract({
    address: CONTRACT, abi: RITUALMIND_ABI, functionName: "hasIdentity",
    args: address ? [address] : undefined, query: { enabled: !!address },
  });

  function startQuiz() { setCurrentQ(0); setAnswers([]); setResult(null); setSelected(null); setScreen("quiz"); }

  function selectAnswer(val: ArchetypeKey) {
    if (selected) return;
    setSelected(val);
    setTimeout(() => {
      const newAnswers = [...answers, val];
      setAnswers(newAnswers);
      if (currentQ + 1 < QUESTIONS.length) {
        setCurrentQ(currentQ + 1);
        setSelected(null);
      } else {
        const winner = tallyAnswers(newAnswers);
        setResult(winner);
        setScreen("result");
      }
    }, 400);
  }

  async function sealOnchain() {
    if (!result || !isConnected) return;
    const archetype = ARCHETYPES[result];
    setSealing(true); setError("");
    try {
      await writeContractAsync({
        address: CONTRACT, abi: RITUALMIND_ABI, functionName: "sealIdentity",
        args: [archetype.id, archetype.title, archetype.role, archetype.stats],
      });
      setSealed(true);
    } catch (err: any) {
      setError(err?.shortMessage || "Transaction failed");
    } finally { setSealing(false); }
  }

  function shareOnX() {
    if (!result) return;
    const a = ARCHETYPES[result];
    const text = `I just sealed my Ritual identity onchain 🐱⛓️\n\nI am: ${a.title}\n"${a.role}"\n\nMy archetype is permanently on Ritual Chain Testnet.\n\nFind out yours 👇 #RitualMind #RitualChain @ritualnet`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
  }

  const progress = ((currentQ) / QUESTIONS.length) * 100;
  const q = QUESTIONS[currentQ];
  const letters = ["A", "B", "C", "D"];

  return (
    <div className="relative z-10 min-h-screen flex flex-col">
      {/* ===== LANDING ===== */}
      {screen === "landing" && (
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
          {/* Cat SVG */}
          <div className="w-36 h-36 mb-8 animate-float filter drop-shadow-[0_0_20px_rgba(46,204,46,0.6)]">
            <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="80" cy="105" rx="45" ry="38" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
              <circle cx="80" cy="62" r="32" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
              <polygon points="55,38 45,12 70,30" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
              <polygon points="57,36 50,18 67,31" fill="#1a7a1a"/>
              <polygon points="105,38 115,12 90,30" fill="#0a110a" stroke="#2ecc2e" strokeWidth="2"/>
              <polygon points="103,36 110,18 93,31" fill="#1a7a1a"/>
              <ellipse cx="67" cy="60" rx="8" ry="10" fill="#2ecc2e"/>
              <ellipse cx="93" cy="60" rx="8" ry="10" fill="#2ecc2e"/>
              <ellipse cx="67" cy="60" rx="3" ry="9" fill="#050a05"/>
              <ellipse cx="93" cy="60" rx="3" ry="9" fill="#050a05"/>
              <polygon points="80,70 76,75 84,75" fill="#2ecc2e"/>
              <line x1="30" y1="68" x2="62" y2="72" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.7"/>
              <line x1="30" y1="74" x2="62" y2="74" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.7"/>
              <line x1="98" y1="72" x2="130" y2="68" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.7"/>
              <line x1="98" y1="74" x2="130" y2="74" stroke="#2ecc2e" strokeWidth="1.5" opacity="0.7"/>
              <path d="M125 120 Q150 90 140 60 Q135 45 125 55" stroke="#2ecc2e" strokeWidth="6" fill="none" strokeLinecap="round"/>
              <text x="80" y="112" textAnchor="middle" fontSize="18" fill="#4dff4d" opacity="0.8">⬡</text>
            </svg>
          </div>

          <div className="font-mono text-xs text-bright/70 tracking-widest uppercase mb-3">Ritual Chain · Onchain Identity</div>
          <h1 className="font-display text-5xl sm:text-7xl font-black text-cream leading-none tracking-tight mb-2">
            WHO ARE YOU
          </h1>
          <div className="font-display text-xl sm:text-2xl text-bright tracking-widest mb-6 italic font-normal">
            IN THE RITUAL?
          </div>
          <p className="text-pale font-body text-base leading-relaxed max-w-md mb-10 font-light">
            Answer 8 sacred questions. Your Ritualist archetype is revealed and sealed permanently onchain. The chain remembers everything.
          </p>

          <button onClick={startQuiz}
            className="border-2 border-bright text-cream font-display font-bold text-sm tracking-widest uppercase px-12 py-4 hover:bg-bright hover:text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(46,204,46,0.4)] active:scale-95">
            ⬡ Begin the Ritual ⬡
          </button>
          <p className="mt-5 font-mono text-xs text-pale/30">⚠ Results may expose uncomfortable truths</p>
        </div>
      )}

      {/* ===== QUIZ ===== */}
      {screen === "quiz" && (
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="w-full max-w-2xl">
            {/* Progress */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-bright/10 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-green to-glow transition-all duration-500 shadow-[0_0_8px_#2ecc2e]" style={{ width: `${progress}%` }} />
              </div>
              <span className="font-mono text-xs text-bright whitespace-nowrap">{currentQ + 1} / {QUESTIONS.length}</span>
            </div>

            <div className="text-4xl text-center mb-6">{q.emoji}</div>

            {/* Question card */}
            <div className="border border-bright/20 bg-deep/80 p-8 mb-6 relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-bright to-green" />
              <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-bright/30" />
              <div className="font-mono text-xs text-bright/60 tracking-widest uppercase mb-3">
                Question {String(currentQ + 1).padStart(2, "0")}
              </div>
              <div className="font-display text-lg sm:text-xl font-semibold text-cream leading-relaxed">
                {q.text}
              </div>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button key={i} onClick={() => selectAnswer(opt.val)}
                  disabled={!!selected}
                  className={`w-full flex items-center gap-4 p-4 border text-left font-body text-sm font-medium transition-all duration-200
                    ${selected === opt.val
                      ? "border-glow bg-bright/10 text-cream shadow-[0_0_20px_rgba(77,255,77,0.2)] -translate-x-0"
                      : selected
                      ? "border-bright/10 text-pale/40 cursor-not-allowed"
                      : "border-bright/15 text-pale hover:border-bright hover:text-cream hover:bg-bright/5 hover:translate-x-1 hover:shadow-[-4px_0_0_#2ecc2e]"
                    }`}>
                  <span className={`w-6 h-6 flex-shrink-0 flex items-center justify-center border font-mono text-xs transition-all
                    ${selected === opt.val ? "border-glow bg-glow text-black" : "border-bright/30 text-bright"}`}>
                    {letters[i]}
                  </span>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===== RESULT ===== */}
      {screen === "result" && result && (
        <div className="flex-1 flex items-center justify-center px-6 py-32">
          <div className="w-full max-w-2xl text-center">
            <div className="text-7xl mb-6 animate-fade-up" style={{ animationDelay: "0ms" }}>
              {ARCHETYPES[result].cat}
            </div>
            <div className="font-mono text-xs text-bright/70 tracking-widest uppercase mb-3 animate-fade-up" style={{ animationDelay: "100ms" }}>
              Your Ritual Archetype Is
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black text-cream leading-none mb-3 animate-fade-up" style={{ animationDelay: "200ms" }}>
              {ARCHETYPES[result].title}
            </h2>
            <div className="font-display text-lg text-bright tracking-widest italic mb-6 animate-fade-up" style={{ animationDelay: "300ms" }}>
              {ARCHETYPES[result].role}
            </div>

            <p className="text-pale font-body leading-relaxed text-sm max-w-lg mx-auto mb-8 animate-fade-up" style={{ animationDelay: "400ms" }}>
              {ARCHETYPES[result].desc}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-8 animate-fade-up" style={{ animationDelay: "500ms" }}>
              {ARCHETYPES[result].statNames.map((name, i) => (
                <div key={i} className="border border-bright/15 bg-deep/60 p-4 text-left">
                  <div className="font-mono text-xs text-bright/60 uppercase tracking-widest mb-2">{name}</div>
                  <div className="h-1 bg-bright/10 mb-1">
                    <div className="h-full bg-gradient-to-r from-green to-glow shadow-[0_0_6px_#2ecc2e] transition-all duration-1000"
                      style={{ width: `${ARCHETYPES[result].stats[i]}%` }} />
                  </div>
                  <div className="font-mono text-xs text-pale/60">{ARCHETYPES[result].stats[i]}/100</div>
                </div>
              ))}
            </div>

            {/* Seal onchain */}
            <div className="border border-bright/20 bg-deep/60 p-6 mb-6 animate-fade-up" style={{ animationDelay: "600ms" }}>
              <div className="font-mono text-xs text-bright/60 uppercase tracking-widest mb-3">Seal to Ritual Chain</div>
              {!isConnected ? (
                <div className="flex flex-col items-center gap-3">
                  <p className="text-pale/60 text-sm font-body mb-2">Connect wallet to seal your identity onchain</p>
                  <ConnectButton />
                </div>
              ) : sealed ? (
                <div className="flex items-center justify-center gap-3 text-bright font-mono text-sm">
                  <span className="w-2 h-2 rounded-full bg-bright animate-pulse" />
                  Identity sealed permanently to Ritual Chain ✓
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  {error && <p className="text-red-400 font-mono text-xs">{error}</p>}
                  <button onClick={sealOnchain} disabled={sealing}
                    className="bg-bright text-black font-display font-bold text-sm tracking-widest uppercase px-10 py-3 hover:bg-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(77,255,77,0.4)]">
                    {sealing ? "Sealing..." : "⬡ Seal Identity Onchain"}
                  </button>
                  <p className="text-pale/40 font-mono text-xs">Free transaction · No gas needed on testnet</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-center flex-wrap animate-fade-up" style={{ animationDelay: "700ms" }}>
              <button onClick={shareOnX} className="bg-bright text-black font-display font-bold text-xs tracking-widest uppercase px-8 py-3 hover:bg-glow transition-all hover:shadow-[0_0_20px_rgba(46,204,46,0.4)]">
                Share on 𝕏
              </button>
              <button onClick={startQuiz} className="border border-bright/30 text-pale font-body text-sm px-8 py-3 hover:border-bright hover:text-cream transition-all">
                Retake Quiz 🐱
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
