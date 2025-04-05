import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Document {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: Date;
    status: "pending" | "verified";
}

interface TransactionDocument {
    transactionId: string;
    documents: Document[];
    isValidated: boolean;
}

interface TransactionDocumentState {
    transactions: TransactionDocument[];
    addDocument: (transactionId: string, file: File) => void;
    addDocuments: (transactionId: string, files: File[]) => void;
    verifyDocument: (transactionId: string, documentId: string) => void;
    validateTransaction: (transactionId: string) => void;
    getDocuments: (transactionId: string) => Document[];
    isTransactionValidated: (transactionId: string) => boolean;
    removeDocument: (transactionId: string, documentId: string) => void;
}

export const useTransactionDocumentStore = create<TransactionDocumentState>()(
    immer((set, get) => ({
        transactions: [],

        addDocument: (transactionId: string, file: File) => {
            set((state) => {
                const transactionIndex = state.transactions.findIndex(
                    (td) => td.transactionId === transactionId
                );

                const newDocument: Document = {
                    id: Math.random().toString(36).substring(7),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    uploadedAt: new Date(),
                    status: "pending",
                };

                if (transactionIndex === -1) {
                    state.transactions.push({
                        transactionId,
                        documents: [newDocument],
                        isValidated: false,
                    });
                } else {
                    state.transactions[transactionIndex].documents = [
                        ...state.transactions[transactionIndex].documents,
                        newDocument,
                    ];
                    state.transactions[transactionIndex].isValidated = false;
                }
            });
        },

        addDocuments: (transactionId: string, files: File[]) => {
            set((state) => {
                const transactionIndex = state.transactions.findIndex(
                    (td) => td.transactionId === transactionId
                );

                const newDocuments: Document[] = files.map((file) => ({
                    id: Math.random().toString(36).substring(7),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    uploadedAt: new Date(),
                    status: "pending",
                }));

                if (transactionIndex === -1) {
                    state.transactions.push({
                        transactionId,
                        documents: newDocuments,
                        isValidated: false,
                    });
                } else {
                    state.transactions[transactionIndex].documents = [
                        ...state.transactions[transactionIndex].documents,
                        ...newDocuments,
                    ];
                    state.transactions[transactionIndex].isValidated = false;
                }
            });
        },

        verifyDocument: (transactionId: string, documentId: string) => {
            set((state) => {
                const transaction = state.transactions.find(
                    (td) => td.transactionId === transactionId
                );
                if (transaction) {
                    const document = transaction.documents.find(
                        (d) => d.id === documentId
                    );
                    if (document) {
                        document.status = "verified";
                    }
                }
            });
        },

        validateTransaction: (transactionId: string) => {
            set((state) => {
                const transaction = state.transactions.find(
                    (td) => td.transactionId === transactionId
                );
                if (transaction) {
                    transaction.isValidated = true;
                    transaction.documents.forEach((doc) => {
                        doc.status = "verified";
                    });
                }
            });
        },

        getDocuments: (transactionId: string) => {
            const transaction = get().transactions.find(
                (td) => td.transactionId === transactionId
            );
            return transaction?.documents || [];
        },

        isTransactionValidated: (transactionId: string) => {
            const transaction = get().transactions.find(
                (td) => td.transactionId === transactionId
            );
            return transaction?.isValidated || false;
        },

        removeDocument: (transactionId: string, documentId: string) => {
            set((state) => {
                const transaction = state.transactions.find(
                    (td) => td.transactionId === transactionId
                );
                if (transaction) {
                    transaction.documents = transaction.documents.filter(
                        (doc) => doc.id !== documentId
                    );
                    transaction.isValidated = false;
                }
            });
        },
    }))
);
