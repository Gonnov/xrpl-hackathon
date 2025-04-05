import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import { FileDown, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import { TransactionAmountCard } from "./components/TransactionAmountCard";
import { ShipmentTrackingCard } from "./components/ShipmentTrackingCard";
import { ShipmentTimelineCard } from "./components/ShipmentTimelineCard";
import { ContractDetailsCard } from "./components/ContractDetailsCard";
import { PaymentFlowCard } from "./components/PaymentFlowCard";
import { useTransactionStore } from "@/stores/useTransactionStore";

const summaryData = {
  transaction: {
    amount: "€350,000",
    escrowFundedAt: "2025-03-13",
    fundsReleasedAt: "2025-03-15",
    status: "Funds Released"
  },
  shipment: {
    departure: {
      location: "Ho Chi Minh City",
      country: "Vietnam"
    },
    destination: {
      location: "Los Angeles",
      country: "California, USA"
    }
  },
  timeline: [
    {
      icon: "📝",
      title: "Transaction created",
      timestamp: "2025-03-12 09:14",
      description: "You created a new transaction with Nexcom Electronics for the export of electronic components."
    },
    {
      icon: "📨",
      title: "Invitation sent to partner",
      timestamp: "2025-03-12 09:16",
      description: "The importer was notified via email and WhatsApp."
    },
    {
      icon: "✅",
      title: "Partner confirmed transaction",
      timestamp: "2025-03-12 10:42",
      description: "Nexcom Electronics accepted the transaction and confirmed the contract terms."
    },
    {
      icon: "💳",
      title: "Funds deposited to escrow",
      timestamp: "2025-03-13 08:03",
      description: "Importer sent 18,000 EUR to escrow account. Funds are secured."
    },
    {
      icon: "📦",
      title: "Shipping documents submitted",
      timestamp: "2025-03-15 17:28",
      description: "Exporter uploaded the Bill of Lading, Invoice, and Packing List for verification."
    },
    {
      icon: "🤖",
      title: "Documents verified by KAYP AI",
      timestamp: "2025-03-15 18:02",
      description: "AI verification succeeded. No discrepancies found."
    },
    {
      icon: "🔓",
      title: "Funds released to exporter",
      timestamp: "2025-03-15 18:07",
      description: "Escrow released funds to the exporter. Payment confirmed."
    },
    {
      icon: "📨",
      title: "Documents transferred to importer",
      timestamp: "2025-03-15 18:08",
      description: "Verified documents shared with importer to claim cargo."
    },
    {
      icon: "🚚",
      title: "Cargo in transit",
      timestamp: "2025-03-16 08:00",
      description: "Shipment has left Ho Chi Minh Port and is en route to California."
    }
  ],
  contract: {
    reference: "CONT-2024-001",
    incoterm: "DAP",
    product: {
      name: "Mixed ICs and PCB modules",
      category: "Electronics",
      description: "Electronic Components – Mixed ICs and PCB modules for automotive applications"
    },
    parties: {
      exporter: {
        name: "Saigon SemiTech",
        country: "Vietnam"
      },
      importer: {
        name: "Silicon West Corp",
        country: "United States"
      }
    },
    transport: {
      mode: "Sea Freight",
      departure: "Ho Chi Minh City Port",
      arrival: "Port of Los Angeles"
    },
    insurance: {
      provider: "Zurich TradeCover",
      reference: "ZTC-99887766"
    }
  },
  payment: {
    steps: [
      {
        stage: "Escrow Created",
        timestamp: "2025-03-12",
        completed: true
      },
      {
        stage: "Funds Received",
        timestamp: "2025-03-13",
        completed: true
      },
      {
        stage: "Documents Verified",
        timestamp: "2025-03-15",
        completed: true
      },
      {
        stage: "Funds Released",
        timestamp: "2025-03-15",
        completed: true
      }
    ]
  }
};

export const Summary = () => {
  const navigate = useNavigate();
  const { userRole, details, escrowFunded, financingConfirmed, documentsVerified } = useTransactionStore();

  useEffect(() => {
    // Check if the user has completed the necessary steps
    const hasValidFlow = userRole === 'Importer'
      ? (details.fundingMethod === 'financed' ? financingConfirmed : escrowFunded)
      : documentsVerified;

    if (!hasValidFlow) {
      console.log('Invalid flow detected, redirecting to dashboard');
      navigate('/');
    }
  }, [userRole, details, escrowFunded, financingConfirmed, documentsVerified, navigate]);

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
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Header with Success Message and Export Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <p className="text-sm text-gray-600">
                    Your transaction has been completed and archived. You can track delivery and payment in this summary.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <FileDown className="w-4 h-4 mr-2" />
                  Export Transaction Summary (PDF)
                </Button>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-5 gap-6">
                {/* Left Column - 60% */}
                <div className="col-span-3 space-y-6">
                  <TransactionAmountCard {...summaryData.transaction} />
                  <ShipmentTrackingCard {...summaryData.shipment} />
                  <ShipmentTimelineCard timeline={summaryData.timeline} />
                </div>

                {/* Right Column - 40% */}
                <div className="col-span-2 space-y-6">
                  <PaymentFlowCard steps={summaryData.payment.steps} />
                  <ContractDetailsCard contract={summaryData.contract} />
                </div>
              </div>
            </div>
          </div>

          <WorkflowNavigation />
        </main>
      </div>
    </div>
  );
};