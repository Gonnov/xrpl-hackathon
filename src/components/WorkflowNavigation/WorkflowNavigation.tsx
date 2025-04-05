import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORKFLOW_STEPS = [
  { path: "/contract", label: "Contract", next: "/notification", back: "/" },
  { path: "/notification", label: "Notification", next: "/documents", back: "/contract" },
  { path: "/documents", label: "Documents", next: "/verification", back: "/notification" },
  { path: "/payment", label: "Payment", next: "/summary", back: "/notification" },
  { path: "/verification", label: "Verification", next: "/summary", back: "/documents" },
  { path: "/summary", label: "Summary", next: null, back: "/verification" }
];

interface WorkflowNavigationProps {
  isValid?: boolean;
  onContinue?: () => void;
}

export const WorkflowNavigation: React.FC<WorkflowNavigationProps> = ({ 
  isValid = true,
  onContinue
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentStep = WORKFLOW_STEPS.find(step => step.path === location.pathname);
  
  if (!currentStep) return null;

  const handleBack = () => {
    if (currentStep.back) {
      navigate(currentStep.back);
    }
  };

  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    } else if (currentStep.next) {
      navigate(currentStep.next);
    }
  };

  return (
    <div className="sticky bottom-0 z-50 bg-white border-t border-gray-200">
      <div className="h-16 px-6 flex items-center">
        <div className="w-full max-w-7xl mx-auto flex justify-between">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={!currentStep.back}
            className="text-gray-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep.next && (
            <Button
              onClick={handleContinue}
              className="bg-[#00B0F5]"
              disabled={!isValid}
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};