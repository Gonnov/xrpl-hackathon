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
  User,
  Building2,
  CreditCard,
  Bell as BellIcon,
  Shield,
  Languages
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";

const navItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <ShipIcon className="w-5 h-5" />, label: "Shipments", path: "/shipments" },
  { icon: <PiggyBankIcon className="w-5 h-5" />, label: "Financials", path: "/financials" },
  { icon: <Bell className="w-5 h-5" />, label: "Alerts", badge: "2" },
];

const bottomNavItems = [
  { icon: <HelpCircleIcon className="w-5 h-5" />, label: "Help and support" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings", path: "/settings", active: true },
];

const settingsSections = [
  {
    icon: <User className="w-5 h-5" />,
    title: "Account Settings",
    description: "Manage your account information",
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: "Company Profile",
    description: "Update your company details",
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: "Billing & Payments",
    description: "Manage your payment methods and billing history",
  },
  {
    icon: <BellIcon className="w-5 h-5" />,
    title: "Notifications",
    description: "Configure your notification preferences",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Security",
    description: "Manage your security settings",
  },
  {
    icon: <Languages className="w-5 h-5" />,
    title: "Language & Region",
    description: "Set your preferred language and regional settings",
  },
];

export const Settings = () => {
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-14 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Settings</h1>
          
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
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-6">
              {settingsSections.map((section, index) => (
                <Card
                  key={index}
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#00B0F5] bg-opacity-10 rounded-lg flex items-center justify-center">
                      {React.cloneElement(section.icon, { className: "w-5 h-5 text-[#00B0F5]" })}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};