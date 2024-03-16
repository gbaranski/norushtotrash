import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'

const config: HardhatUserConfig = {
  solidity: "0.8.24",
};

export default config;
