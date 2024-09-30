Here’s the README in proper markdown format:

---

# Crypto Gratitude Journal

**Crypto Gratitude Journal** is a decentralized application (dApp) where users can write and store daily gratitude notes on the blockchain. The platform tracks users' gratitude streaks and allows them to view their past entries. Users can also mint their best entries as NFTs to preserve special moments of gratitude forever.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contract Deployment](#contract-deployment)
- [Running the Frontend](#running-the-frontend)
- [Demo](#demo)
- [License](#license)

## Features
- **Daily Gratitude Submission**: Users can submit a daily gratitude note that is stored on the Scroll chain.
- **Gratitude Streak**: Users' daily entries are tracked, and a streak is displayed to encourage consistency.
- **View Past Entries**: Users can see their previous gratitude notes, with details like submission date.
- **NFT Minting**: Users can mint their best entries as NFTs and store them in their wallets.

## Tech Stack
- **Frontend**: ReactJS, TypeScript, TailwindCSS
- **Blockchain**: Solidity, Scroll
- **Wallet Interaction**: Ethers.js, Web3Modal
- **Alchemy RPC**: Used to connect and interact with the Scroll chain.

## Getting Started

### Prerequisites
- Node.js and npm installed on your machine.
- A wallet like MetaMask to connect to the dApp.
- Alchemy API key for Scroll RPC.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Akanimorex/Crypto-Gratitude-Journal.git
   cd crypto-gratitude-journal
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of the project and add your **Alchemy API key**.

   ```bash
   REACT_APP_ALCHEMY_API_URL=https://scroll.alchemyapi.io/v2/your-api-key
   ```

## Contract Deployment

1. Deploy the Solidity smart contract to the Scroll testnet using Hardhat, Remix, or your preferred tool.
2. Replace the contract address in `src/App.tsx`:

   ```typescript
   const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';
   ```

3. Ensure you have the correct **Alchemy RPC URL** for Scroll configured in your smart contract deployment configuration (such as `hardhat.config.js`).

## Running the Frontend

1. Start the development server:

   ```bash
   npm start
   ```

2. Open the dApp in your browser:

   ```bash
   http://localhost:3000
   ```

3. Connect your MetaMask wallet and start writing gratitude notes!

## Demo

- [Insert a link to the project demo video]

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This version is structured and formatted correctly for a README file, suitable for your project repository on GitHub.
