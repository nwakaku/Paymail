
import {Web3Storage} from "web3.storage"

export async function main (file) {
 
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEFEMTU3YjA3ZTI1RDY0QTYxNGYxQmVhYjg0RTBmQzFGNThlNDhiZTAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjMyNzIyNzc5MzgsIm5hbWUiOiJNYWlsMyJ9.cvnr8hbcdQi-WJEgRnmKzrVvD9ToUhTe_u-Mv-TE910";
  
    if (!token) {
      return console.error('A token is needed. You can create one on https://web3.storage')
    }
  
    if (!file) {
      return console.error('Please supply the path to a file or directory')
    }


  
    const storage = new Web3Storage({ token })
   
    

  
    console.log(`Uploading file of path :${file}`)
    const cid = await storage.put(file)
    console.log('Content added with CID:', cid)
    return cid;
  }
