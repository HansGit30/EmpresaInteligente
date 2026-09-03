import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Card } from '../ui/Card';

const data = [
  { day: 'Lun', tiempo: 19 },
  { day: 'Mar', tiempo: 16 },
  { day: 'Mié', tiempo: 14 },
  { day: 'Jue', tiempo: 20 },
  { day: 'Vie', tiempo: 15 },
];

export const AttentionChart: React.FC = () => (
  <Card style={{ flex: 2 }}>
    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
      TIEMPOS DE ATENCIÓN
    </h3>
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="day" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} domain={[0, 25]} />
          <Tooltip />
          <Line type="monotone" dataKey="tiempo" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </Card>
);