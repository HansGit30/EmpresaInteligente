import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReporteNLP } from '../components/reportes/ReporteNLP';

export const Reportes: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Determinar la pestaña activa basándose en la ruta actual de la URL
  const getActiveTab = () => {
    if (location.pathname.includes('/reportes/atencion')) return 'atencion';
    if (location.pathname.includes('/reportes/estadisticas')) return 'estadisticas';
    return 'nlp';
  };

  const activeTab = getActiveTab();

  const handleTabChange = (tab: 'nlp' | 'atencion' | 'estadisticas') => {
    navigate(`/reportes/${tab}`);
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#fcfcfd', minHeight: '100vh' }}>
      <div>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#101828' }}>Panel de Reportes</h1>
        <p style={{ margin: 0, color: '#667085', fontSize: '14px' }}>
          Visualiza y analiza el rendimiento global del sistema, procesamiento de lenguaje natural y estadísticas de atención.
        </p>
      </div>

      {/* Pestañas de navegación interna sincronizadas con la URL */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #eaecf0', paddingBottom: '12px' }}>
        <button
          onClick={() => handleTabChange('nlp')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === 'nlp' ? '#101828' : '#f2f4f7',
            color: activeTab === 'nlp' ? '#fff' : '#344054',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Reporte NLP
        </button>
        <button
          onClick={() => handleTabChange('atencion')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === 'atencion' ? '#101828' : '#f2f4f7',
            color: activeTab === 'atencion' ? '#fff' : '#344054',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Reporte Atención
        </button>
        <button
          onClick={() => handleTabChange('estadisticas')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: activeTab === 'estadisticas' ? '#101828' : '#f2f4f7',
            color: activeTab === 'estadisticas' ? '#fff' : '#344054',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Reporte Estadísticas
        </button>
      </div>

      {/* Contenido condicional sincronizado con la ruta */}
      <div style={{ marginTop: '4px' }}>
        {activeTab === 'nlp' && <ReporteNLP />}
        
        {activeTab === 'atencion' && (
          <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#101828' }}>Reporte de Atención al Cliente</h3>
            <p style={{ margin: 0, color: '#667085', fontSize: '14px' }}>
              Métricas y tiempos de respuesta en las solicitudes registradas.
            </p>
          </div>
        )}
        
        {activeTab === 'estadisticas' && (
          <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#101828' }}>Reporte de Estadísticas Avanzadas</h3>
            <p style={{ margin: 0, color: '#667085', fontSize: '14px' }}>
              Análisis cuantitativo y modelos matemáticos aplicados sobre los datos del sistema.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};