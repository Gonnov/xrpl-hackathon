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
    }
};