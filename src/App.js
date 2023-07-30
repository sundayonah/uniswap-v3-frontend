import { useEffect, useState } from 'react';
import './App.css';
import { ethers } from 'ethers';
import PageButton from './components/PageButton';
import ConnectButton from './components/ConnectButton';

function App() {
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);

  useEffect(() => {
       const onLoad = async () => {
        const provider = await new ethers.providers.Web3Provider(window.ethereum)
       }
       onLoad()
  }, []);

const getSigner = async provider => {
  provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  setSigner(signer);
}

//check if wallet is connected
const isConnected = () => signer !== undefined;
const getWalletAddress = () => {
  signer.getAddress()
   .then(address => {
      setSignerAddress(address)

      //todo: connect weth and uni contracts address
   })
}

if (signer !== undefined) {
  getWalletAddress()
}

  return (
    <div className="App">
      <div className='appNav'>
        <div className='my-2 buttonContainer buttonContainerTop'>
          <PageButton name={"Swap"} isBold={true} />
          <PageButton name={"Pool"} />
          <PageButton name={"Vote"} />
          <PageButton name={"Charts"} />
        </div>
        <div className='rightNav'>
          <div className='connectButtonContainer'>
             <ConnectButton
             provider={provider}
             isConnected={isConnected}
             signerAddress={signerAddress}
             getSigner={getSigner}
             />
          </div>
          <div className='my-2 buttonContainer'>
          <PageButton name={"..."} />
             
          </div>
        </div>
       </div>
    </div>
  );
}

export default App;
