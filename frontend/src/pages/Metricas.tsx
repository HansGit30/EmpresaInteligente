import React, { useEffect, useState } from 'react';
import { getMetricasLongitud } from '../services/scipy';
import type { MetricasLongitud } from '../types';
import { Sigma, BarChart3, Binary, Scale } from 'lucide-react';

export const MetricasPage: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricasLongitud | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getMetricasLongitud()
      .then((data) => setMetricas(data))
      .catch((err) => console.error('Error al obtener métricas:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '30px' }}>Cargando análisis estadístico de SciPy...</div>;

  return (
    <div style={{ padding: '30px', backgroundColor: '#f4f6f8', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <h1>Análisis Estadístico (SciPy)</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        Métricas de tendencia central y dispersión sobre la longitud de palabras de los comentarios.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={cardStyle}>
          <BarChart3 color="#2563eb" />
          <p style={labelStyle}>Media (Promedio)</p>
          <h2 style={metricStyle}>{metricas?.media}</h2>
        </div>
        <div style={cardStyle}>
          <Scale color="#16a34a" />
          <p style={labelStyle}>Mediana</p>
          <h2 style={metricStyle}>{metricas?.mediana}</h2>
        </div>
        <div style={cardStyle}>
          <Binary color="#9333ea" />
          <p style={labelStyle}>Moda</p>
          <h2 style={metricStyle}>{metricas?.moda}</h2>
        </div>
        <div style={cardStyle}>
          <Sigma color="#dc2626" />
          <p style={labelStyle}>Desviación Estándar</p>
          <h2 style={metricStyle}>{metricas?.desviacion_estandar}</h2>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Varianza</p>
          <h2 style={metricStyle}>{metricas?.varianza}</h2>
        </div>
        <div style={cardStyle}>
          <p style={labelStyle}>Total de Muestras</p>
          <h2 style={metricStyle}>{metricas?.total_muestras}</h2>
        </div>
      </div>
    </div>
  );
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const labelStyle: React.CSSProperties = {
  color: '#64748b',
  fontSize: '14px',
  marginTop: '8px',
  marginBottom: '4px',
};

const metricStyle: React.CSSProperties = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: 0,
};

export default MetricasPage;