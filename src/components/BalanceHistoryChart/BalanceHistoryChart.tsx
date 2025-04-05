import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

interface DataPoint {
  date: string;
  value: number;
}

interface BalanceHistoryChartProps {
  period: '7d' | '30d' | '90d';
}

const mockData = {
  '7d': [
    { date: '2025-03-01', value: 312000 },
    { date: '2025-03-02', value: 328400 },
    { date: '2025-03-03', value: 309200 },
    { date: '2025-03-04', value: 347800 },
    { date: '2025-03-05', value: 331000 },
    { date: '2025-03-06', value: 360200 },
    { date: '2025-03-07', value: 345800 }
  ],
  '30d': [
    { date: '2025-02-06', value: 280000 },
    { date: '2025-02-10', value: 315000 },
    { date: '2025-02-14', value: 288000 },
    { date: '2025-02-18', value: 340000 },
    { date: '2025-02-22', value: 305000 },
    { date: '2025-02-26', value: 358000 },
    { date: '2025-03-02', value: 318400 },
    { date: '2025-03-07', value: 345800 }
  ],
  '90d': [
    { date: '2024-12-07', value: 180000 },
    { date: '2024-12-21', value: 240000 },
    { date: '2025-01-04', value: 265000 },
    { date: '2025-01-18', value: 298000 },
    { date: '2025-02-01', value: 320000 },
    { date: '2025-02-15', value: 355000 },
    { date: '2025-03-01', value: 340000 },
    { date: '2025-03-07', value: 345800 }
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(value);
};

export const BalanceHistoryChart: React.FC<BalanceHistoryChartProps> = ({ period }) => {
  const data = useMemo(() => mockData[period], [period]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">
            {format(new Date(label), 'MMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Calculate min and max for better Y-axis distribution
  const minValue = Math.min(...data.map(d => d.value));
  const maxValue = Math.max(...data.map(d => d.value));
  const padding = (maxValue - minValue) * 0.15; // Increased padding for better amplitude
  const domain = [minValue - padding, maxValue + padding];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 5, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00B0F5" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#00B0F5" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false} 
          stroke="#E5E7EB"
          opacity={0.5}
        />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => format(new Date(value), period === '7d' ? 'MMM dd' : 'MMM dd')}
          stroke="#6B7280"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          dy={8}
          tick={{ fill: '#6B7280' }}
        />
        <YAxis
          stroke="#6B7280"
          fontSize={12}
          tickFormatter={(value) => formatCurrency(value)}
          tickLine={false}
          axisLine={false}
          dx={-10}
          tick={{ fill: '#6B7280' }}
          domain={domain}
          width={80}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ 
            stroke: '#00B0F5',
            strokeWidth: 1,
            strokeDasharray: '5 5',
            opacity: 0.5
          }}
        />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#00B0F5"
          strokeWidth={3}
          fill="url(#colorValue)"
          dot={false}
          activeDot={{ 
            r: 6, 
            fill: '#FFFFFF',
            stroke: '#00B0F5',
            strokeWidth: 2
          }}
          animationDuration={750}
          animationEasing="ease-in-out"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};