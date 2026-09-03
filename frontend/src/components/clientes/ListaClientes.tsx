import React from 'react';
import { Card } from '../ui/Card';

const mockClientes = [
  { id: 1, nombre: 'Empresa Alpha', contacto: 'juan@alpha.com', estado: 'Activo', registro: '2026-01-15' },
  { id: 2, nombre: 'Servicios Beta', contacto: 'maria@beta.com', estado: 'Inactivo', registro: '2026-02-01' },
  { id: 3, nombre: 'Logística Gamma', contacto: 'carlos@gamma.com', estado: 'Activo', registro: '2026-02-18' },
];

export const ListaClientes: React.FC = () => (
  <Card>
    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
      Lista de Clientes
    </h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
          <th style={{ padding: '8px' }}>Nombre</th>
          <th style={{ padding: '8px' }}>Contacto</th>
          <th style={{ padding: '8px' }}>Estado</th>
          <th style={{ padding: '8px' }}>Fecha Registro</th>
        </tr>
      </thead>
      <tbody>
        {mockClientes.map((cliente) => (
          <tr key={cliente.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
            <td style={{ padding: '12px 8px', fontWeight: '500', color: '#0f172a' }}>{cliente.nombre}</td>
            <td style={{ padding: '12px 8px', color: '#475569' }}>{cliente.contacto}</td>
            <td style={{ padding: '12px 8px' }}>
              <span style={{
                backgroundColor: cliente.estado === 'Activo' ? '#dcfce7' : '#fee2e2',
                color: cliente.estado === 'Activo' ? '#15803d' : '#b91c1c',
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {cliente.estado}
              </span>
            </td>
            <td style={{ padding: '12px 8px', color: '#64748b' }}>{cliente.registro}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </Card>
);