import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, Calendar, Ship, MapPin, Shield } from "lucide-react";

interface TransactionRecapProps {
  product: string;
  incoterm: string;
  value: string;
  deliveryTimeline: {
    departure: string;
    arrival: string;
  };
  insurance: {
    provider: string;
    reference: string;
  };
  transport: {
    mode: string;
    departure: string;
    destination: string;
  };
}

export const TransactionRecap: React.FC<TransactionRecapProps> = ({
  product,
  incoterm,
  value,
  deliveryTimeline,
  insurance,
  transport,
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-gray-900">Transaction Recap</h2>
        <Badge className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded shadow-sm">
          {incoterm}
        </Badge>
      </div>

      {/* Section 1: Product and Value */}
      <div className="space-y-2 pb-2 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Package className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">Product</p>
          </div>
          <p className="text-sm text-gray-900 pl-6">{product}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">Contract Value</p>
          </div>
          <p className="text-sm text-gray-900 pl-6">{value}</p>
        </div>
      </div>

      {/* Section 2: Dates */}
      <div className="py-2 border-b border-gray-100">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Departure</p>
            </div>
            <p className="text-sm text-gray-900 pl-6">{deliveryTimeline.departure}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">Arrival</p>
            </div>
            <p className="text-sm text-gray-900 pl-6">{deliveryTimeline.arrival}</p>
          </div>
        </div>
      </div>

      {/* Section 3: Transport Details */}
      <div className="pt-2 space-y-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Ship className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">Transport Mode</p>
          </div>
          <p className="text-sm text-gray-900 pl-6">{transport.mode}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-500">Insurance</p>
          </div>
          <div className="pl-6">
            <p className="text-sm text-gray-900">{insurance.provider}</p>
            <p className="text-xs text-gray-500">Ref: {insurance.reference}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">From</p>
            </div>
            <p className="text-sm text-gray-900 pl-6">{transport.departure}</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-500">To</p>
            </div>
            <p className="text-sm text-gray-900 pl-6">{transport.destination}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};