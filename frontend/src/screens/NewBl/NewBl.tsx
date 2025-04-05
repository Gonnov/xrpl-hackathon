import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BillOfLadingSection } from "./sections/BillOfLadingSection";
import { HeaderSection } from "./sections/HeaderSection";
import { NavigationSidebarSection } from "./sections/NavigationSidebarSection";
import { DocumentVerificationChat } from "./sections/DocumentVerificationChat";
import { DocumentStepper } from "./sections/DocumentStepper";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import { useTransactionStore } from '@/stores/useTransactionStore';

export const NewBl = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const uploadedDocuments = location.state?.uploadedDocuments || [];
  const { setDocumentsVerified, userRole } = useTransactionStore();

  useEffect(() => {
    if (userRole !== 'Exporter') {
      navigate('/dashboard');
    }
  }, [userRole, navigate]);

  const handleContinue = () => {
    setDocumentsVerified(true);
    navigate('/summary');
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-shrink-0">
        <HeaderSection />
      </div>

      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebarSection />
        
        <main className="flex-1 flex flex-col bg-[#f9fafb]">
          <div className="flex-shrink-0 px-6 mt-6 mb-4">
            <DocumentStepper />
          </div>

          <div className="flex-1 flex gap-6 px-6 pb-6 min-h-0">
            <div className="w-[40%] bg-white rounded-lg shadow-sm flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <DocumentVerificationChat />
              </div>
            </div>

            <div className="w-[60%] bg-white rounded-lg shadow-sm flex flex-col min-h-0">
              <div className="flex-1 overflow-y-auto">
                <BillOfLadingSection uploadedDocuments={uploadedDocuments} />
              </div>
            </div>
          </div>

          <WorkflowNavigation 
            isValid={true} 
            onContinue={handleContinue}
          />
        </main>
      </div>
    </div>
  );
};