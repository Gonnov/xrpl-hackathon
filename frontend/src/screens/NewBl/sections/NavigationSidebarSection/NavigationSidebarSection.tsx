import {
  BellIcon,
  HelpCircleIcon,
  HomeIcon,
  FileText,
  SettingsIcon,
} from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";

const mainMenuItems = [
  { icon: <HomeIcon className="w-5 h-5" />, label: "Dashboard", path: "/" },
  { icon: <FileText className="w-5 h-5" />, label: "Create Transaction", path: "/contract" },
];

const bottomMenuItems = [
  { icon: <HelpCircleIcon className="w-5 h-5" />, label: "Help and support" },
  { icon: <SettingsIcon className="w-5 h-5" />, label: "Settings" },
];

export const NavigationSidebarSection = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="w-[260px] flex-shrink-0 flex flex-col bg-[#e5e6e8] border-r border-[#eff0f2]">
      <div className="h-14 flex items-center px-4 border-b border-gray-200">
        <img src="/Logo.png" alt="KAYP" className="h-8 w-8 object-contain" />
      </div>
      <div className="flex-1 flex flex-col gap-4 pt-4 px-4">
        <div className="flex flex-col gap-0.5">
          {mainMenuItems.map((item, index) => (
            <div
              key={index}
              className="flex h-8 items-center"
              onClick={() => item.path && navigate(item.path)}
            >
              <div 
                className={`flex h-8 items-center pl-0 pr-2 py-0 flex-1 grow rounded-lg hover:bg-neutralbackgroundsoft cursor-pointer ${
                  (location.pathname === item.path || 
                   (item.path === "/contract" && ["/contract", "/notification", "/documents", "/verification", "/summary"].includes(location.pathname)))
                    ? "bg-[#00B0F5] text-white" 
                    : ""
                }`}
              >
                <div className="flex items-center pl-2 pr-0 py-0 flex-1 self-stretch grow">
                  <div className="flex items-center gap-2 flex-1 grow">
                    {item.icon}
                    <div className={`flex-1 mt-[-1.00px] font-menu-item font-[number:var(--menu-item-font-weight)] ${
                      (location.pathname === item.path || 
                       (item.path === "/contract" && ["/contract", "/notification", "/documents", "/verification", "/summary"].includes(location.pathname)))
                        ? "text-white" 
                        : "text-neutraltextbold"
                    } text-[length:var(--menu-item-font-size)] tracking-[var(--menu-item-letter-spacing)] leading-[var(--menu-item-line-height)] [font-style:var(--menu-item-font-style)]`}>
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-4">
        <div className="flex flex-col gap-0.5">
          {bottomMenuItems.map((item, index) => (
            <div
              key={index}
              className="flex h-8 items-center"
            >
              <div className="flex h-8 items-center pl-0 pr-2 py-0 flex-1 grow rounded-lg hover:bg-neutralbackgroundsoft cursor-pointer">
                <div className="flex items-center pl-2 pr-0 py-0 flex-1 self-stretch grow">
                  <div className="flex items-center gap-2 flex-1 grow">
                    {item.icon}
                    <div className="flex-1 mt-[-1.00px] font-menu-item font-[number:var(--menu-item-font-weight)] text-neutraltextbold text-[length:var(--menu-item-font-size)] tracking-[var(--menu-item-letter-spacing)] leading-[var(--menu-item-line-height)] [font-style:var(--menu-item-font-style)]">
                      {item.label}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};