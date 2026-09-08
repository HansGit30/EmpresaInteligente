import React, { useEffect, useState } from 'react';

interface ClasificacionProps {
  totalComentarios?: number;
  precision?: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const Clasificacion: React.FC<ClasificacionProps> = ({ 
  totalComentarios: propTotal = 0, 
  precision: propPrecision = 0 
}) => {
  const [total, setTotal] = useState<number>(propTotal);
  const [precision, setPrecision] = useState<number>(propPrecision);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (propTotal > 0) {
      setTotal(propTotal);
      setPrecision(propPrecision);
      return;
    }

    setLoading(true);
    fetch(`${API_URL}/comentarios/`)
      .then((res) => res.json())
      .then((response) => {
        const data = Array.isArray(response)
          ? response
          : (response.data || response.comentarios || response.results || []);

        if (Array.isArray(data)) {
          const totalComentarios = data.length;
          setTotal(totalComentarios);

          if (totalComentarios > 0) {
            const procesados = data.filter(
              (item: any) => item.procesado === true || item.categoria || item.sentimiento
            ).length;
            const porcentaje = Math.round((procesados / totalComentarios) * 100);
            setPrecision(porcentaje);
          }
        }
      })
      .catch((err) => console.error('Error en Clasificacion:', err))
      .finally(() => setLoading(false));
  }, [propTotal, propPrecision]);

  if (loading) {
    return <div style={{ padding: '20px', color: '#667085' }}>Calculando métricas...</div>;
  }

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ marginTop: 0 }}>Métricas de Clasificación</h3>
      <p style={{ color: '#667085' }}>Resumen del rendimiento del modelo NLTK en los comentarios registrados.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#027a48' }}>{precision}%</h2>
          <span style={{ fontSize: '12px', color: '#667085' }}>Precisión global</span>
        </div>
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#101828' }}>{total}</h2>
          <span style={{ fontSize: '12px', color: '#667085' }}>Comentarios procesados</span>
        </div>
      </div>
    </div>
  );
};