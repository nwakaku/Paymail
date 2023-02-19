import { useEffect, useState } from "react";
import "./Mail.css";

import Modalex from "./Modalex";


export default function Message({
  receiver,
  subject,
  body,
  timestamp,
  ipfsHash,
  Filename,
  sender,
  i,
  getBalance,
  withdraw,
  amount
}) {


   
  return (
    <>
      <div className="card message ">
        
        <h6 className="card-text">{sender}</h6>
        <h2 className="card-text">{subject}</h2>
        <div>
          <Modalex
          receiver={receiver}
            sender={sender}
            subject={subject}
            body={body}
            timestamp={timestamp}
            ipfsHash={ipfsHash}
            Filename={Filename}
            i={i}
            withdraw ={withdraw} 
            amount = {amount}
          />
        </div>
      </div>
    </>
  );
}
