import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

const INITIAL_SUPPLY: bigint = parseEther("1000000000");

const CarbonTokenModule = buildModule("CarbonTokenModule", (m) => {
  const token = m.contract("CarbonToken", [INITIAL_SUPPLY]);
  return { token }
});

export default CarbonTokenModule;
