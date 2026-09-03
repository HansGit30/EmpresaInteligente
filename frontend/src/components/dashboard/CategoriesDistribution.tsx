import React from 'react';
import { Card } from '../ui/Card';

const categories = [
  { name: 'Soporte', percentage: '42%', color: '#2563eb' },
  { name: 'Ventas', percentage: '27%', color: '#16a34a' },
  { name: 'Reclamos', percentage: '18%', color: '#dc2626' },
];

export const CategoriesDistribution: React.FC = () => (
  <Card style={{ flex: 1 }}>
    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '20px' }}>
      CATEGORÍAS NLP
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {categories.map((item) => (
        <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '14px', color: '#334155', fontWeight: '500' }}>{item.name}</span>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: item.color }}>{item.percentage}</span>
        </div>
      ))}
    </div>
  </Card>
);