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
