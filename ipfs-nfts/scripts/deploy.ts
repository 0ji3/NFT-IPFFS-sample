import { ethers } from "hardhat";

const main = async () => {
  const nftContractFactory = await ethers.getContractFactory("Web3Mint");
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  console.log("Contract deployed to:", nftContract.address);

  // makeAnEpicNFT関数を呼び出す。NFTがMintされる
  let txn = await nftContract.makeAnEpicNFT();
  // Mintingが仮想マイナーにより、承認されるのを待つ
  await txn.wait();
  // makeAnEpicNFT関数をまた呼び出す。NFTがまたMintされる
  txn = await nftContract.makeAnEpicNFT();
  // Mintingが仮想マイナーにより、承認されるのを待つ
  await txn.wait();
};
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
