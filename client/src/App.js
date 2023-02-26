import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { ABI } from './ABI'
import { Form } from 'react-bootstrap';
import { MetaDataForm, MintDateForm } from "./components";
import { convertToSolidityDate } from './Helper';

function App() {
  // address of deployed smart contract
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

  const [balance, setBalance] = useState(0);
  const [isMintEnabled, setIsMintEnabled] = useState(false);

  // for dev, window.ethereum is metamask
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const getBalance = async () => {
    const balance = await provider.getBalance('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
    const balanceFormatted = ethers.utils.formatEther(balance);
    setBalance(balanceFormatted);
  }

  const getIsMintEnabled = async () => {
    const isMintEnabled = await contract.isMintEnabled();
    console.log("isMintEnabled", isMintEnabled);
    setIsMintEnabled(isMintEnabled);
  }

  const toggleIsMintEnabled = async (e) => {
    const tx = await contract.toggleIsMintEnabled();
    await tx.wait();
    refreshVariables();
  }

  const refreshVariables = () => {
    console.log("refreshVariables...")
    getBalance().catch(console.error);
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
      console.log("metadata path", metadataUri);

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
          <div className="col" style={{ marginRight: 20, borderRightStyle: "solid", borderWidth: "thin" }}>
            <div style={{ paddingBottom: 10 }}>Balance: {balance}</div>
            <MintDateForm handleSubmit={handleSubmitMintDate} />
            <Form.Group className="mb-3 mt-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Enable Mint" onChange={toggleIsMintEnabled} checked={isMintEnabled} />
            </Form.Group>
          </div>
          <div className="col">
            <MetaDataForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
