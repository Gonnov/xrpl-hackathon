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
  FileText,
  Search,
  Filter
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

const documents = [
  {
    id: "DOC-2024-001",
    type: "Bill of Lading",
    reference: "MBLHAV123456",
    shipment: "SH-2024-001",
    status: "Verified",
    date: "2024-02-01",
  },
  {
    id: "DOC-2024-002",
    type: "Commercial Invoice",
    reference: "INV-2024-001",
    shipment: "SH-2024-002",
    status: "Pending",
    date: "2024-02-01",
  },
  {
    id: "DOC-2024-003",
    type: "Packing List",
    reference: "PL-2024-001",
    shipment: "SH-2024-003",
    status: "Verified",
    date: "2024-02-01",
  },
];

const navItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <ShipIcon className="w-5 h-5" />, label: "Shipments", path: "/shipments" },
  { icon: <FileText className="w-5 h-5" />, label: "Documents", path: "/documents", active: true },
  { icon: <PiggyBankIcon className="w-5 h-5" />, label: "Financials", path: "/financials" },
  { icon: <Bell className="w-5 h-5" />, label: "Alerts", badge: "2" },
];

const bottomNavItems = [
  { icon: <HelpCircleIcon className="w-5 h-5" />, label: "Help and support" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings", path: "/settings" },
];

export const Documents = () => {
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
          <h1 className="text-lg font-semibold text-gray-900">Documents</h1>
          
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
                    placeholder="Search documents..." 
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Documents Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left">
                        <span className="text-xs font-medium text-gray-500">Document Type</span>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="text-xs font-medium text-gray-500">Reference</span>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="text-xs font-medium text-gray-500">Shipment</span>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="text-xs font-medium text-gray-500">Status</span>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <span className="text-xs font-medium text-gray-500">Date</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr 
                        key={doc.id} 
                        className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-medium text-gray-900">{doc.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{doc.reference}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{doc.shipment}</span>
                        </td>
                        <td className="px-6 py-4">
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
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{doc.date}</span>
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