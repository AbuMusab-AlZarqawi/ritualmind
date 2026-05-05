"use client";
import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ARCHETYPES, ArchetypeKey } from "@/lib/quiz";
import { RITUALMIND_ABI } from "@/lib/web3";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;
type SealStep = "idle" | "sealing" | "sealed" | "error" | "already";

export default function Result({ archetypeKey, onRetake, onSealed }: {
  archetypeKey: ArchetypeKey;
  onRetake: () => void;
  onSealed: () => void;
}) {
  const archetype = ARCHETYPES[archetypeKey];
  const { address, isConnected } = useAccount();
  const [sealStep, setSealStep] = useState<SealStep>("idle");
  const [error, setError] = useState("");
  const [fakeHash, setFakeHash] = useState("");

  const { writeContractAsync } = useWriteContract();

  const { data: alreadyMinted } = useReadContract({
    address: CONTRACT,
    abi: RITUALMIND_ABI,
    functionName: "hasMinted",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  useEffect(() => {
    setFakeHash("0x" + Math.random().toString(16).slice(2, 8) + "..." + Math.random().toString(16).slice(2, 6));
  }, []);

  useEffect(() => {
    if (alreadyMinted) setSealStep("already");
  }, [alreadyMinted]);

  const handleSeal = async () => {
    if (!isConnected) return;
    setSealStep("sealing");
    setError("");
    try {
      const s = archetype.stats;
      await writeContractAsync({
        address: CONTRACT,
        abi: RITUALMIND_ABI,
        functionName: "sealIdentity",
        args: [
          archetypeKey === "A" ? "SHADOW_SAGE" : archetypeKey === "B" ? "RADIANT_ARCHIVIST" : archetypeKey === "C" ? "COMMUNITY_PROPHET" : "SOVEREIGN_AGENT",
          archetype.role,
          s.chaos,
          s.precision,
          s.influence,
          s.autonomy,
        ],
      });
      setSealStep("sealed");
      onSealed();
    } catch (err: any) {
      setError(err?.shortMessage || err?.message || "Transaction failed");
      setSealStep("error");
      setTimeout(() => setSealStep("idle"), 4000);
    }
  };

  const shareText = `I took the @ritualnet onchain personality quiz!\n\nI am: ${archetype.title}\n"${archetype.role}"\n\nMy identity is sealed permanently to Ritual Chain 🐱⛓️\n\n#RitualMind #RitualChain #Web3`;

  const StatBar = ({ label, val, color }: { label: string; val: number; color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="font-mono text-xs text-ritual-bright/60 uppercase tracking-widest">{label}</span>
        <span className="font-mono text-xs text-ritual-pale">{val}/100</span>
      </div>
      <div className="h-1 bg-ritual-green/10">
        <div
          className="h-full transition-all duration-1000 ease-out"
          style={{ width: `${val}%`, background: color, boxShadow: `0 0 6px ${color}` }}
        />
      </div>
    </div>
  );

  return (
    <section className="flex flex-col items-center justify-center min-h-[85vh] px-6 py-16">
      <div className="w-full max-w-lg text-center">
        {/* Cat */}
        <div
          className="text-7xl mb-4 block"
          style={{ animation: "resultPop 0.8s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          {archetype.cat}
        </div>

        <div className="font-mono text-xs text-ritual-bright tracking-[0.4em] uppercase mb-2 opacity-70">
          Your Ritual Archetype is
        </div>

        <h1
          className="font-display font-black text-4xl sm:text-5xl text-ritual-cream leading-tight mb-2"
          style={{ textShadow: `0 0 30px ${archetype.color}55`, color: archetype.color }}
        >
          {archetype.title}
        </h1>

        <div className="font-display text-lg tracking-widest text-ritual-bright mb-6">
          {archetype.role}
        </div>

        {/* Onchain badge */}
        <div className="inline-flex items-center gap-2 border border-ritual-green/40 bg-ritual-green/5 px-4 py-2 font-mono text-xs text-ritual-bright mb-6">
          <span className="w-2 h-2 rounded-full bg-ritual-bright animate-pulse" />
          {sealStep === "sealed" ? `SEALED · ${fakeHash}` : `PENDING SEAL · ${fakeHash}`}
        </div>

        <p className="font-body text-ritual-pale/60 text-sm leading-relaxed max-w-md mx-auto mb-8">
          {archetype.desc}
        </p>

        {/* Stats */}
        <div className="border border-ritual-green/15 bg-ritual-deep/60 p-6 mb-8 space-y-4 text-left">
          <div className="font-mono text-xs text-ritual-bright/50 uppercase tracking-widest mb-4">Archetype Stats</div>
          <StatBar label="Chaos Energy" val={archetype.stats.chaos} color={archetype.color} />
          <StatBar label="Precision" val={archetype.stats.precision} color="#2ecc2e" />
          <StatBar label="Influence" val={archetype.stats.influence} color="#c9a84c" />
          <StatBar label="Autonomy" val={archetype.stats.autonomy} color="#4dff4d" />
        </div>

        {/* Seal section */}
        {sealStep === "already" ? (
          <div className="border border-ritual-bright/30 bg-ritual-green/5 p-4 font-mono text-sm text-ritual-bright mb-4">
            ✅ Your identity is already sealed onchain
          </div>
        ) : sealStep === "sealed" ? (
          <div className="border border-ritual-bright/30 bg-ritual-green/5 p-4 font-mono text-sm text-ritual-bright mb-4">
            ✅ Identity sealed to Ritual Chain permanently
          </div>
        ) : (
          <div className="mb-4">
            {!isConnected ? (
              <div className="flex flex-col items-center gap-3">
                <p className="font-mono text-xs text-ritual-pale/40">Connect wallet to seal your identity onchain</p>
                <ConnectButton />
              </div>
            ) : (
              <>
                {sealStep === "error" && (
                  <div className="border border-red-500/30 bg-red-500/5 p-3 font-mono text-xs text-red-400 mb-3">
                    ⚠ {error}
                  </div>
                )}
                <button
                  onClick={handleSeal}
                  disabled={sealStep === "sealing"}
                  className="w-full bg-ritual-bright text-ritual-black font-display font-bold text-sm tracking-widest py-4 uppercase hover:bg-ritual-glow transition-all hover:shadow-[0_0_20px_rgba(77,255,77,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {sealStep === "sealing" ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-ritual-black border-t-transparent rounded-full animate-spin" />
                      Sealing to chain...
                    </span>
                  ) : "⬡ Seal Identity to Ritual Chain"}
                </button>
                <p className="font-mono text-xs text-ritual-pale/25 mt-2">Free · One identity per wallet · Permanent</p>
              </>
            )}
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            className="border border-ritual-green/30 text-ritual-pale/60 hover:text-ritual-cream hover:border-ritual-bright font-body text-sm px-6 py-3 transition-all"
          >
            Share on X 𝕏
          </a>
          <button
            onClick={onRetake}
            className="border border-ritual-green/30 text-ritual-pale/60 hover:text-ritual-cream hover:border-ritual-bright font-body text-sm px-6 py-3 transition-all"
          >
            Take Again 🐱
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes resultPop {
          from { transform: scale(0) rotate(-20deg); opacity: 0; }
          to { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
