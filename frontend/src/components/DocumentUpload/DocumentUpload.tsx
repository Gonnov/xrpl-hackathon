import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, CheckCircle2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactionDocumentStore } from "@/stores/useTransactionDocumentStore";
import { useToast } from "@/hooks/use-toast";
import { TransactionValidationDialog } from "./TransactionValidationDialog";

interface DocumentUploadProps {
    transactionId: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
    transactionId,
}) => {
    const {
        addDocuments,
        getDocuments,
        verifyDocument,
        validateTransaction,
        isTransactionValidated,
        removeDocument,
    } = useTransactionDocumentStore();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const documents = getDocuments(transactionId);
    const isValidated = isTransactionValidated(transactionId);

    const handleValidationConfirm = async () => {
        setIsValidating(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 5000));
        validateTransaction(transactionId);
        setIsValidating(false);
        setIsValidationDialogOpen(false);
        toast({
            title: "Transaction validated",
            description: "All documents have been verified successfully.",
        });
    };

    const onDrop = useCallback(
        async (acceptedFiles: File[]) => {
            if (isValidated) {
                toast({
                    title: "Transaction already validated",
                    description:
                        "You cannot add new documents to a validated transaction.",
                    variant: "destructive",
                });
                return;
            }

            if (acceptedFiles.length === 0) {
                return;
            }

            try {
                setIsUploading(true);

                // Validate file sizes
                const oversizedFiles = acceptedFiles.filter(
                    (file) => file.size > 5 * 1024 * 1024
                );
                if (oversizedFiles.length > 0) {
                    toast({
                        title: "Files too large",
                        description: "Some files exceed the 5MB limit",
                        variant: "destructive",
                    });
                    return;
                }

                // Add documents to store
                addDocuments(transactionId, acceptedFiles);

                toast({
                    title: "Documents uploaded",
                    description: `${acceptedFiles.length} document${
                        acceptedFiles.length === 1 ? "" : "s"
                    } have been successfully uploaded.`,
                });
            } catch (error) {
                console.error("Error uploading documents:", error);
                toast({
                    title: "Upload failed",
                    description:
                        "There was an error uploading your documents. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setIsUploading(false);
            }
        },
        [transactionId, addDocuments, toast, isValidated]
    );

    const handleRemoveDocument = (documentId: string) => {
        if (isValidated) {
            toast({
                title: "Cannot remove document",
                description:
                    "You cannot remove documents from a validated transaction.",
                variant: "destructive",
            });
            return;
        }

        removeDocument(transactionId, documentId);
        toast({
            title: "Document removed",
            description: "The document has been removed successfully.",
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/pdf": [".pdf"],
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
        },
        maxSize: 5 * 1024 * 1024, // 5MB
        disabled: isValidated || isUploading,
        multiple: true,
    });

    return (
        <div className="space-y-4">
            {!isValidated && (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
                        ${
                            isDragActive
                                ? "border-primary bg-primary/5"
                                : "border-gray-300 hover:border-primary"
                        }
                        ${
                            isValidated || isUploading
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                        }
                    `}
                >
                    <input {...getInputProps()} />
                    <Upload
                        className={`w-12 h-12 mx-auto mb-4 ${
                            isUploading ? "animate-pulse" : ""
                        } text-gray-400`}
                    />
                    <p className="text-sm text-gray-600">
                        {isDragActive
                            ? "Drop the files here..."
                            : isUploading
                            ? "Uploading..."
                            : "Drag and drop files here, or click to select files"}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        Supported formats: PDF, JPG, PNG (max 5MB)
                    </p>
                </div>
            )}

            {documents.length > 0 && (
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium">
                            Uploaded Documents ({documents.length})
                        </h3>
                        {!isValidated &&
                            documents.length > 0 &&
                            !isUploading && (
                                <Button
                                    variant="default"
                                    size="sm"
                                    onClick={() =>
                                        setIsValidationDialogOpen(true)
                                    }
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Validate All Documents
                                </Button>
                            )}
                    </div>
                    <div className="space-y-2">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                                <div className="flex items-center space-x-3">
                                    <File className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">
                                            {doc.name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {new Date(
                                                doc.uploadedAt
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    {isValidated ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                                handleRemoveDocument(doc.id)
                                            }
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                            disabled={isUploading}
                                        >
                                            <X className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <TransactionValidationDialog
                isOpen={isValidationDialogOpen}
                isLoading={isValidating}
                onClose={() => setIsValidationDialogOpen(false)}
                onConfirm={handleValidationConfirm}
            />

            {isValidated && (
                <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" />
                    <p className="text-sm font-medium">
                        This transaction has been validated. No further changes
                        are allowed.
                    </p>
                </div>
            )}
        </div>
    );
};
