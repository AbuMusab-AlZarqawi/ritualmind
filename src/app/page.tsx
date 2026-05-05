"use client";
import { useState } from "react";
import { useReadContract } from "wagmi";
import { RITUALMIND_ABI } from "@/lib/web3";
import Landing from "@/components/Landing";
import Quiz from "@/components/Quiz";
import Result from "@/components/Result";
import Navbar from "@/components/Navbar";
import RecentSealings from "@/components/RecentSealings";
import { ArchetypeKey } from "@/lib/quiz";

const CONTRACT = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as 0x${string};
type Screen = "landing" | "quiz" | "result";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [resultKey, setResultKey] = useState<ArchetypeKey>("A");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleQuizComplete = (key: ArchetypeKey) => {
    setResultKey(key);
    setScreen("result");
  };

  return (
    <main className="relative z-10 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        {screen === "landing" && <Landing onStart={() => setScreen("quiz")} totalMinted={0} />}
        {screen === "quiz" && <Quiz onComplete={handleQuizComplete} onBack={() => setScreen("landing")} />}
        {screen === "result" && <Result archetypeKey={resultKey} onRetake={() => setScreen("landing")} onSealed={() => setRefreshKey(k => k + 1)} />}
      </div>
      {screen === "landing" && <RecentSealings refreshKey={refreshKey} />}
      <footer className="border-t border-ritual-green/10 py-4 text-center font-mono text-xs text-ritual-pale/25 tracking-widest">
        RITUALMIND · RITUAL CHAIN TESTNET · ONCHAIN IDENTITY PROTOCOL
      </footer>
    </main>
  );
}