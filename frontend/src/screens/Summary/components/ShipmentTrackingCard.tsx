import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";

interface ShipmentTrackingCardProps {
  departure: {
    location: string;
    country: string;
  };
  destination: {
    location: string;
    country: string;
  };
}

export const ShipmentTrackingCard: React.FC<ShipmentTrackingCardProps> = ({
  departure,
  destination
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipment Tracking</h2>

      <div className="w-full mb-4">
        <img 
          src="https://maps.geoapify.com/v1/staticmap?style=maptiler-3d&width=800&height=350&center=lonlat:-6.5,22.5&zoom=1.9&marker=lonlat:106.660172,10.762622;color:%23ff0000;size:medium;text:A|lonlat:-118.2641,33.7381;color:%23ff0000;size:medium;text:B&apiKey=712a16e26894479c884af200421e4af4" 
          alt="Shipping route map"
          className="w-full h-[350px] object-cover rounded-lg shadow-sm"
        />
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{departure.location}</p>
            <p className="text-xs text-gray-500">{departure.country}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#007AFF] flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{destination.location}</p>
            <p className="text-xs text-gray-500">{destination.country}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};