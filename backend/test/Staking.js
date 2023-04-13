const { expect } = require("chai");
const Hardhat = require("hardhat");

describe("Staking Contract", () => {
  let Accounts, DeployedStaking, deployedZZ;

  beforeEach(async () => {
    Accounts = await ethers.getSigners(); // getting all accounts from ethers.getSigners() method
    const zz = await Hardhat.ethers.getContractFactory("zz"); //ByDefault it uses the 1st A/c as defa.
    deployedZZ = await zz.deploy(1000, { gasLimit: 3000000 });
    console.log("Contract is deployed to:", deployedZZ.address);

    const Stake = await Hardhat.ethers.getContractFactory("Staking");
    DeployedStaking = await Stake.deploy(deployedZZ.address);

    // Now we have to transfer 100 Token from manager to this staking contract so that staking contract should contribute to Reward Ratio.
    await deployedZZ.DirectTransfer(
      Accounts[0].address,
      DeployedStaking.address,
      100
    );
  });

  // 1: check the deployment of contract
  it("should deploy", async () => {
    // expect().to.equal();
    const bal = await deployedZZ.balanceOf(Accounts[0].address);
    console.log("Remaining balance of Owner:", bal);
    expect().to.equal();
  });

  //2: Staking some amount
  it("Staking the contract", async () => {
    await deployedZZ.DirectTransfer(
      Accounts[0].address,
      Accounts[1].address,
      100
    );
    await deployedZZ.connect(Accounts[1]).approve(DeployedStaking.address, 50); // Giving approval to contract

    await deployedZZ.DirectTransfer(
      Accounts[0].address,
      Accounts[2].address,
      100
    );
    await deployedZZ.connect(Accounts[2]).approve(DeployedStaking.address, 50); // Giving approval to contract

    await deployedZZ.DirectTransfer(
      Accounts[0].address,
      Accounts[3].address,
      100
    );
    await deployedZZ.connect(Accounts[3]).approve(DeployedStaking.address, 50); // Giving approval to contract

    await DeployedStaking.connect(Accounts[1]).staking(50); // Staking token
    await DeployedStaking.connect(Accounts[2]).staking(50);
    await DeployedStaking.connect(Accounts[3]).staking(50);

    expect(parseInt(await deployedZZ.balanceOf(Accounts[1].address))).to.equal(
      50
    );
    expect(parseInt(await deployedZZ.balanceOf(Accounts[2].address))).to.equal(
      50
    );
    expect(parseInt(await deployedZZ.balanceOf(Accounts[3].address))).to.equal(
      50
    );
  });

  // 3: Unstaking all amounts of user
  it("Unstaking all amounts of user", async () => {
    await deployedZZ.connect(Accounts[0]).approve(DeployedStaking.address, 500);
    await DeployedStaking.connect(Accounts[0]).staking(500);

    // console.log(deployedZZ.balanceOf(Accounts[0].address));
    expect(parseInt(await deployedZZ.balanceOf(Accounts[0].address))).to.equal(
      400
    );

    await DeployedStaking.connect(Accounts[0]).unStakeAll();
    console.log(await deployedZZ.balanceOf(Accounts[0].address));
    expect(parseInt(await deployedZZ.balanceOf(Accounts[0].address))).to.equal(
      1390
    );
  });
});
