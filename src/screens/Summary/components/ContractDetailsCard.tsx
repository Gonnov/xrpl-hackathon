import React from "react";
import { Card } from "@/components/ui/card";
import { FileText, Building2, Ship, Shield } from "lucide-react";

interface ContractDetailsCardProps {
  contract: {
    reference: string;
    incoterm: string;
    product: {
      name: string;
      category: string;
      description: string;
    };
    parties: {
      exporter: {
        name: string;
        country: string;
      };
      importer: {
        name: string;
        country: string;
      };
    };
    transport: {
      mode: string;
      departure: string;
      arrival: string;
    };
    insurance?: {
      provider: string;
      reference: string;
    };
  };
}

export const ContractDetailsCard: React.FC<ContractDetailsCardProps> = ({
  contract
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Contract Details</h2>

      <div className="space-y-6">
        {/* Contract Reference & Incoterm */}
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Contract Reference</p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {contract.reference} • {contract.incoterm}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-sm text-gray-500 mb-1">Product</p>
          <p className="text-sm font-medium text-gray-900">{contract.product.name}</p>
          <p className="text-sm text-gray-500 mt-1">{contract.product.category}</p>
          <p className="text-sm text-gray-600 mt-2">{contract.product.description}</p>
        </div>

        {/* Parties */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Exporter</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {contract.parties.exporter.name}
              </p>
              <p className="text-sm text-gray-500">{contract.parties.exporter.country}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Importer</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {contract.parties.importer.name}
              </p>
              <p className="text-sm text-gray-500">{contract.parties.importer.country}</p>
            </div>
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-start gap-3">
          <Ship className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Transport</p>
            <p className="text-sm font-medium text-gray-900 mt-1">{contract.transport.mode}</p>
            <p className="text-sm text-gray-500 mt-1">
              From: {contract.transport.departure}
              <br />
              To: {contract.transport.arrival}
            </p>
          </div>
        </div>

        {/* Insurance */}
        {contract.insurance && (
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">Insurance</p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {contract.insurance.provider}
              </p>
              <p className="text-sm text-gray-500">
                Ref: {contract.insurance.reference}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};