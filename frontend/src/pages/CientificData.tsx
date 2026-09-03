import React, { useState } from 'react';
import { EstadisticasSciPy } from '../components/scipy/EstadisticasSciPy';
import { InterpolacionSciPy } from '../components/scipy/InterpolacionSciPy';
import { OptimizacionSciPy } from '../components/scipy/OptimizacionSciPy';

export const ScientificData: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'estadisticas' | 'interpolacion' | 'optimizacion'>('estadisticas');

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 8px 0', color: '#101828' }}>Scientific Data</h2>
        <p style={{ margin: 0, color: '#667085' }}>Análisis cuantitativo y procesamiento numérico con SciPy</p>
      </div>

      {/* Selector de pestañas */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #eaecf0', marginBottom: '20px' }}>
        {(['estadisticas', 'interpolacion', 'optimizacion'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #007bff' : '2px solid transparent',
              backgroundColor: 'transparent',
              color: activeTab === tab ? '#007bff' : '#667085',
              fontWeight: activeTab === tab ? 600 : 400,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Renderizado de vistas */}
      {activeTab === 'estadisticas' && <EstadisticasSciPy />}
      {activeTab === 'interpolacion' && <InterpolacionSciPy />}
      {activeTab === 'optimizacion' && <OptimizacionSciPy />}
    </div>
  );
};

export default ScientificData;