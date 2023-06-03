pragma solidity ^0.4.17;

contract Inbox{
    //storage variable
    // since it's public, then the Remix compiler creates the getMessage() function internally
    // so the getMessage() is not required
    string public message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    // view means that the function returns data and does not modify the contract's data
    // function getMessage() public view returns (string){
    //     return message;
    // }

}