import axios from "axios";

// Create axios instance with default config
const api = axios.create({
    baseURL: "http://localhost:3000", // Your NestJS server URL
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Important for CORS with credentials
});

// Escrow API functions
export const escrowApi = {
    fundEscrow: async (data: { amount: string; currency: string }) => {
        const response = await api.post("/escrow/fund", data);
        return response.data;
    },
};

// Transaction API functions
export const transactionApi = {
    createTransaction: async (data: {
        transaction_id: string;
        business_partner: string;
        product_name: string;
        quantity: string;
        price: string;
    }) => {
        const response = await api.post("/transaction/create", data);
        return response.data;
    },
    getAllTransactions: async () => {
        const response = await api.get("/transaction/get_transactions");
        return response.data;
    },
    // Mocked document upload function - doesn't make actual API calls
    uploadDocument: async (transactionId: string, file: File) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock successful response
        return {
            success: true,
            documentId: Math.random().toString(36).substring(7),
            fileName: file.name,
            uploadedAt: new Date().toISOString(),
        };
    },
    // Mocked document verification function
    verifyDocument: async (transactionId: string, documentId: string) => {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        return {
            success: true,
            status: "verified",
            verifiedAt: new Date().toISOString(),
        };
    },
};

// Multisig API functions
export const multisigApi = {
    multiSigPayment: async () => {
        const response = await api.post("/multisig/sign");
        return response.data;
    }
}