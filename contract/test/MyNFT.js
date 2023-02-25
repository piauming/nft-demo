const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {
    it("Set isMintEnabled to true. mintNFT should return metadata.imageURI = https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE", async function () {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        const toggleIsMintEnabledTx = await myNFT.toggleIsMintEnabled();
        await toggleIsMintEnabledTx.wait();

        const metadata = {
            name: "Hello Strawberry",
            description: "Strawberry in Space",
            imageURI: "https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE"
        };
        
        const mintTx = await myNFT.mintNFT(metadata);
        await mintTx.wait();

        const totalSupply = await myNFT.totalSupply();
        const tokenId = totalSupply.toString();

        const result = await myNFT.getNFTMetadata(tokenId);
        expect(result.imageURI).to.equal("https://ipfs.io/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE");
    });
});


