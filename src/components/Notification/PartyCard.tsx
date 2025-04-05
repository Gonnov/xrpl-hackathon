import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PartyCardProps {
  role: "Importer" | "Exporter";
  name: string;
  company: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export const PartyCard: React.FC<PartyCardProps> = ({
  role,
  name,
  company,
  email,
  phone,
  avatarUrl,
}) => {
  return (
    <Card className="p-3">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#00B0F5] text-white text-sm font-medium">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
            <Badge 
              variant="outline" 
              className={
                role === "Exporter" 
                  ? "bg-blue-50 text-blue-700 border-blue-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }
            >
              {role}
            </Badge>
          </div>
          
          <p className="text-xs text-gray-500 mb-1">{company}</p>
          
          <div className="text-xs text-gray-600 space-y-0.5">
            <div>{email}</div>
            <div>{phone}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};