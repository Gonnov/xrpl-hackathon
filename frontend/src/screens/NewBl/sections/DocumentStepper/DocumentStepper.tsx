import React from "react";
import { Check, FileText, Bell, FileSearch, ClipboardList, Wallet, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";
import { useTransactionStore } from "@/stores/useTransactionStore";

interface Step {
  id: number;
  name: string;
  icon: React.ElementType;
  path: string;
}

export const DocumentStepper = (): JSX.Element => {
  const location = useLocation();
  const { userRole, details } = useTransactionStore();

  const getSteps = (): Step[] => {
    // Default first step (always shown)
    const baseSteps: Step[] = [
      { id: 1, name: "Contract", icon: FileText, path: "/contract" },
    ];

    // If no role selected yet, return only the first step
    if (!userRole) {
      return baseSteps;
    }

    // Add notification step (common for both roles)
    baseSteps.push({ id: 2, name: "Notification", icon: Bell, path: "/notification" });

    // Different flows based on role and funding method
    if (userRole === "Exporter") {
      return [
        ...baseSteps,
        { id: 3, name: "Documents", icon: ClipboardList, path: "/documents" },
        { id: 4, name: "Verification", icon: FileSearch, path: "/verification" },
        { id: 5, name: "Summary", icon: Check, path: "/summary" },
      ];
    } else {
      // Importer flow
      if (details.fundingMethod === "financed") {
        return [
          ...baseSteps,
          { id: 3, name: "Financing", icon: CreditCard, path: "/payment" },
          { id: 4, name: "Summary", icon: Check, path: "/summary" },
        ];
      } else {
        return [
          ...baseSteps,
          { id: 3, name: "Payment", icon: Wallet, path: "/payment" },
          { id: 4, name: "Summary", icon: Check, path: "/summary" },
        ];
      }
    }
  };

  const steps = getSteps();

  const getStepStatus = (stepPath: string, index: number) => {
    const currentStepIndex = steps.findIndex(step => step.path === location.pathname);
    
    if (index < currentStepIndex) return "complete";
    if (stepPath === location.pathname) return "current";
    return "upcoming";
  };

  return (
    <nav className="border-b border-[#eff0f2] bg-white">
      <div className="mx-auto px-6 py-3">
        <ol role="list" className="flex items-center justify-center gap-8">
          {steps.map((step, stepIdx) => (
            <li
              key={step.name}
              className="relative flex items-center"
            >
              <div className="flex items-center">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium",
                    getStepStatus(step.path, stepIdx) === "complete"
                      ? "bg-[#00B0F5] text-white"
                      : getStepStatus(step.path, stepIdx) === "current"
                      ? "border-2 border-[#00B0F5] bg-white text-[#00B0F5]"
                      : "border-2 border-[#E5E6E8] bg-white text-[#044752]"
                  )}
                >
                  {getStepStatus(step.path, stepIdx) === "complete" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <step.icon className="h-4 w-4" />
                  )}
                </span>
                <span
                  className={cn(
                    "ml-2 text-sm font-medium",
                    getStepStatus(step.path, stepIdx) === "complete"
                      ? "text-[#044752]"
                      : getStepStatus(step.path, stepIdx) === "current"
                      ? "text-[#00B0F5]"
                      : "text-[#044752]"
                  )}
                >
                  {step.name}
                </span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-[calc(100%+0.5rem)] top-[13px] h-[2px] w-[1rem]",
                    getStepStatus(step.path, stepIdx) === "complete"
                      ? "bg-[#00B0F5]"
                      : "bg-[#E5E6E8]"
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};