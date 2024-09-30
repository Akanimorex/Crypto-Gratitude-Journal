import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";





const TokenModule = buildModule("CryptoGratitudeJournal", (m) => {


  const journalContract = m.contract("CryptoGratitudeJournal");

  return { journalContract };
});

export default TokenModule;
