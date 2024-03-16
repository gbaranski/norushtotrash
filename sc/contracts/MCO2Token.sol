// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MCO2Token is ERC20 {
    constructor(address receiver, uint256 initialSupply) ERC20("Moss Carbon Credit ", "CO2") {
        _mint(receiver, initialSupply);
    }
}