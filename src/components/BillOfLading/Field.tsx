import React from "react";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { cn } from "@/lib/utils";

interface FieldProps {
  label?: string;
  value: string;
  fieldKey: string;
  note?: string;
  isDiscrepancy?: boolean;
  errorMessage?: string;
}

export const Field: React.FC<FieldProps> = ({
  label,
  value,
  fieldKey,
  note,
  isDiscrepancy = false,
  errorMessage = "Value mismatch detected",
}) => {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-1",
        isDiscrepancy && "border border-red-500 bg-red-50 rounded-sm p-2"
      )}
    >
      {(label || note) && (
        <div className="flex items-center gap-1 text-xs font-medium text-gray-600 uppercase tracking-wide">
          {label && <span>{label}</span>}
          {note && <span className="text-gray-400">{note}</span>}
          {isDiscrepancy && (
            <AlertTriangle className="w-4 h-4 text-red-500 ml-1" />
          )}
        </div>
      )}

      <div className="text-sm font-semibold text-gray-900">{value}</div>
    </div>
  );

  if (isDiscrepancy) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{content}</TooltipTrigger>
          <TooltipContent>
            <p className="text-red-500 text-xs">{errorMessage}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return content;
};