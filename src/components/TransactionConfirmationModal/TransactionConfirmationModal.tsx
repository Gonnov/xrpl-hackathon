import React from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PartnerHeader } from "./PartnerHeader";
import {
  Building2,
  Package,
  Truck,
  Calendar,
  DollarSign,
  Shield,
} from "lucide-react";

interface TransactionDetails {
  id: string;
  senderCompany: string;
  senderRole: "Importer" | "Exporter";
  createdAt: Date;
  value: string;
  incoterm: string;
  product: {
    name: string;
    description: string;
    category: string;
  };
  tradeType: "One-Off" | "Recurring";
  insurance?: {
    provider: string;
    reference: string;
  };
  logistics: {
    mode: string;
    departure: {
      location: string;
      date: Date;
    };
    arrival: {
      location: string;
      date: Date;
    };
  };
  partner: {
    role: "Importer" | "Exporter";
    name: string;
    email: string;
    phone: string;
    country: string;
  };
}

interface TransactionConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: TransactionDetails;
  onConfirm: () => void;
  onDecline: () => void;
}

export const TransactionConfirmationModal: React.FC<TransactionConfirmationModalProps> = ({
  isOpen,
  onClose,
  transaction,
  onConfirm,
  onDecline,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>🔗 {transaction.id}</span>
            <span>•</span>
            <span>Created {format(transaction.createdAt, "MMM dd, yyyy")}</span>
          </div>
          <DialogTitle className="text-xl mt-2">
            New transaction from {transaction.senderCompany}
          </DialogTitle>
        </DialogHeader>

        {/* Partner Header */}
        <PartnerHeader {...transaction.partner} />

        <div className="space-y-6 mt-6">
          {/* Contract Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              Contract Details
            </h3>
            
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Contract Value</p>
                <p className="text-base font-medium text-gray-900 mt-1">{transaction.value}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Incoterm</p>
                <p className="text-base font-medium text-gray-900 mt-1">{transaction.incoterm}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-500">Product</p>
                </div>
                <p className="text-base font-medium text-gray-900 mt-1">{transaction.product.name}</p>
                <p className="text-sm text-gray-600 mt-1">{transaction.product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{transaction.product.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trade Type</p>
                  <p className="text-base font-medium text-gray-900 mt-1">{transaction.tradeType}</p>
                </div>
              </div>

              {transaction.insurance && (
                <div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-gray-400" />
                    <p className="text-sm text-gray-500">Insurance</p>
                  </div>
                  <p className="text-base font-medium text-gray-900 mt-1">
                    {transaction.insurance.provider}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Ref: {transaction.insurance.reference}
                  </p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Logistics Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gray-400" />
              Logistics
            </h3>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Mode of Transport</p>
              <p className="text-base font-medium text-gray-900 mt-1">
                {transaction.logistics.mode}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-500">Departure</p>
                </div>
                <p className="text-base font-medium text-gray-900 mt-2">
                  {transaction.logistics.departure.location}
                </p>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">
                    {format(transaction.logistics.departure.date, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-400" />
                  <p className="text-sm text-gray-500">Arrival</p>
                </div>
                <p className="text-base font-medium text-gray-900 mt-2">
                  {transaction.logistics.arrival.location}
                </p>
                <div className="flex items-center gap-2 mt-2 text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <p className="text-sm">
                    {format(transaction.logistics.arrival.date, "MMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onDecline} className="mr-2">
            Decline
          </Button>
          <Button onClick={onConfirm} className="bg-[#00B0F5]">
            Confirm Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};