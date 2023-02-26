// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
      RC721URIStorage is a newer extension of the ERC721 standard that adds a built-in way to store and retrieve metadata associated with each token. This means that the URI (Uniform Resource Identifier) of the metadata for each token is stored on-chain (instead of storing it on a IPFS node services like Pinata), allowing for easier access and retrieval of this data. This means that ERC721URIStorage can simplify the process of managing NFT metadata by removing the need for a separate off-chain storage solution. However, this added functionality comes at the cost of increased gas usage and complexity in the smart contract code.
    */

contract MyNFT is ERC721URIStorage, Ownable {
    bool public isMintEnabled; // defaults to false
    uint256 public mintedCount = 0;
    uint256 public mintPrice = 1 ether;
    uint256 public totalSupply;
    uint256 public maxSupply; // set as 5 when deployed. can be modified via setMaxSupply()
    mapping(address => bool) private _mintedWallets;

    uint256 public mintWindowStart = 1645862400; // 2023-02-26
    uint256 public mintWindowEnd = 1678406400; // 2023-03-10

    // Limit to contract to only mint 5 NFT
    constructor() ERC721("MyNFT", "MNFT") {
        maxSupply = 5;
    }

    // To ensure the mintNFT function is secure, it is declared as external so that no other functions has access/modify the miniting protocols.
    function mintNFT(string memory tokenUri)
        external
        payable
        returns (uint256)
    {
        require(block.timestamp >= mintWindowStart && block.timestamp <= mintWindowEnd, "Minting window is closed");
        require(isMintEnabled, "Minting is not enabled");
        require(!_mintedWallets[msg.sender], "Already minted an NFT");
        // require(msg.value == mintPrice, "Wrong value");
        require(maxSupply > totalSupply, "Sold out");

        _mintedWallets[msg.sender] = true;
        totalSupply++;

        // mint NFT
        uint256 tokenId = totalSupply;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenUri);

        return tokenId;
    }

    // Ownable is a contract in the OpenZeppelin library. The Ownable contract defines a modifier called onlyOwner, which can be added to functions to restrict access to only the contract owner. The owner is the person who deploys the contract. As such  only the owner is able to toggle isMintEnabled. External functions are the type of functions that are part of the contract but can only be used externally and called outside the contract by the other contracts. Thus, no other functions in this contract can invoke the toggleIsMintEnables function.
    function toggleIsMintEnabled() external onlyOwner {
        isMintEnabled = !isMintEnabled;
    }

    // Only the owner can modify the max supply of NFT to mint
    function setMaxSupply(uint256 maxSupply_) external onlyOwner {
        maxSupply = maxSupply_;
    }

      function setMintWindowStart(uint256 startDate) external onlyOwner {
        mintWindowStart = startDate;
    }

    function setMintWindowEnd(uint256 endDate) external onlyOwner {
        mintWindowEnd = endDate;
    }

    function setMintWindow(uint256 startDate, uint256 endDate) external onlyOwner {
        mintWindowStart = startDate;
        mintWindowEnd = endDate;
    }
}
