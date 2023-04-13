async function main() {
  const Accounts = await ethers.getSigners();

  const zzFile = await ethers.getContractFactory("zz");
  const stakeFile = await ethers.getContractFactory("Staking");

  const dzz = await zzFile.deploy(100);
  const dstaking = await stakeFile.deploy(dzz.address);

  console.log("ERC20 Instance is deployed at:", dzz.address);
  console.log("Contract is deployed at:", dstaking.address);
  // console.log(dstaking);
}
// ERC20 Instance is deployed at: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// Contract is deployed at: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
main()
  .then(()=>{process.exit(0)})
  .catch((error)=>{
    console.error("Error", error);
    process.exit(1);
  })

// // We require the Hardhat Runtime Environment explicitly here. This is optional
// // but useful for running the script in a standalone fashion through `node <script>`.
// //
// // You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// // will compile your contracts, add the Hardhat Runtime Environment's members to the
// // global scope, and execute the script.
// const hre = require("hardhat");

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = hre.ethers.utils.parseEther("0.001");

//   const Lock = await hre.ethers.getContractFactory("Lock");
//   const lock = await Lock.deploy(unlockTime, { value: lockedAmount });

//   await lock.deployed();

//   console.log(
//     `Lock with ${ethers.utils.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.address}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
