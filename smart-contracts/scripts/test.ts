import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import hre, { ethers } from "hardhat";
  
  

  
  
  
  
  describe("CryptoGratitudeJournal", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
  
    const quorum = 5;
    const trxID = 0;
  
  
  
    async function deployOneYearLockFixture() {
  
    //   const AkanToken = await hre.ethers.getContractFactory("REX");
    //   const token = await AkanToken.deploy();
    
      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await hre.ethers.getSigners();
  
  
      const CryptoGratitudeJournal = await hre.ethers.getContractFactory("CryptoGratitudeJournal");
      const cryptoGratitudeJournal = await CryptoGratitudeJournal.deploy();
  
    
  
      return { owner, otherAccount, cryptoGratitudeJournal };
    }

    describe("Deployment", function () {
  
   
  
  

    
  
  });
  