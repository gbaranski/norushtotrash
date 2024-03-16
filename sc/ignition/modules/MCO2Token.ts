import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { parseEther } from "viem";

import { config as dotenvConfig } from "dotenv";
dotenvConfig();

const INITIAL_SUPPLY: bigint = parseEther("1000000000");

const MCO2TokenModule = buildModule("MCO2TokenModule", (m) => {
  if (process.env.CO2_RECEIVER === undefined)
    throw new Error("CO2_RECEIVER is not defined");

  const token = m.contract("MCO2Token", [
    process.env.CO2_RECEIVER,
    INITIAL_SUPPLY,
  ]);
  return { token };
});

export default MCO2TokenModule;
