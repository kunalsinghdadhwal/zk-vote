import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PrivateVotingModule = buildModule("PrivateVotingModule", (m) => {
  const privateVoting = m.contract("PrivateVoting");
  return { privateVoting };
});

export default PrivateVotingModule;
