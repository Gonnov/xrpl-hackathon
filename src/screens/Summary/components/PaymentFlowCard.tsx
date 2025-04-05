import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

interface PaymentStep {
  stage: string;
  timestamp: string;
  completed: boolean;
}

interface PaymentFlowCardProps {
  steps: PaymentStep[];
}

export const PaymentFlowCard: React.FC<PaymentFlowCardProps> = ({
  steps
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Flow</h2>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200">
          <div 
            className="absolute top-0 left-0 h-full bg-[#00B0F5]" 
            style={{ 
              width: `${(steps.filter(s => s.completed).length / steps.length) * 100}%` 
            }}
          />
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-4 gap-4">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${step.completed 
                  ? 'bg-[#00B0F5] text-white' 
                  : 'bg-gray-100 text-gray-400'
                }
              `}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-sm font-medium text-gray-900 mt-4">{step.stage}</p>
              <p className="text-xs text-gray-500 mt-1">{step.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          Payment is secured via KAYP's escrow service. Funds are held until all documents are verified and goods are confirmed shipped.
        </p>
      </div>
    </Card>
  );
};