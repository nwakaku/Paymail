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

const { connectors } = getDefaultWallets({
  appName: "Mail3",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
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
