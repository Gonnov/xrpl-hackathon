import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: number;
  title: string;
  description: string;
  timestamp: string;
  type: string;
  icon: React.ReactNode;
  action?: string;
}

interface TransactionNotificationCardProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAllAsRead: () => void;
}

export const TransactionNotificationCard: React.FC<TransactionNotificationCardProps> = ({
  notifications,
  onNotificationClick,
  onMarkAllAsRead,
}) => {
  // Sort notifications to put transaction invites first
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (a.action === "openModal") return -1;
    if (b.action === "openModal") return 1;
    return 0;
  }).slice(0, 3); // Only show 3 notifications max

  return (
    <Card>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[#00B0F5]"
            onClick={onMarkAllAsRead}
          >
            Mark all as read
          </Button>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {sortedNotifications.map((notification) => (
          <div
            key={notification.id}
            className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onNotificationClick(notification)}
          >
            <div className="flex gap-4">
              <div className="mt-1">
                {notification.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {notification.title}
                </p>
                <p className="text-sm text-gray-500">
                  {notification.description}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {notification.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};