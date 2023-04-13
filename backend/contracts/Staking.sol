// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;
import "./zz.sol";

contract Staking {
    Izz public zzToken;
    address public manager;
    mapping(address => uint256) stake;
    mapping(address => uint256) timeStamp;
    uint256 ROI = 2;
    uint256 amountSpend;
    uint256 actualAmount;

    constructor(address token){
        zzToken = Izz(token);
        manager = msg.sender;
        // zzToken.DirectTransfer(address(this), msg.sender, 1);
        actualAmount += 100;
        amountSpend += 100;
    }
    function staking(uint256 amt) public {
        // require(amt >= 0.01 ether);
        zzToken.TransferFrom(msg.sender, address(this), amt);
        amountSpend += amt;
        amt -= amt/100; // transaction fee 1%
        actualAmount += amt;

        stake[msg.sender] += amt;
        timeStamp[msg.sender] = block.timestamp;
    }

    function Mint(uint256 amount, address to) private {
        zzToken.mint(to, amount);
    }

    function unStakeAll() public{
        require(stake[msg.sender] != 0,"User must stake some amount");

        //.................. reward based on time ......................
        // uint256 duration = block.timestamp - timeStamp[msg.sender];
        // if(duration >= 2592000) { // if duration is greater than one month then only we give reward
        //     uint256 dur = duration / 2592000;
        //     reward = userAmount/100 * ROI * dur; // calculating reward
        // }

        // ................reward based on ratio ...................
        uint256 userAmount = stake[msg.sender];
        uint256 ratio = amountSpend / actualAmount;
        uint256 reward = userAmount * ratio;
        Mint(reward, msg.sender);
        zzToken.DirectTransfer(address(this), msg.sender, userAmount);
        delete(stake[msg.sender]);
    }
}