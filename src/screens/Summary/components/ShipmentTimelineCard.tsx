import React from "react";
import { Card } from "@/components/ui/card";

interface TimelineEvent {
  icon: string;
  title: string;
  timestamp: string;
  description: string;
}

interface ShipmentTimelineCardProps {
  timeline: TimelineEvent[];
}

export const ShipmentTimelineCard: React.FC<ShipmentTimelineCardProps> = ({
  timeline
}) => {
  const reversedTimeline = [...timeline].reverse();

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Activity Timeline</h2>

      <div className="relative space-y-6">
        {reversedTimeline.map((event, index) => (
          <div key={index} className="flex gap-4">
            {/* Timeline Connector - Only show between items */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-lg relative z-10">
                {event.icon}
              </div>
              {index !== reversedTimeline.length - 1 && (
                <div 
                  className="absolute left-1/2 top-8 bottom-0 w-[2px] bg-blue-100 -translate-x-1/2"
                  style={{ height: "calc(100% - 8px)" }}
                />
              )}
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0 pb-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {event.description}
                  </p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                  {event.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};