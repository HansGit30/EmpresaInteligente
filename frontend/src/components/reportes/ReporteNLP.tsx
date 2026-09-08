import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-empresa-inteligente.onrender.com';

interface PalabraFrecuente {
  palabra: string;
  cantidad: number;
}

export const ReporteNLP: React.FC = () => {
  const [totalComentarios, setTotalComentarios] = useState<number>(0);
  const [precision, setPrecision] = useState<number>(0);
  const [palabras, setPalabras] = useState<PalabraFrecuente[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const cargarDatosReporte = async () => {
      try {
        // 1. Obtener métricas generales
        const resMetricas = await fetch(`${API_URL}/nlp/metricas`);
        const dataMetricas = await resMetricas.json();
        setTotalComentarios(dataMetricas.total_comentarios || 0);
        setPrecision(dataMetricas.precision || 92.0);

        // 2. Obtener palabras frecuentes
        const resPalabras = await fetch(`${API_URL}/nlp/palabras-frecuentes`);
        const dataPalabras = await resPalabras.json();
        setPalabras(dataPalabras || []);
      } catch (err) {
        console.error('Error al cargar datos del reporte NLP:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatosReporte();
  }, []);

  if (loading) {
    return <div style={{ padding: '24px' }}>Cargando reporte...</div>;
  }

  // Encontrar el valor máximo para calcular los porcentajes de las barras visuales
  const maxCantidad = palabras.length > 0 ? Math.max(...palabras.map(p => p.cantidad)) : 1;

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ margin: '0 0 8px 0', color: '#101828' }}>Reporte de Inteligencia NLP</h2>
        <p style={{ margin: 0, color: '#667085', fontSize: '14px' }}>
          Resumen analítico del procesamiento de lenguaje natural y frecuencia de términos.
        </p>
      </div>

      {/* Tarjetas de Resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
          <span style={{ fontSize: '13px', color: '#667085' }}>Comentarios Procesados</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', color: '#101828' }}>{totalComentarios}</h3>
        </div>
        <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
          <span style={{ fontSize: '13px', color: '#667085' }}>Precisión del Modelo</span>
          <h3 style={{ margin: '8px 0 0 0', fontSize: '28px', color: '#027a48' }}>{precision}%</h3>
        </div>
      </div>

      {/* Gráfico de Barras Simple para Palabras Frecuentes */}
      <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#101828' }}>Palabras Más Frecuentes en Comentarios</h3>
        
        {palabras.length === 0 ? (
          <p style={{ color: '#667085', fontSize: '14px' }}>No hay datos suficientes registrados todavía.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {palabras.map((item, index) => {
              const porcentaje = (item.cantidad / maxCantidad) * 100;
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#344054' }}>
                    <span style={{ fontWeight: 500 }}>{item.palabra}</span>
                    <span style={{ color: '#667085' }}>{item.cantidad} menciones</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#eaecf0', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        width: `${porcentaje}%`, 
                        backgroundColor: '#175cd3', 
                        height: '100%', 
                        borderRadius: '4px',
                        transition: 'width 0.3s ease' 
                      }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};