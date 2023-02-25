const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyNFT", function () {

    it("isMintEnabled is defaulted to false. It should be true once toggleIsMintEnabled is called", async function () {
        const MyNFT = await ethers.getContractFactory("MyNFT");
        const myNFT = await MyNFT.deploy();
        await myNFT.deployed();

        expect(await myNFT.isMintEnabled()).to.be.false;

        const toggleIsMintEnabledTx = await myNFT.toggleIsMintEnabled();
        await toggleIsMintEnabledTx.wait();
        expect(await myNFT.isMintEnabled()).to.be.true;
    });
});


