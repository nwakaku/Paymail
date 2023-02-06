import { useContext, useEffect } from "react";
import { HuddleIframe, huddleIframeApp } from "@huddle01/huddle01-iframe";

const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/",
  height: "530px",
  width: "100%",
  allow: "camera; microphone; clipboard-read; clipboard-write; display-capture",
  noBorder: false, // false by default
};




const Huddle = () => {

    useEffect(() => {
    huddleIframeApp.on("peer-join", (data) =>
      console.log({ iframeData: data })
    );
    huddleIframeApp.on("peer-left", (data) =>
      console.log({ iframeData: data })
    );
  }, []);

  return (
    <>
      <div className="inbox video">
        <HuddleIframe config={iframeConfig} />
      </div>
    </>
  );
};

export default Huddle;
