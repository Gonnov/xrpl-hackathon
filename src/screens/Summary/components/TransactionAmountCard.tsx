import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle2 } from "lucide-react";

interface TransactionAmountCardProps {
  amount: string;
  escrowFundedAt: string;
  fundsReleasedAt: string;
  status: string;
}

export const TransactionAmountCard: React.FC<TransactionAmountCardProps> = ({
  amount,
  escrowFundedAt,
  fundsReleasedAt,
  status
}) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          {/* Left: Amount + Status */}
          <div>
            <h2 className="text-sm font-medium text-gray-500">Transaction Amount</h2>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-2xl font-semibold text-gray-900">{amount}</span>
              <Badge 
                variant="outline" 
                className="bg-emerald-50 text-emerald-700 border-emerald-200"
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                {status}
              </Badge>
            </div>
          </div>

          {/* Right: Currency Selector */}
          <select 
            className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md px-2 py-1"
            defaultValue="EUR"
          >
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="VND">VND</option>
          </select>
        </div>

        {/* Middle Section: Net Amount + Dates */}
        <div className="mt-4 flex items-start justify-between">
          {/* Left: Net Amount */}
          <div>
            <p className="text-sm font-semibold text-gray-900">Net Received: €345,800</p>
            <p className="text-xs text-gray-500 mt-1">
              Fees: €4,200 (incl. FX + KAYP fee)
            </p>
          </div>

          {/* Right: Dates */}
          <div className="flex items-start gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Escrow Funded</p>
                <p className="text-sm font-medium text-gray-900">{escrowFundedAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Funds Released</p>
                <p className="text-sm font-medium text-gray-900">{fundsReleasedAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};