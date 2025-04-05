import React from "react";
import { DocumentViewer } from "@/components/DocumentViewer";

interface BillOfLadingSectionProps {
  uploadedDocuments?: {
    type: string;
    name: string;
    status: string;
  }[];
}

export const BillOfLadingSection: React.FC<BillOfLadingSectionProps> = ({ uploadedDocuments }) => {
  return (
    <div className="w-full bg-[#f9fafb] p-4">
      <div className="max-w-[1200px] w-full mx-auto bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
        <DocumentViewer uploadedDocuments={uploadedDocuments} />
      </div>
    </div>
  );
};