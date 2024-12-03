import { expect } from "chai";
import { ethers } from "hardhat";
import { EthereusToken } from "../../src/artifacts/src/contracts/EthereusToken.sol/EthereusToken";

describe("EthereusToken", function () {
  let token: EthereusToken;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("EthereusToken");
    token = await Token.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await token.hasRole(await token.DEFAULT_ADMIN_ROLE(), owner.address)).to.equal(true);
    });

    it("Should grant the minter role to owner", async function () {
      expect(await token.hasRole(await token.MINTER_ROLE(), owner.address)).to.equal(true);
    });
  });

  describe("Minting", function () {
    it("Should mint a new asset", async function () {
      const tx = await token.mintAsset(
        addr1.address,
        "ipfs://asset-uri",
        "real-estate",
        "USA",
        ethers.parseEther("1000000")
      );

      await tx.wait();
      expect(await token.balanceOf(addr1.address)).to.equal(1n);

      const assetDetails = await token.getAssetDetails(0);
      expect(assetDetails.assetType).to.equal("real-estate");
      expect(assetDetails.jurisdiction).to.equal("USA");
      expect(assetDetails.value).to.equal(ethers.parseEther("1000000"));
      expect(assetDetails.uri).to.equal("ipfs://asset-uri");
    });

    it("Should fail if non-minter tries to mint", async function () {
      await expect(
        token.connect(addr1).mintAsset(
          addr2.address,
          "ipfs://asset-uri",
          "real-estate",
          "USA",
          ethers.parseEther("1000000")
        )
      ).to.be.revertedWith(/AccessControl: account .* is missing role .*/);
    });
  });

  describe("Asset Management", function () {
    beforeEach(async function () {
      await token.mintAsset(
        addr1.address,
        "ipfs://asset-uri",
        "real-estate",
        "USA",
        ethers.parseEther("1000000")
      );
    });

    it("Should update asset value", async function () {
      await token.updateAssetValue(0, ethers.parseEther("1500000"));
      const assetDetails = await token.getAssetDetails(0);
      expect(assetDetails.value).to.equal(ethers.parseEther("1500000"));
    });

    it("Should fail to update non-existent asset", async function () {
      await expect(
        token.updateAssetValue(99, ethers.parseEther("1000000"))
      ).to.be.revertedWith("Asset does not exist");
    });
  });
});