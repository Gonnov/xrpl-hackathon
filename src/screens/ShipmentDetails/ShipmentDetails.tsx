import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  HomeIcon,
  ShipIcon,
  PiggyBankIcon,
  HelpCircleIcon,
  SettingsIcon,
  ChevronDown,
  ArrowLeft,
  FileText,
  Truck,
  Package,
  DollarSign,
  Clock,
  MapPin
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const shipmentDetails = {
  id: "SH-2024-001",
  type: "Import",
  status: "In Transit",
  origin: {
    port: "Shanghai Port",
    country: "China",
    departure: "2024-02-01",
  },
  destination: {
    port: "Le Havre Port",
    country: "France",
    arrival: "2024-02-15",
  },
  carrier: {
    name: "CMA CGM",
    vessel: "CMA CGM Marco Polo",
    tracking: "CMAU1234567",
  },
  cargo: {
    type: "Container",
    weight: "25,000 kg",
    volume: "40 ft",
    items: "Electronics",
  },
  documents: [
    {
      type: "Bill of Lading",
      number: "MBLHAV123456",
      status: "Verified",
      date: "2024-02-01",
    },
    {
      type: "Commercial Invoice",
      number: "INV-2024-001",
      status: "Pending",
      date: "2024-02-01",
    },
    {
      type: "Packing List",
      number: "PL-2024-001",
      status: "Verified",
      date: "2024-02-01",
    },
  ],
  timeline: [
    {
      date: "2024-02-01",
      event: "Departed from Shanghai Port",
      status: "Completed",
    },
    {
      date: "2024-02-05",
      event: "Arrived at Singapore Port",
      status: "Completed",
    },
    {
      date: "2024-02-07",
      event: "Departed from Singapore Port",
      status: "Completed",
    },
    {
      date: "2024-02-15",
      event: "Expected arrival at Le Havre Port",
      status: "Pending",
    },
  ],
};

const navItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <ShipIcon className="w-5 h-5" />, label: "Shipments", path: "/shipments", active: true },
  { icon: <PiggyBankIcon className="w-5 h-5" />, label: "Financials", path: "/financials" },
  { icon: <Bell className="w-5 h-5" />, label: "Alerts", badge: "2" },
];

const bottomNavItems = [
  { icon: <HelpCircleIcon className="w-5 h-5" />, label: "Help and support" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings", path: "/settings" },
];

export const ShipmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200">
        <div className="h-14 flex items-center px-4 border-b border-gray-200">
          <img src="/exclude.svg" alt="Kayp" className="h-8" />
        </div>
        
        <nav className="p-2 space-y-1">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg ${
                item.active 
                  ? "bg-[#00B0F5] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.badge && (
                <Badge className="ml-auto bg-red-500 text-white">{item.badge}</Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-64 p-2 border-t border-gray-200">
          {bottomNavItems.map((item, index) => (
            <button
              key={index}
              onClick={() => item.path && navigate(item.path)}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/shipments")}
              className="text-gray-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shipments
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                Shipment {shipmentDetails.id}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-gray-700">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#00B0F5] rounded-lg flex items-center justify-center text-white font-medium">
                CN
              </div>
              <span className="text-sm font-medium text-gray-900">Company Name</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-6">
              {/* Main Info */}
              <div className="col-span-8 space-y-6">
                {/* Status Card */}
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 mb-2"
                      >
                        {shipmentDetails.status}
                      </Badge>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {shipmentDetails.cargo.items}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {shipmentDetails.carrier.vessel}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Estimated Arrival</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {shipmentDetails.destination.arrival}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Cargo Type</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.cargo.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.cargo.weight}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Volume</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.cargo.volume}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tracking Number</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.carrier.tracking}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Timeline */}
                <Card className="p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Shipment Timeline
                  </h3>
                  <div className="space-y-6">
                    {shipmentDetails.timeline.map((event, index) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className={`w-2 h-2 mt-2 rounded-full ${
                          event.status === "Completed" ? "bg-[#00B0F5]" : "bg-gray-300"
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.event}
                          </p>
                          <p className="text-sm text-gray-500">
                            {event.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Side Info */}
              <div className="col-span-4 space-y-6">
                {/* Documents */}
                <Card className="p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Documents
                  </h3>
                  <div className="space-y-4">
                    {shipmentDetails.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {doc.type}
                            </p>
                            <p className="text-xs text-gray-500">
                              {doc.number}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            doc.status === "Verified"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Route Info */}
                <Card className="p-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-4">
                    Route Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">Origin</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.origin.port}, {shipmentDetails.origin.country}
                      </p>
                      <p className="text-xs text-gray-500">
                        Departure: {shipmentDetails.origin.departure}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        {shipmentDetails.destination.port}, {shipmentDetails.destination.country}
                      </p>
                      <p className="text-xs text-gray-500">
                        Arrival: {shipmentDetails.destination.arrival}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};