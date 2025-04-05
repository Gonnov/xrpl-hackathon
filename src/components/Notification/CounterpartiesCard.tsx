import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CounterpartyInfo {
  role: "Importer" | "Exporter";
  name: string;
  company: string;
  email: string;
  phone: string;
}

interface CounterpartiesCardProps {
  importer: CounterpartyInfo;
  exporter: CounterpartyInfo;
}

export const CounterpartiesCard: React.FC<CounterpartiesCardProps> = ({
  importer,
  exporter,
}) => {
  const renderParty = (party: CounterpartyInfo) => (
    <div className="flex-1">
      <div className="flex items-start gap-2">
        <span className="text-lg">{party.role === "Exporter" ? "🏢" : "🌍"}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 truncate">{party.name}</h3>
            <Badge 
              variant="outline" 
              className={
                party.role === "Exporter" 
                  ? "bg-blue-50 text-blue-700 border-blue-200 ml-2"
                  : "bg-green-50 text-green-700 border-green-200 ml-2"
              }
            >
              {party.role === "Exporter" ? "🔵 Exporter" : "🟢 Importer"}
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{party.company}</p>
          <div className="mt-1.5 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">📧</span>
              <span className="text-xs text-gray-600">{party.email}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">☎️</span>
              <span className="text-xs text-gray-600">{party.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-3">
      <div className="flex">
        {renderParty(exporter)}
        <div className="mx-3 w-px bg-gray-200 self-stretch" />
        {renderParty(importer)}
      </div>
    </Card>
  );
};