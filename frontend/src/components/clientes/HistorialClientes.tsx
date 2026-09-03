import React from 'react';
import { Card } from '../ui/Card';

const historial = [
  { id: 1, accion: 'Actualización de contacto', cliente: 'Empresa Alpha', fecha: '2026-03-01 10:30' },
  { id: 2, accion: 'Registro inicial', cliente: 'Servicios Beta', fecha: '2026-02-01 14:15' },
];

export const HistorialClientes: React.FC = () => (
  <Card>
    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
      Historial de Actividad
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {historial.map((item) => (
        <div key={item.id} style={{ borderLeft: '3px solid #14532d', paddingLeft: '12px' }}>
          <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>{item.accion}</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>{item.cliente} • {item.fecha}</div>
        </div>
      ))}
    </div>
  </Card>
);