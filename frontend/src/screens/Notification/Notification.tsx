import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import { DocumentStepper } from "../NewBl/sections/DocumentStepper";
import { ShipmentMap } from "@/components/Notification/ShipmentMap";
import { TransactionRecap } from "@/components/Notification/TransactionRecap";
import { CounterpartiesCard } from "@/components/Notification/CounterpartiesCard";
import { WorkflowNavigation } from "@/components/WorkflowNavigation";
import { useTransactionStore } from '@/stores/useTransactionStore';

const transactionData = {
  shipment: {
    id: "VNVCL - ELECTRONICS - 0325",
    amount: "€350,000",
    weight: "5T",
    volume: "6m³",
    status: "Finalized",
    departure: {
      location: "Ho Chi Minh City",
      country: "Vietnam"
    },
    destination: {
      location: "Los Angeles",
      country: "California, USA"
    }
  },
  counterparty: {
    role: "Importer",
    name: "Silicon West Corp",
    company: "California Tech Hub",
    email: "import@siliconwest.com",
    phone: "+1 213 555 9876"
  },
  sender: {
    role: "Exporter",
    name: "Saigon SemiTech",
    company: "Vietnam HighTech Cluster",
    email: "export@saigonsemitech.vn",
    phone: "+84 28 9999 1234"
  },
  transaction: {
    product: "Electronic Components – Mixed ICs and PCB modules",
    incoterm: "DAP",
    value: "€350,000",
    deliveryTimeline: {
      departure: "2024-04-15",
      arrival: "2024-05-01"
    },
    insurance: {
      provider: "Zurich TradeCover",
      reference: "ZTC-99887766"
    },
    transport: {
      mode: "Sea Freight",
      departure: "Ho Chi Minh City Port",
      destination: "Port of Los Angeles, CA"
    }
  }
};

export const Notification = () => {
  const navigate = useNavigate();
  const { userRole, details, setConfirmed } = useTransactionStore();

  const handleContinue = () => {
    setConfirmed(true);
    
    if (userRole === 'Importer') {
      // Route based on funding method for importers
      if (details.fundingMethod === 'financed') {
        navigate('/financing');
      } else {
        navigate('/payment');
      }
    } else {
      // Exporters always go to documents
      navigate('/documents');
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
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Header */}
              <div className="mb-2">
                <h1 className="text-2xl font-semibold text-gray-900">Notification</h1>
                <p className="mt-1 text-sm text-gray-500">
                  We've notified your business partner and summarized the shared contract terms.
                </p>
              </div>

              {/* Route Overview Title */}
              <h2 className="text-lg font-medium text-gray-900">Route Overview</h2>

              {/* Content Split View */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Shipment Map */}
                  <ShipmentMap
                    shipmentId={transactionData.shipment.id}
                    amount={transactionData.shipment.amount}
                    weight={transactionData.shipment.weight}
                    volume={transactionData.shipment.volume}
                    status={transactionData.shipment.status}
                    departure={transactionData.shipment.departure}
                    destination={transactionData.shipment.destination}
                  />

                  {/* Counterparties Section */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-900 mb-2">🤝 Counterparties</h2>
                    <CounterpartiesCard
                      importer={transactionData.counterparty}
                      exporter={transactionData.sender}
                    />
                  </div>
                </div>

                {/* Right Column - Transaction Recap */}
                <TransactionRecap {...transactionData.transaction} />
              </div>
            </div>
          </div>

          <WorkflowNavigation 
            isValid={true} 
            onContinue={handleContinue}
          />
        </main>
      </div>
    </div>
  );
};