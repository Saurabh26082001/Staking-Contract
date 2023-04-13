// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 < 0.9.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Izz.sol";
import "hardhat/console.sol";

contract zz is ERC20, Izz{
    constructor(uint256 initialSupply) ERC20("Hello","HEL"){
        _mint(msg.sender, initialSupply);
    }
    function mint(address to, uint256 amount) external {
        _mint(to,amount);
    }
    function TransferFrom(address from, address to, uint256 amount) external {
        transferFrom(from, to, amount);
    }
    function DirectTransfer(address from, address to, uint256 amount) external {
        _transfer(from, to, amount);
    }
}
// 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
// 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
// 0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB