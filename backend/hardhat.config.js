require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// require("@nomiclabs/hardhat-waffle");
const SEPOLIA_API_KEY = "6175441edd634653870da7d69e0afab9";
const SEPOLIA_PRIVATE_KEY ="31077df27baad0f357c8faf9f90cc61f22794dad3686b41f5b82257dc4d81664"
module.exports = {
  solidity: "0.8.18",
  gas: 3000000,
  networks: {
    sepolia:{
      url:`https://sepolia.infura.io/v3/${SEPOLIA_API_KEY}`,
      accounts:[`0x${SEPOLIA_PRIVATE_KEY}`]
    }
  }
};