# PayMail
Decentralized PayMail

This is a Solidity smart contract that provides an email service with features such as sending and receiving emails, reporting spam, and an escrow system for sending funds along with an email. The contract defines an Email struct that stores email details, including attached files. The contract also includes mappings for the inbox, sent emails, and spam list of each user, as well as an escrow mapping for funds. The contract can be used to create a decentralized email system, provide an email service utilizing blockchain technology, or add email functionality to an existing dApp.

<hr/>
 <h5> 
 This Web App implements an email service that enables users to send and receive emails on the Ethereum blockchain. Some potential problems that an app built with this contract can solve include:

Privacy concerns: Email communication is vulnerable to hacking and interception, compromising user privacy. A decentralized email service built on the blockchain can offer improved security and privacy, as it eliminates the need for a centralized server, which can be a target for hackers.

Censorship: A decentralized email service can prevent censorship and provide an alternative to traditional email services that can be censored or controlled by governments or corporations.

Email fraud: Scammers and spammers use email to defraud users by sending phishing emails, spam, and other fraudulent messages. The blockchain-based email service implemented by this contract includes a spam report feature that can help users report and identify spam email addresses.

Payment integration: The contract includes a payment feature that allows users to send funds along with their email, making it useful for micropayments and other payment integrations.

Overall, an app built with this contract can offer a decentralized and secure email service that provides users with more control over their communication and financial transactions.</h5>
  
<hr/>

## youtube demo video
https://youtu.be/bF7kVFtan2U


### Built Using :
   
- React
- Bootstrap
- CSS
- Ether.js
- Hardhat
- hyperspace
- Solidity
- Filecoin
- arcana 

### How it is built :
The frontend part was built using **React, and Bootstrap**. The fronted part was deployed on SPHERON. Smart contract was written in **Solidity** using Remix IDE and **Ether.js** was used to connect the frontend with the smart contract [Deployed on **FEVM** using **RainbowKit and FEVM rpc**]. **Web3.storage API** was used for storing attached files data on persistent long-term storage provided by **Filecoin**
