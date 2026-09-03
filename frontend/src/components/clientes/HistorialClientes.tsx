import React, { useEffect, useState } from 'react';
import { Card } from '../ui/Card';

interface ClienteHistorial {
  id: number;
  nombre: string;
  empresa: string | null;
  created_at: string;
}

export const HistorialClientes: React.FC = () => {
  const [historial, setHistorial] = useState<ClienteHistorial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/clientes/historial');
        if (!response.ok) throw new Error('Error al obtener el historial');
        const data = await response.json();
        setHistorial(data);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  return (
    <Card>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
        Historial de Actividad
      </h3>

      {loading ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando historial...</p>
      ) : historial.length === 0 ? (
        <p style={{ color: '#64748b', fontSize: '14px' }}>No hay registros en el historial.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {historial.map((item) => (
            <div key={item.id} style={{ borderLeft: '3px solid #14532d', paddingLeft: '12px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>
                Registro inicial
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {item.empresa ? `${item.empresa} (${item.nombre})` : item.nombre} • {new Date(item.created_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};