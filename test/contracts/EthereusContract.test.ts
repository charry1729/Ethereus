import { expect } from "chai";
import { ethers } from "hardhat";
import { EthereusContract } from "../../src/artifacts/src/contracts/EthereusContract.sol/EthereusContract";

describe("EthereusContract", function () {
  let contract: EthereusContract;
  let owner: any;
  let party1: any;
  let party2: any;
  let contractId: string;

  beforeEach(async function () {
    [owner, party1, party2] = await ethers.getSigners();
    const Contract = await ethers.getContractFactory("EthereusContract");
    contract = await Contract.deploy();

    const tx = await contract.createContract(
      "real-estate",
      "USA",
      "ipfs://contract-hash",
      [party1.address, party2.address],
      ["seller", "buyer"]
    );

    const receipt = await tx.wait();
    const event = receipt.events?.find(e => e.event === "ContractCreated");
    contractId = event?.args?.contractId;
  });

  describe("Contract Creation", function () {
    it("Should create a new contract", async function () {
      const details = await contract.getContractDetails(contractId);
      expect(details.contractType).to.equal("real-estate");
      expect(details.jurisdiction).to.equal("USA");
      expect(details.ipfsHash).to.equal("ipfs://contract-hash");
      expect(details.status).to.equal(0); // Draft status
    });

    it("Should fail if less than two parties", async function () {
      await expect(
        contract.createContract(
          "real-estate",
          "USA",
          "ipfs://contract-hash",
          [party1.address],
          ["seller"]
        )
      ).to.be.revertedWith("Minimum two parties required");
    });
  });

  describe("Contract Signing", function () {
    it("Should allow parties to sign", async function () {
      await contract.connect(party1).signContract(contractId);
      let partyDetails = await contract.getPartyDetails(contractId, party1.address);
      expect(partyDetails.signatureStatus).to.equal(1); // Signed status

      await contract.connect(party2).signContract(contractId);
      partyDetails = await contract.getPartyDetails(contractId, party2.address);
      expect(partyDetails.signatureStatus).to.equal(1);

      const details = await contract.getContractDetails(contractId);
      expect(details.status).to.equal(1); // Active status
    });

    it("Should fail if non-party tries to sign", async function () {
      const [,,nonParty] = await ethers.getSigners();
      await expect(
        contract.connect(nonParty).signContract(contractId)
      ).to.be.revertedWith("Not a party to this contract");
    });
  });

  describe("Terms Management", function () {
    it("Should add terms to contract", async function () {
      await contract.addTerm(
        contractId,
        "price",
        "The purchase price is $1,000,000"
      );

      const [termKeys, termContents] = await contract.getTerms(contractId);
      expect(termKeys.length).to.equal(1);
      expect(termContents[0]).to.equal("The purchase price is $1,000,000");
    });

    it("Should fail to add terms to active contract", async function () {
      await contract.connect(party1).signContract(contractId);
      await contract.connect(party2).signContract(contractId);

      await expect(
        contract.addTerm(
          contractId,
          "price",
          "The purchase price is $1,000,000"
        )
      ).to.be.revertedWith("Contract not in draft status");
    });
  });
});