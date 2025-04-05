import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface ShipmentMapProps {
  shipmentId: string;
  amount: string;
  weight: string;
  volume: string;
  status: string;
  departure: {
    location: string;
    country: string;
  };
  destination: {
    location: string;
    country: string;
  };
}

export const ShipmentMap: React.FC<ShipmentMapProps> = ({
  shipmentId,
  amount,
  weight,
  volume,
  status,
  departure,
  destination,
}) => {
  return (
    <Card className="p-3">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h2 className="text-sm font-medium text-gray-900">{shipmentId}</h2>
          <p className="text-xs text-gray-500">
            {amount} • {weight} • {volume}
          </p>
        </div>
        <Badge
          variant="outline"
          className={
            status === "Finalized"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }
        >
          {status}
        </Badge>
      </div>

      <div className="w-full mb-2">
        <img 
          src="https://maps.geoapify.com/v1/staticmap?style=maptiler-3d&width=600&height=300&center=lonlat:-6.5,22.5&zoom=1.9&marker=lonlat:106.660172,10.762622;color:%23ff0000;size:medium;text:A|lonlat:-118.2641,33.7381;color:%23ff0000;size:medium;text:B&apiKey=712a16e26894479c884af200421e4af4" 
          alt="Shipping map"
          className="w-full h-[240px] object-cover rounded-md shadow"
        />
      </div>

      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#007AFF] flex items-center justify-center">
            <MapPin className="w-2.5 h-2.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">{departure.location}</p>
            <p className="text-[10px] text-gray-500">{departure.country}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#007AFF] flex items-center justify-center">
            <MapPin className="w-2.5 h-2.5 text-white" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-900">{destination.location}</p>
            <p className="text-[10px] text-gray-500">{destination.country}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};