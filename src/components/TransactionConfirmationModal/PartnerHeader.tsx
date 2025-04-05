import React from "react";
import { Badge } from "@/components/ui/badge";
import { Building2, Mail, Phone, Globe } from "lucide-react";

interface PartnerHeaderProps {
  name: string;
  role: "Importer" | "Exporter";
  email: string;
  phone: string;
  country: string;
}

export const PartnerHeader: React.FC<PartnerHeaderProps> = ({
  name,
  role,
  email,
  phone,
  country,
}) => {
  return (
    <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
      {/* Avatar/Logo */}
      <div className="w-12 h-12 bg-[#00B0F5] rounded-lg flex items-center justify-center text-white text-xl font-medium">
        {name.charAt(0)}
      </div>

      {/* Partner Info */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <Badge 
            variant="outline" 
            className={
              role === "Exporter" 
                ? "bg-blue-50 text-blue-700 border-blue-200" 
                : "bg-purple-50 text-purple-700 border-purple-200"
            }
          >
            {role}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4" />
            <span className="text-sm">{country}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4" />
            <span className="text-sm">{email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Globe className="w-4 h-4" />
            <span className="text-sm">{country}</span>
          </div>
        </div>
      </div>
    </div>
  );
};