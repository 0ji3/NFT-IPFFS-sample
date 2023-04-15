import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { ethers } from 'hardhat';
import { expect } from 'chai';

describe("Web3Mint", function() {
    async function deployFixture() {
        const [deployer, player1] = await ethers.getSigners();
        const Web3Mint = await ethers.getContractFactory("Web3Mint");
        const web3Mint = await Web3Mint.deploy();

        return { web3Mint, deployer, player1 };
    }

    describe("Deployment", function() {
        it("deploy", async function () {
            const { web3Mint } = await loadFixture(deployFixture);
            console.log(web3Mint.address);
        });
    });

    describe("Mint", function() {
        it("Can mint NFT", async function() {
            const { web3Mint } = await loadFixture(deployFixture);  
            const txn = web3Mint.makeAnEpicNFT();
            const result = await web3Mint.tokenURI(0);
            console.log(result);
            expect(result).to.equal("https://jsonkeeper.com/b/5DN1");  
        });
    });
});