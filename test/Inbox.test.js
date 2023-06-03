// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let inbox;
const initialMessage = 'Hi There!';

beforeEach(async () =>{
    // Get the list of all accounts
    // every web3 function is async in nature therefore use Promise/ async, await

    accounts = await web3.eth.getAccounts();
    // web3.eth.getAccounts()
    //     .then(fetchedAccounts => {
    //         console.log(fetchedAccounts)
    //     });

    // Use one of those accounts to deploy the account
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['hi there!']})
        .send({from: accounts[0], gas: '1000000'})
})

describe('Inbox', ()=>{
    it('deploys a contract', ()=>{
        // console.log(accounts);
        // console.log(inbox);
        assert.ok(inbox.options.address);
    });
    it('has a default message', async ()=>{
        const message = await inbox.methods.message().call();
        assert.equal(message, 'hi there!')
    })
    it('can change the message', async ()=>{
        await inbox.methods.setMessage('bye').send({from: accounts[0]}) //returns transaction hash and not the message
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye')
    })
})