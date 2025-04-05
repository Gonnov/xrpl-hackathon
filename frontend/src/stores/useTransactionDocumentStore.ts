import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface Document {
    id: string;
    name: string;
    type: string;
    size: number;
    uploadedAt: Date;
    status: "pending" | "verified";
    documentType:
        | "invoice"
        | "bill_of_lading"
        | "packing_list"
        | "certificate_of_origin";
}

interface TransactionDocument {
    transactionId: string;
    documents: Document[];
    isValidated: boolean;
}

interface DocumentTypeConfig {
    type:
        | "invoice"
        | "bill_of_lading"
        | "packing_list"
        | "certificate_of_origin";
    label: string;
    description: string;
    required: boolean;
}

const DOCUMENT_TYPES: DocumentTypeConfig[] = [
    {
        type: "invoice",
        label: "Commercial Invoice",
        description: "Official commercial invoice for the transaction",
        required: true,
    },
    {
        type: "bill_of_lading",
        label: "Bill of Lading",
        description: "Transport document for shipped goods",
        required: true,
    },
    {
        type: "packing_list",
        label: "Packing List",
        description: "Detailed list of shipped items",
        required: true,
    },
    {
        type: "certificate_of_origin",
        label: "Certificate of Origin",
        description: "Document certifying the origin of goods",
        required: false,
    },
];

interface TransactionDocumentState {
    transactions: TransactionDocument[];
    addDocument: (
        transactionId: string,
        file: File,
        documentType: DocumentTypeConfig["type"]
    ) => void;
    addDocuments: (
        transactionId: string,
        files: File[],
        documentType: DocumentTypeConfig["type"]
    ) => void;
    verifyDocument: (transactionId: string, documentId: string) => void;
    validateTransaction: (transactionId: string) => void;
    getDocuments: (transactionId: string) => Document[];
    getDocumentsByType: (
        transactionId: string,
        documentType: DocumentTypeConfig["type"]
    ) => Document[];
    isTransactionValidated: (transactionId: string) => boolean;
    canValidateTransaction: (transactionId: string) => boolean;
    removeDocument: (transactionId: string, documentId: string) => void;
    getDocumentTypes: () => DocumentTypeConfig[];
}

export const useTransactionDocumentStore = create<TransactionDocumentState>()(
    immer((set, get) => ({
        transactions: [],

        addDocument: (
            transactionId: string,
            file: File,
            documentType: DocumentTypeConfig["type"]
        ) => {
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
                    documentType,
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

        addDocuments: (
            transactionId: string,
            files: File[],
            documentType: DocumentTypeConfig["type"]
        ) => {
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
                    documentType,
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

        getDocumentsByType: (
            transactionId: string,
            documentType: DocumentTypeConfig["type"]
        ) => {
            const documents = get().getDocuments(transactionId);
            return documents.filter((doc) => doc.documentType === documentType);
        },

        canValidateTransaction: (transactionId: string) => {
            const documents = get().getDocuments(transactionId);
            // Check if we have at least one document for each required type
            const hasAllRequiredDocuments = DOCUMENT_TYPES.every((docType) => {
                if (!docType.required) return true;
                const hasDocument = documents.some(
                    (doc) =>
                        doc.documentType === docType.type &&
                        doc.status === "pending" // Changed from 'verified' to 'pending' since we verify on validation
                );
                return hasDocument;
            });
            return hasAllRequiredDocuments && documents.length > 0;
        },

        getDocumentTypes: () => DOCUMENT_TYPES,

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
