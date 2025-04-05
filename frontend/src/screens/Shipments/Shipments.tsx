import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  HomeIcon,
  ShipIcon,
  PiggyBankIcon,
  HelpCircleIcon,
  SettingsIcon,
  ChevronDown,
  Plus,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

const shipments = [
  {
    id: "SH-2024-001",
    type: "Import",
    origin: "Shanghai, China",
    destination: "Le Havre, France",
    status: "In Transit",
    eta: "2024-02-15",
    carrier: "CMA CGM",
    documents: ["B/L", "Invoice"],
  },
  {
    id: "SH-2024-002",
    type: "Export",
    origin: "Marseille, France",
    destination: "Dubai, UAE",
    status: "Pending",
    eta: "2024-02-20",
    carrier: "Maersk",
    documents: ["Invoice"],
  },
  {
    id: "SH-2024-003",
    type: "Import",
    origin: "Rotterdam, Netherlands",
    destination: "Abidjan, Ivory Coast",
    status: "Completed",
    eta: "2024-02-10",
    carrier: "MSC",
    documents: ["B/L", "Invoice", "Packing List"],
  },
];

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

export const Shipments = () => {
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
          <h1 className="text-lg font-semibold text-gray-900">Shipments</h1>
          
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
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input 
                    placeholder="Search shipments..." 
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
              <Button onClick={() => navigate("/new-bl")} className="bg-[#00B0F5]">
                <Plus className="w-4 h-4 mr-2" />
                New Shipment
              </Button>
            </div>

            {/* Shipments Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Shipment ID</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Type</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Origin</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Destination</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Status</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Documents</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipments.map((shipment) => (
                      <tr 
                        key={shipment.id} 
                        className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                        onClick={() => navigate(`/shipments/${shipment.id}`)}
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{shipment.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{shipment.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{shipment.origin}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{shipment.destination}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={
                              shipment.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : shipment.status === "In Transit"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {shipment.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {shipment.documents.map((doc, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="bg-gray-50 text-gray-700 border-gray-200"
                              >
                                {doc}
                              </Badge>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};