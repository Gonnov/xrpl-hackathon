import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderSection } from "../NewBl/sections/HeaderSection";
import { NavigationSidebarSection } from "../NewBl/sections/NavigationSidebarSection";
import {
  ArrowUpRight,
  Plus,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BalanceHistoryChart } from "@/components/BalanceHistoryChart";
import { TransactionConfirmationModal } from "@/components/TransactionConfirmationModal";
import { NotificationCard } from "@/components/NotificationCard";
import { useToast } from "@/hooks/use-toast";

const partners = [
  { name: "Nexcom Electronics", country: "Vietnam", amount: "€180,000", percentage: 37.5, avatar: "🇻🇳" },
  { name: "Silicon Valley Tech", country: "United States", amount: "€150,000", percentage: 31.25, avatar: "🇺🇸" },
  { name: "European Chips", country: "France", amount: "€90,000", percentage: 18.75, avatar: "🇫🇷" },
  { name: "Asia Semi", country: "Singapore", amount: "€60,000", percentage: 12.5, avatar: "🇸🇬" },
];

const transactions = [
  { id: "TR-2024-001", partner: "Nexcom Electronics", amount: "€45,000", date: "2024-03-15", status: "Funds Released", role: "Exporter" },
  { id: "TR-2024-002", partner: "Silicon Valley Tech", amount: "€32,000", date: "2024-03-14", status: "Pending", role: "Importer" },
  { id: "TR-2024-003", partner: "European Chips", amount: "€28,000", date: "2024-03-13", status: "Draft", role: "Exporter" },
  { id: "TR-2024-004", partner: "AsiaTech Components", amount: "€36,000", date: "2024-03-12", status: "In Progress", role: "Exporter" },
  { id: "TR-2024-005", partner: "NeoChips Ltd.", amount: "€51,000", date: "2024-03-11", status: "Completed", role: "Importer" },
  { id: "TR-2024-006", partner: "Global Semiconductors", amount: "€42,000", date: "2024-03-10", status: "Funds Released", role: "Exporter" },
];

const notifications = [
  {
    id: 0,
    title: "You've been invited to a new transaction",
    description: "Review and confirm the contract details with Nexcom Electronics.",
    timestamp: "2m ago",
    type: "pending",
    icon: "🔔",
    action: "openModal"
  },
  {
    id: 1,
    title: "Funds received from Nexcom 🇻🇳",
    description: "€45,000 has been credited to your account",
    timestamp: "2h ago",
    type: "success",
    icon: "✅"
  },
  {
    id: 2,
    title: "Invoice corrected and approved",
    description: "Transaction #TR-2024-002 can now proceed",
    timestamp: "4h ago",
    type: "warning",
    icon: "⚠️"
  },
  {
    id: 3,
    title: "Your export to USA was delivered",
    description: "Shipment confirmed by Silicon Valley Tech",
    timestamp: "6h ago",
    type: "info",
    icon: "⏲️"
  },
];

// Sample transaction data for the modal
const sampleTransaction = {
  id: "TR-2024-004",
  senderCompany: "Nexcom Electronics",
  senderRole: "Exporter",
  createdAt: new Date(),
  value: "€350,000",
  incoterm: "DAP",
  product: {
    name: "Mixed ICs and PCB modules",
    description: "Electronic Components – Mixed ICs and PCB modules for automotive applications",
    category: "Electronics"
  },
  tradeType: "One-Off",
  insurance: {
    provider: "Zurich TradeCover",
    reference: "ZTC-99887766"
  },
  logistics: {
    mode: "Sea Freight",
    departure: {
      location: "Ho Chi Minh City Port",
      date: new Date("2024-04-15")
    },
    arrival: {
      location: "Port of Los Angeles",
      date: new Date("2024-05-01")
    }
  },
  partner: {
    role: "Exporter",
    name: "Nexcom Electronics",
    email: "export@nexcom.vn",
    phone: "+84 28 1234 5678",
    country: "Vietnam"
  }
};

export const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [chartPeriod, setChartPeriod] = useState<'7d' | '30d' | '90d'>('7d');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.action === "openModal") {
      setIsModalOpen(true);
    }
  };

  const handleConfirmTransaction = () => {
    toast({
      title: "Transaction confirmed",
      description: "The other party has been notified of your confirmation.",
    });
    setIsModalOpen(false);
  };

  const handleDeclineTransaction = () => {
    toast({
      title: "Transaction declined",
      description: "The other party has been notified of your decision.",
      variant: "destructive",
    });
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen flex flex-col">
      <HeaderSection />
      
      <div className="flex flex-1 overflow-hidden">
        <NavigationSidebarSection />
        
        <main className="flex-1 flex flex-col bg-[#f9fafb]">
          <div className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-3 gap-6">
                {/* Wallet Balance Card */}
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-sm font-medium text-gray-500">Wallet Balance</h2>
                      <div className="mt-2 flex items-baseline">
                        <span className="text-2xl font-semibold text-gray-900">€345,800</span>
                        <span className="ml-2 text-sm text-emerald-500 flex items-center">
                          <ArrowUpRight className="w-4 h-4" />
                          2.5%
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">Total transacted: €480,000</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Select defaultValue="EUR">
                        <SelectTrigger className="w-24">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="VND">VND</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="sm">
                        <ArrowDown className="w-4 h-4 mr-2" /> Withdraw
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Balance History Card */}
                <Card className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h2 className="text-sm font-medium text-gray-500">Balance History</h2>
                    <Select 
                      value={chartPeriod}
                      onValueChange={(value: '7d' | '30d' | '90d') => setChartPeriod(value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7d">7 days</SelectItem>
                        <SelectItem value="30d">30 days</SelectItem>
                        <SelectItem value="90d">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="h-[200px] w-full">
                    <BalanceHistoryChart period={chartPeriod} />
                  </div>
                </Card>

                {/* Top Business Partners Card */}
                <Card className="p-6">
                  <h2 className="text-sm font-medium text-gray-500 mb-4">Top Business Partners</h2>
                  <div className="space-y-4">
                    {partners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
                            {partner.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{partner.name}</p>
                            <p className="text-xs text-gray-500">{partner.country}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{partner.amount}</p>
                          <p className="text-xs text-gray-500">{partner.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Transactions Card */}
                <div className="col-span-2">
                  <Card>
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate("/transaction-history")}
                          >
                            View all
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                          <Button onClick={() => navigate("/contract")} className="bg-[#00B0F5]">
                            <Plus className="w-4 h-4 mr-2" />
                            New Transaction
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Partner</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Amount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Role</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((transaction) => (
                            <tr key={transaction.id} className="border-b border-gray-200">
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-gray-900">{transaction.partner}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-900">{transaction.amount}</span>
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant="outline"
                                  className={
                                    transaction.role === "Exporter"
                                      ? "bg-blue-50 text-blue-700 border-blue-200"
                                      : "bg-purple-50 text-purple-700 border-purple-200"
                                  }
                                >
                                  {transaction.role}
                                </Badge>
                              </td>
                              <td className="px-6 py-4">
                                <Badge
                                  variant="outline"
                                  className={
                                    transaction.status === "Funds Released"
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                      : transaction.status === "Pending"
                                      ? "bg-amber-50 text-amber-700 border-amber-200"
                                      : "bg-gray-50 text-gray-700 border-gray-200"
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

                {/* Notifications Card */}
                <NotificationCard
                  notifications={notifications}
                  onNotificationClick={handleNotificationClick}
                  onMarkAllAsRead={() => console.log("Mark all as read")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Transaction Confirmation Modal */}
      <TransactionConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        transaction={sampleTransaction}
        onConfirm={handleConfirmTransaction}
        onDecline={handleDeclineTransaction}
      />
    </div>
  );
};