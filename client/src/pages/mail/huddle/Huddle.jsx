import { useContext } from "react";
import { HuddleIframe } from "@huddle01/huddle01-iframe";

// JavaScript
const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/123",
  height: "530px",
  width: "100%",
  noBorder: false, // false by default
};

const Huddle = () => {
  return (
    <>
      <div className="inbox video">
        <HuddleIframe config={iframeConfig} />
      </div>
    </>
  );
};

export default Huddle;
