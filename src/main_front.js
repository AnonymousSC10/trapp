var baseURL = 'http://localhost',
    web3,
    metamaskAccounts = [],
    myAccount,
    isConnected = false;

import WalletConnectProvider from "@walletconnect/web3-provider";

const Web3 = require('web3');
    var ETLContract, ETLContractAddress = '0x1a0c6bB4bFAca4B80DEef8D0e29bb9C0b242046c',
    ETLAbi = [
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_numTokens",
            "type": "uint256"
          }
        ],
        "name": "buy",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "_addressContract",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "buyer",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "Sold",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      }
    ];

const metamask_connect = async () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
  
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        metamaskAccounts = await web3.eth.getAccounts();
        myAccount = metamaskAccounts[0];
  
        isConnected = (metamaskAccounts.length != 0);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('MetaMask is required.');
    }

    toggleModal();
  };

function toggleModal() {
  let formModal = document.getElementById('formModal');
  if (formModal.style.display == 'none') {
      formModal.style.display = 'block';
  } else {
    formModal.style.display = 'none';
  }
}

window.onload = () => {

    async function goWalletconnect() {
      const provider = await new WalletConnectProvider({
          rpc: {
              56: "https://bsc-dataseed1.binance.org",
          },
          chainId: 56,
          network: "binance",
          qrcode: true,
          qrcodeModalOptions: {
              mobileLinks: [
                "metamask",
                "trust",
              ]
          }
      });
      
      provider.networkId = 56;
      await provider.enable();

      web3 = new Web3(provider);
      metamaskAccounts = await web3.eth.getAccounts();
      myAccount = metamaskAccounts[0];
      isConnected = (metamaskAccounts.length != 0);

      toggleModal();
    }

    let loginMetamask = document.getElementById('loginMetamask'),
        loginWalletConnect = document.getElementById('loginWalletConnect');
    loginMetamask.onclick = metamask_connect;
    loginWalletConnect.onclick = goWalletconnect;


    async function buyTokens() {

      if (isConnected) {
        let inputNVIDIA = document.getElementById('inputNVIDIA'),
            tokensBuy = inputNVIDIA.value;
        ETLContract = new web3.eth.Contract(ETLAbi, ETLContractAddress, {from: myAccount});

        let datita = await ETLContract.methods.buy(tokensBuy).encodeABI(),
            value = web3.utils.toBN(tokensBuy * 10000000000000000);

        const tx = {
          from: myAccount, 
          to: ETLContractAddress, 
          data: datita, 
          value
        };

        web3.eth.sendTransaction(tx, myAccount)
              .then(async function () {
                //await fetch(baseURL + '/wallet/' + myAccount);
              })
              .catch( () => {
                //showApprove = false;
              });
      } else {
        toggleModal();
      }
    }

    let buyButton = document.getElementById('buyTokens');
    buyButton.onclick = buyTokens;

};
