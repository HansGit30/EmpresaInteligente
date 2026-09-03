import React from 'react';
import { Card } from '../ui/Card';

const words = ['servicio', 'atención', 'rápido', 'producto', 'soporte'];

export const FrequentWords: React.FC = () => (
  <Card style={{ marginTop: '20px' }}>
    <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
      PALABRAS MÁS FRECUENTES
    </h3>
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {words.map((word) => (
        <span
          key={word}
          style={{
            backgroundColor: '#f1f5f9',
            color: '#14532d',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            border: '1px solid #e2e8f0'
          }}
        >
          {word}
        </span>
      ))}
    </div>
  </Card>
);