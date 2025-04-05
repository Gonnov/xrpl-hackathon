import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { BillOfLading } from '../BillOfLading';
import { billData } from '@/mock/ocrData';

interface Document {
  id: string;
  type: string;
  name: string;
  pages: number;
  component?: React.ComponentType<any>;
  data?: any;
  url?: string;
}

interface DocumentViewerProps {
  uploadedDocuments?: {
    type: string;
    name: string;
    status: string;
  }[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ uploadedDocuments = [] }) => {
  // Filtrer les documents disponibles en fonction des documents téléversés
  const getAvailableDocuments = () => {
    const defaultDocuments: Document[] = [
      {
        id: 'bl-001',
        type: 'Bill of Lading',
        name: 'Bill of Lading #MBLHAV123456',
        pages: 1,
        component: BillOfLading,
        data: billData
      }
    ];

    // Si aucun document n'a été téléversé, retourner la liste par défaut
    if (!uploadedDocuments.length) {
      return defaultDocuments;
    }

    // Créer un document pour chaque fichier téléversé et traité avec succès
    return uploadedDocuments
      .filter(doc => doc.status === "completed")
      .map(doc => ({
        id: doc.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        type: doc.type,
        name: doc.type, // Utiliser le type comme nom d'affichage
        pages: 1,
        component: doc.type === "Bill of Lading" ? BillOfLading : undefined,
        data: doc.type === "Bill of Lading" ? billData : undefined,
        url: doc.type !== "Bill of Lading" ? `/documents/${doc.name.toLowerCase()}` : undefined
      }));
  };

  const documents = getAvailableDocuments();
  const [selectedDoc, setSelectedDoc] = useState<Document>(documents[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const handleDocumentChange = (docId: string) => {
    const doc = documents.find(d => d.id === docId);
    if (doc) {
      setSelectedDoc(doc);
      setCurrentPage(1);
      setError(null);
    }
  };

  const handlePageChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (direction === 'next' && currentPage < selectedDoc.pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (!documents.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No documents available in this envelope.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Document Controls */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Select value={selectedDoc.id} onValueChange={handleDocumentChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select a document" />
            </SelectTrigger>
            <SelectContent>
              {documents.map(doc => (
                <SelectItem key={doc.id} value={doc.id}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {selectedDoc.pages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange('next')}
              disabled={currentPage === selectedDoc.pages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setError(null)}
                className="text-red-700 hover:text-red-900"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="flex-1 overflow-auto p-6">
        {selectedDoc.component ? (
          <selectedDoc.component data={selectedDoc.data} />
        ) : selectedDoc.url ? (
          <div className="flex items-center justify-center h-full">
            <iframe
              src={selectedDoc.url}
              className="w-full h-full border-0"
              title={selectedDoc.name}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Preview not available</p>
          </div>
        )}
      </div>
    </div>
  );
};