import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import journal from './abi/journal.json';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import * as dotenv from "dotenv";
dotenv.config();




const CONTRACT_ADDRESS = '0xf4f242d0d8fe412394b1837569169E1Fa0620C7d';

const { chains, publicClient } = configureChains(
    [mainnet, polygon, optimism, arbitrum, sepolia],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'Crypto Gratitude Journal',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [gratitudeContract, setGratitudeContract] = useState(null);
  const [account, setAccount] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(0);

  // Initialize Web3Modal and load the provider
  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const newProvider = new ethers.providers.Web3Provider(connection);
    const newSigner = newProvider.getSigner();
    setProvider(newProvider);
    setSigner(newSigner);

    // Set user account
    const userAddress = await newSigner.getAddress();
    setAccount(userAddress);

    // Set up contract instance
    const gratitudeContractInstance = new ethers.Contract(CONTRACT_ADDRESS, GratitudeJournalABI.abi, newSigner);
    setGratitudeContract(gratitudeContractInstance);
  };

  // Submit gratitude note
  const writeGratitude = async () => {
    if (gratitudeContract && gratitude) {
      const tx = await gratitudeContract.writeGratitude(gratitude);
      await tx.wait(); // Wait for the transaction to be mined
      alert('Gratitude note saved!');
      setGratitude(''); // Clear input field after submission
    }
  };

  // Fetch user's gratitude streak
  const fetchStreak = async () => {
    if (gratitudeContract) {
      const userStreak = await gratitudeContract.getStreak(account);
      setStreak(userStreak);
    }
  };

  // Fetch user entries (for simplicity, we'll assume all entries are fetched at once)
  const fetchEntries = async () => {
    if (gratitudeContract) {
      // Replace with your logic to fetch all entries
      const entriesList = await gratitudeContract.getUserEntries(account);
      setEntries(entriesList);
    }
  };

  useEffect(() => {
    if (signer) {
      fetchStreak();
      fetchEntries();
    }
  }, [signer]);

  return (
    <div className="flex justify-center items-center h-screen">
        <div className='border-white bg-white shadow-md rounded-lg p-8  text-black'>
            <header>
                <h2 className='font-bold'>Crypto Gratitude Journal</h2>
                {!account && <button className='text-white' onClick={connectWallet}>Connect Wallet</button>}
                {account && <p>Connected as: {account}</p>}
            </header>

            {account && (
                <div>
                <h3>Write your daily gratitude</h3>
                <input
                    type="text"
                    value={gratitude}
                    onChange={(e) => setGratitude(e.target.value)}
                    placeholder="Enter gratitude note"
                />
                <button className='text-white' onClick={writeGratitude}>Submit</button>

                <h3>Your Streak: {streak} days</h3>

                <h3>Your Gratitude Entries</h3>
                <ul>
                    {entries.map((entry, index) => (
                    <li key={index}>{entry.note} (Date: {new Date(entry.date * 1000).toLocaleDateString()})</li>
                    ))}
                </ul>
                </div>
            )}
        </div>
    </div>
  );
}

export default App;