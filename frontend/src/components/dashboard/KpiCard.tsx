import React from 'react';
import { Card } from '../ui/Card';

interface KpiCardProps {
  title: string;
  value: string | number;
  changeText?: string;
  highlight?: boolean;
}

export const KpiCard: React.FC<KpiCardProps> = ({ title, value, changeText, highlight }) => (
  <Card style={{
    backgroundColor: highlight ? '#14532d' : '#ffffff',
    color: highlight ? '#ffffff' : '#0f172a',
    flex: 1
  }}>
    <span style={{ fontSize: '13px', color: highlight ? '#86efac' : '#64748b', fontWeight: '500' }}>
      {title}
    </span>
    <h2 style={{ fontSize: '28px', fontWeight: 'bold', margin: '8px 0' }}>{value}</h2>
    {changeText && (
      <span style={{ fontSize: '11px', color: highlight ? '#bbf7d0' : '#16a34a' }}>
        {changeText}
      </span>
    )}
  </Card>
);