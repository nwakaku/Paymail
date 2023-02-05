import "./Home.css";
import { useContext } from "react";
import { Link } from "react-router-dom"
import {Web3ApiContext} from "../../context/Web3ApiContext";
import logo from '../../images/3mail.png'
import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function Login() {
    const {connectWallet}=useContext(Web3ApiContext);
   
    return (
        <>
            <div className="home">
                <div className="nav">
                    <div className="title">Mail3</div>
                    <div className="connect"><ConnectButton/></div>
                </div>
                <div className="detail">
                    <img src={logo} alt="#3maillogo" ></img>
                    <div className="text">
                        <p className="heading-text">Mail3 WorkSpaces</p>
                    </div>
                    <p>Welcome to Decentralized Gmail </p>
                <Link onClick={connectWallet} to='/mail' className="btn">Get Started
            </Link>
                </div>
            </div>
                
             
           
          
     

        </>
    );
}