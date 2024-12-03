import { ethers } from "hardhat";

async function main() {
  // Deploy EthereusToken
  const Token = await ethers.getContractFactory("EthereusToken");
  const token = await Token.deploy();
  await token.deployed();
  console.log("EthereusToken deployed to:", token.address);

  // Deploy EthereusContract
  const Contract = await ethers.getContractFactory("EthereusContract");
  const contract = await Contract.deploy();
  await contract.deployed();
  console.log("EthereusContract deployed to:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});