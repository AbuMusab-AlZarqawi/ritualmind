"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useReadContract } from "wagmi";
import { RITUALMIND_ABI } from "@/lib/web3";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Navbar() {
  const { data: total } = useReadContract({ address: CONTRACT, abi: RITUALMIND_ABI, functionName: "totalMinted" });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-bright/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🐱</span>
          <span className="font-display text-lg font-black text-cream tracking-widest">RITUAL<span className="text-bright">MIND</span></span>
          <span className="hidden sm:block font-mono text-xs text-bright/60 border border-bright/20 px-2 py-0.5">Testnet</span>
        </div>
        <div className="flex items-center gap-4">
          {total !== undefined && (
            <span className="hidden sm:block font-mono text-xs text-bright/50">
              ⬡ {total.toString()} identities sealed
            </span>
          )}
          <ConnectButton accountStatus="avatar" chainStatus="icon" showBalance={false} />
        </div>
      </div>
    </nav>
  );
}
