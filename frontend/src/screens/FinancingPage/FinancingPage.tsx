import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Package,
  Globe,
  CreditCard,
  Clock,
  Calculator,
  AlertCircle,
  Info,
  ArrowRight
} from "lucide-react";
import { useTransactionStore } from '@/stores/useTransactionStore';
import { useToast } from "@/hooks/use-toast";

const repaymentOptions = [
  { term: '30d', label: '30 days', fee: 5 },
  { term: '60d', label: '60 days', fee: 6.5 },
  { term: '90d', label: '90 days', fee: 8 }
];

export const FinancingPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { userRole, partner, details, setFinancingConfirmed } = useTransactionStore();

  useEffect(() => {
    // Protect the route - only allow Importers with financed funding method
    if (userRole !== 'Importer' || details?.fundingMethod !== 'financed') {
      navigate('/dashboard');
      return;
    }
  }, [userRole, details?.fundingMethod, navigate]);

  if (!partner || !details) {
    return null;
  }

  const selectedOption = repaymentOptions.find(opt => opt.term === details.repaymentTerm);
  const financingAmount = Number(details.contractValue);
  const financingFee = (financingAmount * (selectedOption?.fee || 5)) / 100;
  const totalAmount = financingAmount + financingFee;

  const handleConfirm = () => {
    if (!isConfirmed) return;

    try {
      // Update store to mark financing as confirmed
      setFinancingConfirmed(true);

      // Show success toast
      toast({
        title: "Financing confirmed",
        description: "Your financing terms have been confirmed. Proceeding to summary.",
      });

      // Navigate to summary page
      navigate('/summary');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to confirm financing. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <HeaderSection />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebarSection />
        
        <main className="flex-1 flex flex-col bg-[#f9fafb]">
          <div className="flex-shrink-0 px-6 mt-6 mb-4">
            <DocumentStepper />
          </div>

          <div className="flex-1 px-6 pb-6 overflow-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Financing Details</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Review and confirm your financing terms for this transaction.
                </p>
              </div>

              {/* Contract Summary Card */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contract Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#00B0F5] rounded-lg flex items-center justify-center text-white text-xl">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900">
                            {partner.name}
                          </p>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            Exporter
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <p className="text-xs text-gray-500">{partner.country}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Product</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {details.productName}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Category: {details.productCategory}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Terms</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {details.incoterm}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Contract Ref: {details.contractReference}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Financing Terms Card */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Financing Terms</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#00B0F5] bg-opacity-10 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-[#00B0F5]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">External Financing</p>
                        <p className="text-xs text-gray-500">Provided by KAYP Finance</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {selectedOption?.fee}% fee
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Repayment Term</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {selectedOption?.label}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <Calculator className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-500">Financing Amount</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {new Intl.NumberFormat('en-EU', { style: 'currency', currency: details.currency }).format(financingAmount)}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Financing Fee ({selectedOption?.fee}%)</span>
                      <span className="font-medium text-gray-900">
                        {new Intl.NumberFormat('en-EU', { style: 'currency', currency: details.currency }).format(financingFee)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-gray-900">Total Amount to Repay</span>
                      <span className="text-gray-900">
                        {new Intl.NumberFormat('en-EU', { style: 'currency', currency: details.currency }).format(totalAmount)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Important Notice</p>
                      <p className="mt-1">
                        By accepting these terms, you agree to repay the total amount of {' '}
                        {new Intl.NumberFormat('en-EU', { style: 'currency', currency: details.currency }).format(totalAmount)} {' '}
                        within {selectedOption?.label} of the transaction date.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={isConfirmed}
                        onCheckedChange={(checked) => setIsConfirmed(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="terms"
                          className="text-sm text-gray-900 font-medium"
                        >
                          I confirm and accept the financing terms
                        </Label>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                      <p className="text-sm text-blue-700">
                        By confirming, you authorize KAYP and its partners to proceed with the selected financing option.
                      </p>
                    </div>

                    <Button
                      onClick={handleConfirm}
                      disabled={!isConfirmed}
                      className="w-full bg-[#00B0F5]"
                    >
                      Confirm Financing
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};