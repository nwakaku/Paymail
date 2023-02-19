import { createContext, useEffect, useState } from "react";
import {deployedAddress} from "../Utils/keys";
import { ethers } from "ethers";
import WebEmailService from "../Utils/WebEmailService.json";
const { ethereum } = window;


export const Web3ApiContext = createContext();

let contractAddress = deployedAddress;

const getContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    contractAddress,
    WebEmailService.abi,
    signer
  )

  return contract;
}

const Web3ApiProvider = ({ children }) => {
  const [connectedAccount, setConnectedAccount] = useState(null);

  const [AllMails, setAllMails] = useState([]);
  const [SentEmails, setSentEmails] = useState([]);
  const [SpamEmailAdress, setSpamEmailAdress] = useState([]);
  const [done, setDone] = useState("");
  const [balance, setBalance] = useState();

  const ComposeMailMain = async (
    receiverAddress,
    subject,
    body,
    ipfsHash,
    Filename,
    amount
  ) => {
    try {
      const EthAmt = ethers.utils.parseEther(amount);
      console.log(EthAmt);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: receiverAddress,
            value: EthAmt._hex,
          },
        ],
      });

      const TransactionHash = await getContract().sendEmail(
        receiverAddress,
        subject,
        body,
        Date.now().valueOf(),
        ipfsHash,
        Filename,
        { value: EthAmt._hex }
      );
      await TransactionHash.wait();
      setDone("Done");
      await console.log("DONE");
    } catch (e) {
      console.log(e);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setConnectedAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object found!");
    }
  };

  const getInboxdata = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const inboxMails = await getContract().getInboxEmails();

      const data = inboxMails.map((e) => ({
        sender: e.sender,
        receiver: connectedAccount,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename: e.Filename,
        amount: parseInt(e.amount)/10**18
      }));

      setAllMails(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getBalance = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const balance = await getContract().getEscrowBalance();
      setBalance(balance);
    } catch (error) {
      console.log(error);
    }
  };

  

  // Frontend function to get the escrow balance
   const getEscrowBalance = async () => {
     const provider = new ethers.providers.Web3Provider(window.ethereum);
    //  const signer = provider.getSigner();
    // Get the user's address
    const accounts = await provider.listAccounts();

    // Call the getEscrowBalance function and pass in the user's address
    const balance = (await getContract().getEscrowBalance())/10**18;
    setBalance(balance);

    // Handle the result
    console.log(`Escrow balance: ${balance.toString()}`);
  }

  const withdraw = async (i) => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const withdraw = await getContract().withdraw(i);

      await withdraw.wait();
      setDone("Done");
      await console.log("DONE");
    } catch (error) {
      console.log();
    }
  };

  const getSpamList = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const spam_List = await getContract().get_Spam_list();
      setSpamEmailAdress(spam_List);
    } catch (err) {
      console.log(err);
    }
  };

  const GetSentItems = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const sentEmails = await getContract().getSentEmails();

      const data = sentEmails.map((e) => ({
        receiver: e.receiver,
        subject: e.subject,
        body: e.body,
        timestamp: e.timestamp,
        ipfsHash: e.ipfsHash,
        Filename: e.Filename,
      }));

      setSentEmails(data);
    } catch (err) {
      console.log(err);
    }
  };

  const ReportSpam = async (_spamAddress) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      await getContract().reportSpam(_spamAddress);
      await console.log("success");
    } catch (err) {
      throw new Error(err);
    }
  };

  const RemoveFromSpam = async (_spamAddress) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      const spamMail = await getContract().removeFromSpam(_spamAddress);
    } catch (err) {
      throw new Error(err);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install Metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);

        getSpamList();
        getInboxdata();
        GetSentItems();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const Disconnect = () => {
    setConnectedAccount("0x0");
  };

  useEffect(() => {
    try {
      checkIfWalletIsConnected();
      getEscrowBalance();
    } catch (err) {
      console.error(err);
    }
  }, []);

  return (
    <Web3ApiContext.Provider
      value={{
        getInboxdata,
        connectWallet,
        connectedAccount,
        checkIfWalletIsConnected,
        ComposeMailMain,
        AllMails,
        SentEmails,
        ReportSpam,
        RemoveFromSpam,
        SpamEmailAdress,
        setSpamEmailAdress,
        done,
        GetSentItems,
        withdraw,
        Disconnect,
        balance,
        getBalance,
        getEscrowBalance,
      }}
    >
      {children}
    </Web3ApiContext.Provider>
  );
};
export default Web3ApiProvider;
