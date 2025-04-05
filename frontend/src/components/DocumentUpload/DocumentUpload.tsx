import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, CheckCircle2, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTransactionDocumentStore } from "@/stores/useTransactionDocumentStore";
import { useToast } from "@/hooks/use-toast";
import { TransactionValidationDialog } from "./TransactionValidationDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface DocumentUploadProps {
    transactionId: string;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
    transactionId,
}) => {
    const {
        addDocuments,
        getDocuments,
        getDocumentsByType,
        verifyDocument,
        validateTransaction,
        isTransactionValidated,
        canValidateTransaction,
        removeDocument,
        getDocumentTypes,
    } = useTransactionDocumentStore();
    const { toast } = useToast();
    const [isUploading, setIsUploading] = useState(false);
    const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false);
    const [isValidating, setIsValidating] = useState(false);
    const [activeDocumentType, setActiveDocumentType] = useState<string | null>(
        null
    );

    const documents = getDocuments(transactionId);
    const isValidated = isTransactionValidated(transactionId);
    const documentTypes = getDocumentTypes();
    const canValidate = canValidateTransaction(transactionId);

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
            if (!activeDocumentType) return;

            if (isValidated) {
                toast({
                    title: "Transaction already validated",
                    description:
                        "You cannot add new documents to a validated transaction.",
                    variant: "destructive",
                });
                return;
            }

            if (acceptedFiles.length === 0) return;

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
                addDocuments(
                    transactionId,
                    acceptedFiles,
                    activeDocumentType as any
                );

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
        [transactionId, addDocuments, toast, isValidated, activeDocumentType]
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
        disabled: isValidated || isUploading || !activeDocumentType,
        multiple: true,
    });

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentTypes.map((docType) => {
                    const typeDocuments = getDocumentsByType(
                        transactionId,
                        docType.type
                    );
                    const isComplete = typeDocuments.some(
                        (doc) => doc.status === "verified"
                    );

                    return (
                        <Card key={docType.type} className="p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {docType.label}
                                        </h3>
                                        {docType.required && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-red-100 text-red-800 text-xs"
                                            >
                                                Required
                                            </Badge>
                                        )}
                                        {isComplete && (
                                            <Badge
                                                variant="default"
                                                className="bg-green-100 text-green-800 text-xs"
                                            >
                                                Complete
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="mt-0.5 text-xs text-gray-500">
                                        {docType.description}
                                    </p>
                                </div>
                            </div>

                            {activeDocumentType === docType.type &&
                                !isValidated && (
                                    <div
                                        {...getRootProps()}
                                        className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors mb-2
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
                                            className={`w-6 h-6 mx-auto mb-1 ${
                                                isUploading
                                                    ? "animate-pulse"
                                                    : ""
                                            } text-gray-400`}
                                        />
                                        <p className="text-xs text-gray-600">
                                            {isDragActive
                                                ? "Drop the files here..."
                                                : isUploading
                                                ? "Uploading..."
                                                : "Drag and drop files here"}
                                        </p>
                                    </div>
                                )}

                            {typeDocuments.length > 0 && (
                                <div className="space-y-1">
                                    {typeDocuments.map((doc) => (
                                        <div
                                            key={doc.id}
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <File className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs font-medium text-gray-700 truncate max-w-[180px]">
                                                        {doc.name}
                                                    </p>
                                                    <p className="text-[10px] text-gray-500">
                                                        {new Date(
                                                            doc.uploadedAt
                                                        ).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {doc.status === "verified" ? (
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() =>
                                                            handleRemoveDocument(
                                                                doc.id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 h-6 w-6 p-0"
                                                        disabled={isUploading}
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {!isValidated && (
                                <div className="mt-2">
                                    {activeDocumentType === docType.type ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setActiveDocumentType(null)
                                            }
                                            disabled={isUploading}
                                            className="w-full"
                                        >
                                            Cancel Upload
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                setActiveDocumentType(
                                                    docType.type
                                                )
                                            }
                                            disabled={isValidated}
                                            className="w-full"
                                        >
                                            Upload {docType.label}
                                        </Button>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {!isValidated && documents.length > 0 && (
                <div className="flex justify-end mt-4">
                    <Button
                        variant="default"
                        size="sm"
                        onClick={() => setIsValidationDialogOpen(true)}
                        disabled={!canValidate || isUploading}
                        className={`${
                            canValidate
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400"
                        }`}
                    >
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        {canValidate
                            ? "Validate Transaction"
                            : "Upload Required Documents"}
                    </Button>
                </div>
            )}

            <TransactionValidationDialog
                isOpen={isValidationDialogOpen}
                isLoading={isValidating}
                onClose={() => setIsValidationDialogOpen(false)}
                onConfirm={handleValidationConfirm}
            />

            {isValidated && (
                <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
                    <CheckCircle2 className="w-4 h-4" />
                    <p className="font-medium">Transaction validated</p>
                </div>
            )}
        </div>
    );
};
