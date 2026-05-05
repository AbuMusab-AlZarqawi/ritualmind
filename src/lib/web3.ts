"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const ritualChain = defineChain({
  id: 1979,
  name: "Ritual Chain",
  nativeCurrency: { name: "RITUAL", symbol: "RITUAL", decimals: 18 },
  rpcUrls: { default: { http: ["https://rpc.ritualfoundation.org"] }, public: { http: ["https://rpc.ritualfoundation.org"] } },
  blockExplorers: { default: { name: "Ritual Explorer", url: "https://explorer.ritualfoundation.org" } },
  testnet: true,
});

export const wagmiConfig = getDefaultConfig({
  appName: "RitualMind",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo",
  chains: [ritualChain],
  ssr: true,
});

export const RITUALMIND_ABI = [
  { name: "sealIdentity", type: "function", stateMutability: "nonpayable",
    inputs: [
      { name: "archetype", type: "uint8" },
      { name: "archetypeName", type: "string" },
      { name: "role", type: "string" },
      { name: "stats", type: "uint8[4]" },
    ],
    outputs: [],
  },
  { name: "getIdentity", type: "function", stateMutability: "view",
    inputs: [{ name: "wallet", type: "address" }],
    outputs: [{
      name: "", type: "tuple",
      components: [
        { name: "wallet", type: "address" },
        { name: "archetype", type: "uint8" },
        { name: "archetypeName", type: "string" },
        { name: "role", type: "string" },
        { name: "stats", type: "uint8[4]" },
        { name: "mintedAt", type: "uint256" },
        { name: "quizVersion", type: "uint256" },
        { name: "exists", type: "bool" },
      ],
    }],
  },
  { name: "hasIdentity", type: "function", stateMutability: "view", inputs: [{ name: "wallet", type: "address" }], outputs: [{ name: "", type: "bool" }] },
  { name: "totalMinted", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
  { name: "getLeaderboard", type: "function", stateMutability: "view", inputs: [],
    outputs: [
      { name: "shadowSage", type: "uint256" },
      { name: "radiantArchivist", type: "uint256" },
      { name: "communityProphet", type: "uint256" },
      { name: "sovereignAgent", type: "uint256" },
    ],
  },
] as const;
