import React, { useEffect, useState } from 'react';

interface MetricasSciPy {
  media: number;
  mediana: number;
  moda: number;
  desviacion_estandar: number;
  varianza: number;
  minimo: number;
  maximo: number;
  asimetria: number;
  curtosis: number;
  total_muestras: number;
}

export const EstadisticasSciPy: React.FC = () => {
  const [metricas, setMetricas] = useState<MetricasSciPy | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('http://localhost:8000/scipy/estadisticas')
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 'ok' && json.data) {
          setMetricas(json.data);
        }
      })
      .catch((err) => console.error('Error al cargar estadísticas:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Cargando estadísticas...</div>;
  if (!metricas) return <div style={{ padding: '20px' }}>Sin datos disponibles.</div>;

  const tarjetas = [
    { label: 'Media (Promedio)', valor: metricas.media, desc: 'Caracteres por comentario' },
    { label: 'Mediana', valor: metricas.mediana, desc: 'Punto medio de la muestra' },
    { label: 'Moda', valor: metricas.moda, desc: 'Longitud más frecuente' },
    { label: 'Desviación Estándar', valor: metricas.desviacion_estandar, desc: 'Dispersión de los datos' },
    { label: 'Varianza', valor: metricas.varianza, desc: 'Variabilidad calculada' },
    { label: 'Rango Mín / Máx', valor: `${metricas.minimo} - ${metricas.maximo}`, desc: 'Límites de longitud' },
    { label: 'Asimetría (Skew)', valor: metricas.asimetria, desc: 'Sesgo de la distribución' },
    { label: 'Curtosis', valor: metricas.curtosis, desc: 'Concentración muestral' },
  ];

  return (
    <div>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#667085' }}>
        Muestras procesadas: <strong>{metricas.total_muestras}</strong>
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {tarjetas.map((item, idx) => (
          <div key={idx} style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid #eaecf0' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#475467' }}>{item.label}</span>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#101828', margin: '8px 0' }}>{item.valor}</div>
            <span style={{ fontSize: '11px', color: '#98a2b3' }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};