"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { wagmiConfig } from "@/lib/web3";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en">
      <head>
        <title>RitualMind — Seal Your Onchain Identity</title>
        <meta name="description" content="Discover your Ritualist archetype and seal it permanently onchain on Ritual Chain Testnet." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider theme={darkTheme({ accentColor: "#2ecc2e", accentColorForeground: "#050a05", borderRadius: "none" })}>
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
