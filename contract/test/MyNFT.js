const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
    it("Set isMintEnabled to true. Provide a tokenUri to mintNFT. tokenURI for the tokenId is equals to provided tokenUri", async function () {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        const toggleIsMintEnabledTx = await myNFT.toggleIsMintEnabled();
        await toggleIsMintEnabledTx.wait();

        const tokenUri = "https://gateway.pinata.cloud/ipfs/QmXJd4rNQ5qQWQDQoeXBdQofv7aVbaBGTzCEXL3g1gC42k/bulbasaur.json";
        
        const mintTx = await myNFT.mintNFT(tokenUri);
        await mintTx.wait();

        const totalSupply = await myNFT.totalSupply();
        const tokenId = totalSupply.toString();

        const metadataUri = await myNFT.tokenURI(tokenId);
        expect(metadataUri).to.equal(tokenUri);
    });
});


