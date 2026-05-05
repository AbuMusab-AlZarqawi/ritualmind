"use client";
import { useReadContract } from "wagmi";
import { useEffect } from "react";
import { RITUALMIND_ABI } from "@/lib/web3";
import { ARCHETYPES, ArchetypeKey } from "@/lib/quiz";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function RecentSealings({ refreshKey }: { refreshKey: number }) {
  const { data: recent, refetch } = useReadContract({
    address: CONTRACT,
    abi: RITUALMIND_ABI,
    functionName: "getRecentMinters",
    args: [BigInt(10)],
  });

  useEffect(() => { refetch(); }, [refreshKey]);

  if (!recent || (recent as any[]).length === 0) return null;

  return (
    <section className="border-t border-ritual-green/8 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs text-ritual-bright/50 tracking-widest uppercase mb-8 text-center">
          Recently Sealed Identities
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {(recent as any[]).map((id, i) => {
            const key = id.archetype.replace("_", "") === "SHADOWSAGE" ? "A"
              : id.archetype === "RADIANT_ARCHIVIST" ? "B"
              : id.archetype === "COMMUNITY_PROPHET" ? "C" : "D";
            const arch = ARCHETYPES[key as ArchetypeKey];
            return (
              <div key={i} className="border border-ritual-green/10 bg-ritual-deep/40 p-4 flex items-center gap-3">
                <span className="text-2xl">{arch.cat}</span>
                <div className="min-w-0">
                  <div className="font-mono text-xs truncate" style={{ color: arch.color }}>{arch.title}</div>
                  <div className="font-mono text-xs text-ritual-pale/30 truncate">
                    {id.wallet.slice(0, 6)}...{id.wallet.slice(-4)}
                  </div>
                </div>
                <div className="ml-auto">
                  <div className="w-2 h-2 rounded-full bg-ritual-bright/40" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
