import React from "react";
import { Check, FileText, Bell, FileSearch, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const steps = [
  { id: 1, name: "Contract", icon: FileText, path: "/contract" },
  { id: 2, name: "Notification", icon: Bell, path: "/notification" },
  { id: 3, name: "Documents", icon: ClipboardList, path: "/" },
  { id: 4, name: "Verification", icon: FileSearch, path: "/verification" },
  { id: 5, name: "Summary", icon: Check, path: "/summary" },
];

export const DocumentStepper = (): JSX.Element => {
  const location = useLocation();

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
                    stepIdx + 1
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