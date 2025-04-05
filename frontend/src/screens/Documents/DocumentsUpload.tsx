import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import { useTransactionStore } from '@/stores/useTransactionStore';

interface UploadedDocument {
  id: string;
  name: string;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

const requiredDocuments = [
  {
    type: "Commercial Invoice",
    description: "Commercial invoice for the shipment",
    required: true,
  },
  {
    type: "Bill of Lading",
    description: "Original Bill of Lading document",
    required: true,
  },
  {
    type: "Certificate of Origin",
    description: "Document certifying the origin of goods",
    required: true,
  },
  {
    type: "Packing List",
    description: "Detailed packing list",
    required: true,
  },
  {
    type: "Insurance Certificate",
    description: "Insurance documentation",
    required: false,
  },
];

export const DocumentsUpload = () => {
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const { setDocumentsUploaded, userRole } = useTransactionStore();

  useEffect(() => {
    if (userRole !== 'Exporter') {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  const simulateProgress = (docId: string) => {
    const interval = setInterval(() => {
      setUploadedDocs(prev => 
        prev.map(doc => {
          if (doc.id === docId && doc.status === "uploading") {
            const newProgress = doc.progress + 20;
            if (newProgress >= 100) {
              clearInterval(interval);
              return { ...doc, progress: 100, status: "processing" };
            }
            return { ...doc, progress: newProgress };
          }
          return doc;
        })
      );
    }, 100);

    return () => clearInterval(interval);
  };

  const handleFileUpload = (files: FileList, targetType: string) => {
    Array.from(files).forEach((file) => {
      const newDoc: UploadedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: targetType,
        status: "uploading",
        progress: 0,
      };

      setUploadedDocs((prev) => [...prev, newDoc]);

      const cleanup = simulateProgress(newDoc.id);

      setTimeout(() => {
        cleanup();
        setUploadedDocs((prev) =>
          prev.map((doc) =>
            doc.id === newDoc.id ? { ...doc, status: "completed", progress: 100 } : doc
          )
        );
      }, 800);
    });
  };

  const handleDrop = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(null);
    handleFileUpload(e.dataTransfer.files, type);
  };

  const handleDragOver = (e: React.DragEvent, type: string) => {
    e.preventDefault();
    setDragOver(type);
  };

  const handleDragLeave = () => {
    setDragOver(null);
  };

  const getUploadProgress = () => {
    const requiredDocsCount = requiredDocuments.filter(doc => doc.required).length;
    const uploadedRequiredDocs = uploadedDocs.filter(
      doc => doc.status === "completed" && 
      requiredDocuments.find(rd => rd.type === doc.type)?.required
    ).length;
    return Math.round((uploadedRequiredDocs / requiredDocsCount) * 100);
  };

  const getDocumentStatus = (type: string) => {
    return uploadedDocs.find(doc => doc.type === type);
  };

  const handleContinue = () => {
    const processedDocs = uploadedDocs.filter(doc => doc.status === "completed");
    setDocumentsUploaded(true);
    navigate("/verification", { 
      state: { 
        uploadedDocuments: processedDocs.map(doc => ({
          type: doc.type,
          name: doc.name,
          status: doc.status
        }))
      }
    });
  };

  const isValid = uploadedDocs.filter(
    doc => doc.status === "completed" && 
    requiredDocuments.find(rd => rd.type === doc.type)?.required
  ).length === requiredDocuments.filter(doc => doc.required).length;

  return (
    <div className="h-screen flex flex-col">
      <HeaderSection />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebarSection />
        
        <main className="flex-1 flex flex-col bg-[#f9fafb]">
          <div className="flex-shrink-0 px-6 mt-6 mb-4">
            <DocumentStepper />
          </div>

          <div className="flex-1 px-6 pb-6 overflow-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Upload Required Documents</h1>
                <p className="text-sm text-gray-500 mt-1">Please upload all necessary documents for your transaction</p>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Upload Progress</span>
                  <span className="text-sm text-gray-500">{getUploadProgress()}/100%</span>
                </div>
                <Progress value={getUploadProgress()} className="h-2" />
              </div>

              <div className="space-y-4">
                {requiredDocuments.map((doc) => {
                  const uploadStatus = getDocumentStatus(doc.type);
                  
                  return (
                    <div key={doc.type} className="relative">
                      <Card
                        className={`p-4 ${
                          dragOver === doc.type
                            ? "border-[#00B0F5] bg-[#00B0F5]/5"
                            : uploadStatus?.status === "completed"
                            ? "bg-emerald-50 border-emerald-200"
                            : "bg-white"
                        }`}
                        onDrop={(e) => handleDrop(e, doc.type)}
                        onDragOver={(e) => handleDragOver(e, doc.type)}
                        onDragLeave={handleDragLeave}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-medium text-gray-900">{doc.type}</h3>
                              {doc.required && (
                                <Badge variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                                  Required
                                </Badge>
                              )}
                            </div>
                            
                            {uploadStatus ? (
                              <div className="mt-2">
                                {uploadStatus.status === "uploading" && (
                                  <>
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-gray-500">Uploading...</span>
                                      <span className="text-xs text-gray-500">{uploadStatus.progress}%</span>
                                    </div>
                                    <Progress value={uploadStatus.progress} className="h-1" />
                                  </>
                                )}
                                {uploadStatus.status === "processing" && (
                                  <div className="flex items-center gap-2 text-blue-600">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span className="text-sm">Processing document...</span>
                                  </div>
                                )}
                                {uploadStatus.status === "completed" && (
                                  <div className="flex items-center gap-2 text-emerald-600">
                                    <CheckCircle2 className="w-4 h-4" />
                                    <span className="text-sm">Document processed successfully</span>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 mt-2">
                                <Upload className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">
                                  Drag and drop your document here, or{" "}
                                  <button
                                    onClick={() => document.getElementById(`fileInput-${doc.type}`)?.click()}
                                    className="text-[#00B0F5] hover:underline"
                                  >
                                    browse
                                  </button>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          id={`fileInput-${doc.type}`}
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => e.target.files && handleFileUpload(e.target.files, doc.type)}
                        />
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <WorkflowNavigation 
            isValid={isValid} 
            onContinue={handleContinue}
          />
        </main>
      </div>
    </div>
  );
};