import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DocumentUpload } from "@/components/DocumentUpload";
import { transactionApi } from "@/services/api";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { useTransactionDocumentStore } from "@/stores/useTransactionDocumentStore";

interface Transaction {
    transaction_id: string;
    product_name: string;
    quantity: string;
    price: string;
    status: "pending" | "completed";
}

export const SellerTransactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<
        string | null
    >(null);
    const { getDocuments, isTransactionValidated } =
        useTransactionDocumentStore();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await transactionApi.getAllTransactions();
                setTransactions(data || []);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions();
    }, []);

    const handleTransactionSelect = (transactionId: string) => {
        setSelectedTransaction(
            selectedTransaction === transactionId ? null : transactionId
        );
    };

    const getTransactionStatus = (transaction: Transaction) => {
        const isValidated = isTransactionValidated(transaction.transaction_id);
        if (isValidated) {
            return "completed";
        }
        return transaction.status;
    };

    return (
        <div className="h-screen flex flex-col">
            <HeaderSection />

            <div className="flex flex-1 overflow-hidden">
                <NavigationSidebarSection />

                <main className="flex-1 flex flex-col bg-[#f9fafb] overflow-auto">
                    <div className="flex-1 p-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        Seller Transactions
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Manage your pending transactions and
                                        upload required documents
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {transactions.map((transaction) => {
                                    const currentStatus =
                                        getTransactionStatus(transaction);
                                    const documents = getDocuments(
                                        transaction.transaction_id
                                    );

                                    return (
                                        <Card
                                            key={transaction.transaction_id}
                                            className="p-6"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="w-5 h-5 text-gray-400" />
                                                        <h3 className="text-lg font-medium text-gray-900">
                                                            {
                                                                transaction.product_name
                                                            }
                                                        </h3>
                                                        <Badge
                                                            variant={
                                                                currentStatus ===
                                                                "completed"
                                                                    ? "default"
                                                                    : "secondary"
                                                            }
                                                            className={
                                                                currentStatus ===
                                                                "completed"
                                                                    ? "bg-green-100 text-green-800"
                                                                    : "bg-yellow-100 text-yellow-800"
                                                            }
                                                        >
                                                            {currentStatus ===
                                                            "completed"
                                                                ? "Completed"
                                                                : "Pending"}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        Quantity:{" "}
                                                        {transaction.quantity} •
                                                        Price:{" "}
                                                        {transaction.price}
                                                    </p>
                                                    {documents.length > 0 && (
                                                        <p className="text-xs text-gray-500">
                                                            {documents.length}{" "}
                                                            document
                                                            {documents.length !==
                                                            1
                                                                ? "s"
                                                                : ""}{" "}
                                                            uploaded
                                                        </p>
                                                    )}
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    onClick={() =>
                                                        handleTransactionSelect(
                                                            transaction.transaction_id
                                                        )
                                                    }
                                                    disabled={
                                                        currentStatus ===
                                                        "completed"
                                                    }
                                                >
                                                    {selectedTransaction ===
                                                    transaction.transaction_id
                                                        ? "Hide Documents"
                                                        : "Upload Documents"}
                                                </Button>
                                            </div>

                                            {selectedTransaction ===
                                                transaction.transaction_id && (
                                                <div className="mt-6">
                                                    <DocumentUpload
                                                        transactionId={
                                                            transaction.transaction_id
                                                        }
                                                    />
                                                </div>
                                            )}
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};
