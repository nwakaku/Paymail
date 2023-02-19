import React from 'react'
import "./Mail.css";
import ncodeRFC5987ValueChars from "./Utils/URLencoding/Encoder"
import { Web3ApiContext } from '../../context/Web3ApiContext';
import { SpinnerDiamond } from 'spinners-react';
import {useLocation }from "react-router-dom";
import { RiSpamFill } from "react-icons/ri";
import { useContext } from 'react';
import {FaDownload} from "react-icons/fa"
import { convertTodate,convertTotime } from './Utils/URLencoding/Timestamp_convert';
import { download } from './Utils/URLencoding/download';
import {AiOutlineRollback} from "react-icons/ai"

const Modalex = ({receiver,subject, body, timestamp, ipfsHash, Filename, sender ,i , amount }) => {
    const location=useLocation();
    console.log(location);
  const { connectedAccount, ReportSpam, RemoveFromSpam, GetSentItems, withdraw, balance, getEscrowBalance} = useContext(Web3ApiContext);
  console.log(balance);
    if (!connectedAccount) {
      return <div className="loading">
      <SpinnerDiamond size={73} thickness={143} speed={80} color="rgba(113, 57, 172, 1)" secondaryColor="rgba(57, 128, 172, 0.92)" />
      </div>
    }


    const encodedString=ncodeRFC5987ValueChars(Filename);
  return (
    <div><button type="button" className="btn exmodal" data-bs-toggle="modal" data-bs-target={"#exampleModal"+i}>
    Open Message
  </button>
  
  <div className="modal fade" id={"exampleModal"+i} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title card-text" id="exampleModalLabel"><strong>Subject :</strong>{subject} </h5>
          <span className=" text_right "> -- {convertTodate (timestamp)} ,   {convertTotime (timestamp)}</span>
   
         
        </div>
        <div className="modal-body ex-body">
       { location.pathname==="/mail/SpamSection" ? <><h2 className='text_right' style={{Text}} data-bs-toggle="tooltip" data-bs-placement="top" title="remove from spam" onClick={()=>  RemoveFromSpam(sender)

       }><AiOutlineRollback /></h2></>  : <></>}
        {   (location.pathname!=='/mail/sentEmails' &&   location.pathname!=='mail/SpamSection' &&  location.pathname==='/mail/') ? <></>:<h3 className='text_right'><RiSpamFill className="spambtn" size={25} color="black" data-bs-toggle="tooltip" data-bs-placement="top" title="report as a spam" onClick={()=>{
        ReportSpam(sender)
        }} /></h3>}
        {location.pathname!=='/mail/sentEmails' ?<h6 className="card-text"><strong>From :</strong> {sender}</h6>:<></>}
        {   location.pathname==='/mail/sentEmails' ?  <h6 className="card-text"><strong>To: </strong>: {receiver}</h6>:<></>}
    
        <p className="card-text">{body}</p>
        { location.pathname!=='/mail/sentEmails' ? <p className="card-text mt-3"><strong>PayCheck : </strong>{amount}</p>:<></>}
        <p>{i}</p>
        
        <h5>Attached File link : <a  href={`https://${ipfsHash}.ipfs.dweb.link/${encodedString}`} download> {Filename}</a><span className='download_btn ' onClick={() => {download(`https://${ipfsHash}.ipfs.dweb.link/${encodedString}`)}}
      style={{cursor:"pointer"}} ><FaDownload size={20} /></span>  </h5>
         
        </div>
       
      

        <div className="modal-footer" style={{display:"flex", justifyContent:"center"}} >
          {amount > 0 ? <button type="button" onClick={() => withdraw(i)} className="btn btn-secondary  sentbtn-close " >Claim</button> : null}
          <button type="button" className="btn btn-secondary  sentbtn-close " data-bs-dismiss="modal">Close</button>
          {/* <button type="button" onClick={() => withdraw()} className="btn btn-secondary  sentbtn-close " >Withdraw</button> */}

        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Modalex