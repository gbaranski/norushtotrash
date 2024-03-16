import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import MCO2TokenModule from "./MCO2Token";

const NoRushToTrashModule = buildModule("NoRushToTrashModule", (m) => {
  const { token } = m.useModule(MCO2TokenModule);
  const noRushToTrash = m.contract("NoRushToTrash", [token]);
  return { noRushToTrash };
});

export default NoRushToTrashModule;
