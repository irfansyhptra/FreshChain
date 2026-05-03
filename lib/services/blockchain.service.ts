import { ethers } from "ethers";

// Fallback to Sepolia or a generic testnet
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://rpc.sepolia.org";

/**
 * Returns a read-only provider to query blockchain state
 */
export const getProvider = () => {
    return new ethers.JsonRpcProvider(RPC_URL);
};

/**
 * Checks if a wallet is connected and returns the signer
 */
export const getSigner = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
        await (window as any).ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider((window as any).ethereum);
        return provider.getSigner();
    }
    throw new Error("No crypto wallet found. Please install MetaMask.");
};

// --- Backend Contract Integration (FreshChain) ---

const ABI = [
  "function addFarmer(string memory _name, string memory _location, string memory _product) public",
  "function getFarmer(uint index) public view returns (tuple(string name, string location, string product, uint timestamp))"
];

// Backend Wallet configuration
export const getBackendWallet = () => {
    const provider = getProvider();
    const privateKey = process.env.PRIVATE_KEY || "0x0000000000000000000000000000000000000000000000000000000000000000";
    return new ethers.Wallet(privateKey, provider);
};

export const getFreshChainContract = () => {
    const contractAddress = process.env.CONTRACT_ADDRESS || "0x0000000000000000000000000000000000000000";
    return new ethers.Contract(contractAddress, ABI, getBackendWallet());
};

export const addFarmerToBlockchain = async (name: string, location: string, product: string) => {
    const contract = getFreshChainContract();
    const tx = await contract.addFarmer(name, location, product);
    await tx.wait(); // Wait for transaction confirmation
    return tx.hash;
};

export const getFarmerFromBlockchain = async (index: number) => {
    const contract = getFreshChainContract();
    const data = await contract.getFarmer(index);
    return {
        name: data[0],
        location: data[1],
        product: data[2],
        timestamp: data[3].toString()
    };
};

