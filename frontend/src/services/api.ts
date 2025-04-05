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
