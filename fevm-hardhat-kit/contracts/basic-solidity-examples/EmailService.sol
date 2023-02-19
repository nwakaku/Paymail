// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

contract EmailService {
    // Event for send email function
    event Send(address sender,address reciever,string subject,string body,uint256 timestamp, string ipfsHash,string Filename, uint _amount
    );

    // Event for report spam function
    event report(address _spamAddress);

    //event for removing from spam list
    event RemovedfromSpam(address _spamAddress);

    // Structure of an email
    struct Email{
        address sender; // Address of the current user's wallet
        address receiver; // Address of receiver's walley
        string subject; // Subject of the email
        string body; // Body of the email
        uint256 timestamp; // current block timestamp as seconds since unix epoch
        string ipfsHash; // CID (Content Identifier) of Attached files
        string Filename;
        uint amount;
    }

    Email[] emails;

    mapping(address => Email[]) public inbox;
    mapping(address => Email[]) public sent;
    mapping(address => address[]) public spam_list;

    mapping(address => uint) public escrow;

    
    // Send Email function
    function sendEmail(address _reciever, string memory subject, string memory body, uint256 timestamp, string memory ipfsHash, string memory Filename) payable public {
        require(msg.sender != _reciever, "Sender and receiver address cannot be same.");
        require(msg.value > 0, "Amount should be greater than 0.");

        inbox[_reciever].push(Email(msg.sender, _reciever, subject, body, timestamp, ipfsHash, Filename, msg.value));
        sent[msg.sender].push(Email(msg.sender, _reciever, subject, body, timestamp, ipfsHash, Filename, msg.value));
        escrow[_reciever] += msg.value;
        emit Send(msg.sender, _reciever, subject, body, timestamp, ipfsHash, Filename, msg.value);
    }



    // Fetch All Emails of the current user who is connected with the smart contract
   function getInboxEmails() public view returns(Email[] memory) {
       return inbox[msg.sender];
   }

    // Fetch Sent Emails of the current user who is connected with the smart contract
   function getSentEmails() public view returns(Email[] memory) {
       return sent[msg.sender];
   }

    // Fetch current user's wallet balance
   function currentBalance() public view returns(uint256) {
       return msg.sender.balance;
   }


   function reportSpam(address _spamAddress) public {
       spam_list[msg.sender].push(_spamAddress);
       emit report(_spamAddress);
   }
    
    function removeFromSpam(address _spamAddress) public {
       for(uint i = 0; i < spam_list[msg.sender].length-1; i++) {
           if(spam_list[msg.sender][i] == _spamAddress) {
               spam_list[msg.sender][i] = spam_list[msg.sender][i+1];
           }
       }
       spam_list[msg.sender].pop();
       emit RemovedfromSpam(_spamAddress);
   }

   function get_Spam_list() public view returns(address[] memory) {
       return spam_list[msg.sender];
   }

   function withdraw(uint emailIndex) public {
    // uint amount = escrow[msg.sender];
    // require(amount > 0, "You don't have any funds in escrow.");
    require(emailIndex < inbox[msg.sender].length, "Email index is out bounds.");
    Email storage email = inbox[msg.sender][emailIndex];
    require(email.amount > 0, "There are no funds escrowed for this email.");

    uint amount = email.amount;
    email.amount = 0;
    escrow[msg.sender] -= amount;


    (bool success, ) = msg.sender.call{value: amount}("");
    require(success, "Withdrawal failed.");
    }

    function getEscrowBalance() public view returns (uint) {
    return escrow[msg.sender];
    }

}