import web3 from "./Web3";

// ERC20 Instance is deployed at: 0x7f75161e16621788d124C85493058cae1C93b1bF
// Contract is deployed at: 0x4215186a0bc8bDed7Ef60f6e2157f43FAF32F146

const address = "0x4215186a0bc8bDed7Ef60f6e2157f43FAF32F146";

const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "manager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amt",
        "type": "uint256"
      }
    ],
    "name": "staking",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unStakeAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "zzToken",
    "outputs": [
      {
        "internalType": "contract Izz",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

//  we are creating a local instance of Staking contract
export default new web3.eth.Contract(abi, address);
