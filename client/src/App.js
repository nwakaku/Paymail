import React from "react";
import Home from "./pages/home/Home";
import Mail from "./pages/mail/Mail";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { filecoinHyperspace } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { HuddleIframe } from "@huddle01/huddle01-iframe";

import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { publicProvider } from "wagmi/providers/public";

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Arcana Wallet",
    iconUrl: "",
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          // appId parameter refers to App Address value in the Dashboard
          appId: "20B0B836C92D91Ba2059d6Fa76073Ac431A56B64",
        },
      });
      return {
        connector,
      };
    },
  };
};

const connectors = (chains) =>
  connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [ArcanaRainbowConnector({ chains }), metaMaskWallet({ chains })],
    },
  ]);


const { chains, provider } = configureChains(
  [filecoinHyperspace],
  [
    jsonRpcProvider({
      rpc: (hyperspace) => ({
        http: `https://api.${hyperspace}.node.glif.io/rpc/v1`,
        webSocket: `wss://api.${hyperspace}.node.glif.io/rpc/v1`,
      }),
    }),
  ]
);


const wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors(chains),
  provider,
});

function App() {
  return (
    <div className="App">
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mail/*" element={<Mail />} exact />
            </Routes>
          </Router>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
