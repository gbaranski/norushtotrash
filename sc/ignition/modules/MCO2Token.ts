import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INITIAL_SUPPLY: bigint = parseEther("1000000000");

const MCO2TokenModule = buildModule("MCO2TokenModule", (m) => {
  const token = m.contract("MCO2Token", [INITIAL_SUPPLY]);
  return { token }
});

export default MCO2TokenModule;
