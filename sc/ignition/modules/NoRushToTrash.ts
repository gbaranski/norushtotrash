import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import CarbonTokenModule from "./CarbonToken";

const NoRushToTrashModule = buildModule("NoRushToTrashModule", (m) => {
  const { token } = m.useModule(CarbonTokenModule);
  const noRushToTrash = m.contract("NoRushToTrash", [token]);
  return { noRushToTrash };
});

export default NoRushToTrashModule;
