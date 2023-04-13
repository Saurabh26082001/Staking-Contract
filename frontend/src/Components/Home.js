import React, { useState, useEffect } from "react";
import Staking from "./Staking";
import ERC20 from "./zz";
import web3 from "./Web3.js";

const Home = () => {
  const [manager, setManager] = useState();
  const [valueApprove, setValueAprove] = useState("");
  const [valueStake, setValueStake] = useState("");

  useEffect(()=> {
    console.warn("Hello world!");
    const fetchData = async () => {
      const managerTemp = await Staking.methods.manager().call();
      setManager(managerTemp);
      console.log(await ERC20.methods.name().call());
    }
    fetchData();
  }, []);

  const handleStake = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await Staking.methods.staking(valueStake).send({
      from: accounts[0]
    }).then(()=>{console.log("Staking success")})
      .catch(()=>{console.log("Staking failure")});

    setValueStake("");
    console.log(await ERC20.methods.balanceOf(Staking._address).call(),"....");
  };

  const UnstakeAmount = async (e) => {
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    await Staking.methods.unStakeAll().send({
      from:accounts[0]
     }).then(()=>{console.log("Unstaking successful")})
       .catch(()=>{console.log("Unstaking Unsuccessful")})
  };

  const handleApprove = async(e)=>{
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    await ERC20.methods.approve(Staking._address, valueApprove).send({
      from: accounts[0]
    }).then(()=>{console.log("Successfully approved")})
      .catch(()=>{console.log("Failed to approve")});
    setValueAprove("");

    console.log(await ERC20.methods.balanceOf(Staking._address).call(),".....");
  }

  return (
    <div className="container-md">
      <div className="container">
        <h2>Staking Contract</h2>
        <p>This contract is deployed by: {manager}</p>
        <hr></hr>
        <div>
          <form >
            <h5>Want to Stake some money??</h5>
            <input
              type="number"
              placeholder="Enter the amount of Tokens"
              value={valueApprove}
              onChange={(e) => setValueAprove(e.target.value)}
            />
            <button onClick={handleApprove}>Approve</button>
            <hr/>
            <input
              type="number"
              placeholder="Enter the amount of Tokens"
              value={valueStake}
              onChange={(e) => setValueStake(e.target.value)}
            />
            <button onClick={handleStake}>Stake</button>
          </form>
        </div>
        <hr />
        <h4>Unstake all money</h4>
        <button onClick={UnstakeAmount}>Unstake All Money</button>
        <hr />
        <h3>{}</h3>
      </div>
    </div>
  );
};
// This contract is managed by {this.state.manager}. There are currently{" "}
// {this.state.players.length} people entered, competing to win{" "}
// {web3.utils.fromWei(this.state.balance, "ether")} ether!
export default Home;
























// import Lottery from "./Lottery";
// import web3 from "./Web3";

// const Home = () => {
//   const [manager, setManager] = useState("");
//   const [players, setPlayers] = useState([]);
//   const [balance, setBalance] = useState("");
//   const [value, setValue] = useState("");
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     const fetchData = async ()=>{
//       const manager = await Lottery.methods.manager().call();
//       const players = await Lottery.methods.getPlayers().call();
//       const balance = await web3.eth.getBalance(Lottery.options.address);

//       const tem = await Lottery.methods.manager().call();
//       console.log(tem,"............");

//       setManager(manager);
//       setPlayers(players);
//       setBalance(balance);
//     }
//      fetchData();
//   }, []);


//   // console.log(manager,"........MANAGER.............");
//   // console.log(players,"........PLAYERS.............");
//   // console.log(balance,"........BALANCE.............");

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const accounts = await web3.eth.getAccounts();

//     setMessage("Waiting on transaction success...");

//     await Lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei(value, "ether"),
//     });
//     console.log(accounts[0]);

//     setMessage("You have been entered!");
//   };

//   const pickWin = async () => {

//     const accounts = await web3.eth.getAccounts();

//     setMessage("Waiting for transaction to success...");

//     await Lottery.methods.pickWinner().send({
//       from: accounts[0]
//     });

//     setMessage( "A Winner is Picked!!1!!!" );
//   };

//   return (
//     <div className="container-md">
//       <div className="container">
//         <h2>Lottery Contract</h2>
//         <p>This contract is managed by: {manager}</p>
//         <p>Total number of players is: {players.length}</p>
//         <p>Total Wining amount is: {web3.utils.fromWei(balance, "ether")}</p>
//         <hr></hr>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <h5>Want to bet some money??</h5>
//             <input
//               type="number"
//               placeholder="Enter the amount of Ethereum"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//             />
//             <button>Bet</button>
//           </form>
//         </div>
//         <hr />
//         <h4>Ready to pick a Winner!</h4>
//         <button onClick={pickWin}>Pick a Winner</button>
//         <hr />
//         <h3>{message}</h3>
//       </div>
//     </div>
//   );
// };
// // This contract is managed by {this.state.manager}. There are currently{" "}
// // {this.state.players.length} people entered, competing to win{" "}
// // {web3.utils.fromWei(this.state.balance, "ether")} ether!
// export default Home;//
