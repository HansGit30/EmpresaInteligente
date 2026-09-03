import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';

// Interfaz que coincide con la estructura de la tabla en Supabase
interface Cliente {
  id: number;
  nombre: string;
  empresa: string;
  email: string;
  telefono: string | null;
  activo: boolean;
  created_at: string;
}

export const ListaClientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/clientes');
        if (!response.ok) {
          throw new Error('Error al obtener la lista de clientes');
        }
        const data = await response.json();
        setClientes(data);
      } catch (error) {
        console.error('Error al cargar clientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClientes();
  }, []);

  return (
    <Card>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
        Lista de Clientes
      </h3>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando clientes...</p>
      ) : clientes.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>No hay clientes registrados.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
              <th style={{ padding: '8px' }}>Nombre</th>
              <th style={{ padding: '8px' }}>Empresa</th>
              <th style={{ padding: '8px' }}>Contacto</th>
              <th style={{ padding: '8px' }}>Estado</th>
              <th style={{ padding: '8px' }}>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 8px', fontWeight: '500', color: '#0f172a' }}>
                  {cliente.nombre}
                </td>
                <td style={{ padding: '12px 8px', color: '#475569' }}>
                  {cliente.empresa || '-'}
                </td>
                <td style={{ padding: '12px 8px', color: '#475569' }}>
                  {cliente.email}
                </td>
                <td style={{ padding: '12px 8px' }}>
                  <span style={{
                    backgroundColor: cliente.activo ? '#dcfce7' : '#fee2e2',
                    color: cliente.activo ? '#15803d' : '#b91c1c',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                  }}>
                    {cliente.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={{ padding: '12px 8px', color: '#64748b' }}>
                  {new Date(cliente.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Card>
  );
};