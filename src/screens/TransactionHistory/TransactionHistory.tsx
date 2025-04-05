import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  HomeIcon,
  FileText,
  History,
  HelpCircleIcon,
  SettingsIcon,
  ChevronDown,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";

const transactions = [
  {
    id: "TR-2024-001",
    type: "Import",
    counterparty: "CMA CGM",
    commodity: "Electronics",
    amount: "€45,000",
    status: "In Progress",
    date: "2024-01-15"
  },
  {
    id: "TR-2024-002",
    type: "Export",
    counterparty: "Maersk Line",
    commodity: "Textiles",
    amount: "€32,000",
    status: "Completed",
    date: "2024-01-14"
  },
  {
    id: "TR-2024-003",
    type: "Import",
    counterparty: "MSC",
    commodity: "Machinery",
    amount: "€78,000",
    status: "Pending",
    date: "2024-01-13"
  }
];

const navItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <FileText className="w-5 h-5" />, label: "Create Transaction", path: "/create-transaction" },
  { icon: <History className="w-5 h-5" />, label: "Transaction History", path: "/transaction-history", active: true },
];

const bottomNavItems = [
  { icon: <HelpCircleIcon className="w-5 h-5" />, label: "Help and support" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings" },
];

export const TransactionHistory = () => {
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
          <h1 className="text-lg font-semibold text-gray-900">Transaction History</h1>
          
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
                    placeholder="Search transactions..." 
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Transactions Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Transaction ID</span>
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
                          <span className="text-xs font-medium text-gray-500">Counterparty</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Commodity</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium text-gray-500">Amount</span>
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
                          <span className="text-xs font-medium text-gray-500">Date</span>
                          <ArrowUpDown className="w-3 h-3 text-gray-400" />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr 
                        key={transaction.id} 
                        className="border-b border-gray-200 cursor-pointer hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{transaction.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{transaction.type}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{transaction.counterparty}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{transaction.commodity}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{transaction.amount}</span>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={
                              transaction.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : transaction.status === "In Progress"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-500">{transaction.date}</span>
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