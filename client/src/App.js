import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI } from './util/ABI'
import { Form } from 'react-bootstrap';
import { MetaDataForm, MintDateForm, NFTImage } from "./components";
import { convertToSolidityDate } from './util/Helper';

function App() {
  // address of deployed smart contract
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const [tokenUri, setTokenUri] = useState("");
  const [isMintEnabled, setIsMintEnabled] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const getIsMintEnabled = async () => {
    const isMintEnabled = await contract.isMintEnabled();
    setIsMintEnabled(isMintEnabled);
  }

  const toggleIsMintEnabled = async (e) => {
    try {
      const tx = await contract.toggleIsMintEnabled();
      await tx.wait();
    } catch (err) {
      console.log("err", err);
      alert(err.reason);
    }

    refreshVariables();
  }

  const refreshVariables = () => {
    getIsMintEnabled().catch(console.error);
  }

  useEffect(() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []);
    }
    connectWallet().catch(console.error);
    refreshVariables();
  });

  const handleSubmit = async (tokenUri) => {
    try {
      console.log("handleSubmit with tokenUri", tokenUri);
      const tx = await contract.mintNFT(tokenUri);
      await tx.wait();

      const totalSupply = await contract.totalSupply();
      const tokenId = totalSupply.toString();
      const metadataUri = await contract.tokenURI(tokenId);

      setTokenUri(metadataUri);
      refreshVariables();

    } catch (err) {
      console.log("err", err);
      alert(err.reason);
    }
  }

  const handleSubmitMintDate = async (startDate, endDate) => {
    const sDate = convertToSolidityDate(startDate);
    const eDate = convertToSolidityDate(endDate);

    try {
      const tx = await contract.setMintWindow(sDate, eDate);
      await tx.wait();
    }
    catch (err) {
      console.log("err", err);
      alert(err.reason);
    }
  }

  return (
    <div className="container">
      <div className="container">
        <div className="row mt-5">
          <div className="col" style={{ marginRight: 20, marginBottom: 20, paddingRight: 40, borderRightStyle: "solid", borderWidth: "thin" }}>
            <div style={{ paddingBottom: 10 }}>
              <h3>Owner functions</h3>
            </div>
            <MintDateForm handleSubmit={handleSubmitMintDate} />
            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Enable Mint" onChange={toggleIsMintEnabled} checked={isMintEnabled} />
            </Form.Group>
          </div>
          <div className="col">
            <div style={{ paddingBottom: 10 }}>
              <h3>Mint NFT</h3>
            </div>
            <MetaDataForm handleSubmit={handleSubmit} />
            <NFTImage tokenUri={tokenUri}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
