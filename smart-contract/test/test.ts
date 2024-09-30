import {
    time,
    loadFixture,
  } from "@nomicfoundation/hardhat-toolbox/network-helpers";
  import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
  import { expect } from "chai";
  import  { ethers } from "hardhat";

  describe("CryptoGratitudeJournal", function () {
   
  
    async function deployOneYearLockFixture() {
        
        const NFT = await ethers.getContractFactory("SimpleNFT");
        const nft = await NFT.deploy();

      const [owner, otherAccount] = await ethers.getSigners();
      const CryptoGratitudeJournal = await ethers.getContractFactory("CryptoGratitudeJournal");
      const cryptoGratitudeJournal = await CryptoGratitudeJournal.deploy();

      
      

      return { owner, otherAccount, cryptoGratitudeJournal, nft };
    }

    describe("Deployment", function () {
      it("Should deploy the contract and set the right owner", async function () {
        const { owner, cryptoGratitudeJournal } = await loadFixture(deployOneYearLockFixture);

        // Remove the line referencing 'lock' as it's not defined in this context
 
        // Fix the syntax for checking the owner of cryptoGratitudeJournal

        expect(await cryptoGratitudeJournal.ownerOf).to.equal(owner.address);
      });
    });

    // describe("Journal Entries", function () {
    //   it("Should allow the owner to add a journal entry", async function () {
    //     const { owner, cryptoGratitudeJournal } = await loadFixture(deployOneYearLockFixture);
    //     const entry = "I am grateful for my family.";
    //     await cryptoGratitudeJournal.addEntry(entry);
    //     const storedEntry = await cryptoGratitudeJournal.entries(0);
    //     expect(storedEntry).to.equal(entry);
    //   });

    //   it("Should not allow non-owners to add a journal entry", async function () {
    //     const { otherAccount, cryptoGratitudeJournal } = await loadFixture(deployOneYearLockFixture);
    //     const entry = "I am grateful for my friends.";
    //     await expect(cryptoGratitudeJournal.connect(otherAccount).addEntry(entry)).to.be.revertedWith("Ownable: caller is not the owner");
    //   });
    // });
  });
