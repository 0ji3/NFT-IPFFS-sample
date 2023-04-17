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
            const name0 = "test0";
            const name1 = "test1";

            const description0 = "An epic NFT";
            const description1 = "An epic test";

            const ipfsCID0 = "bafybeihfkuzfnaxlniwgwuxc7qbj3rwz3e3vm422esiv27lye6iwubv6ry";
            const ipfsCID1 = "bafybeihfkuzfnaxlniwgwuxc7qbj3rwz3e3vm422esiv27lye6iwubv6ry";

            const txn0 = web3Mint.mintIpfsNFT(name0, description0, ipfsCID0);
            const txn1 = web3Mint.mintIpfsNFT(name1, description1, ipfsCID1);

            // １つ目のテスト
            const tokenURI0 = await web3Mint.tokenURI(0);
            const b64result0 = tokenURI0.replace("data:application/json;base64,", "");

            const strResult0 = Buffer.from(b64result0, "base64").toString();
            const nftData0 = JSON.parse(strResult0);
            console.log(nftData0);
            expect(nftData0.name).to.equal('test0 -- NFT #: 0');
            expect(nftData0.description).to.equal('An epic NFT');
            expect(nftData0.image).to.equal('ipfs://bafybeihfkuzfnaxlniwgwuxc7qbj3rwz3e3vm422esiv27lye6iwubv6ry');

            // ２つ目のテスト
            const tokenURI1 = await web3Mint.tokenURI(1);
            const b64result1 = tokenURI1.replace("data:application/json;base64,", "");
            
            const strResult1 = Buffer.from(b64result1, "base64").toString();
            const nftData1 = JSON.parse(strResult1);
            console.log(nftData1);
            expect(nftData1.name).to.equal('test1 -- NFT #: 1');
            expect(nftData1.description).to.equal('An epic test');
            expect(nftData1.image).to.equal('ipfs://bafybeihfkuzfnaxlniwgwuxc7qbj3rwz3e3vm422esiv27lye6iwubv6ry');
        });
    });
});