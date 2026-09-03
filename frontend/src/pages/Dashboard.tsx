import React from 'react';
import { KpiCard } from '../components/dashboard/KpiCard';
import { AttentionChart } from '../components/dashboard/AttentionChart';
import { CategoriesDistribution } from '../components/dashboard/CategoriesDistribution';
import { FrequentWords } from '../components/dashboard/FrequentWords';

export const Dashboard: React.FC = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>
          CENTRO INTELIGENTE
        </h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>
          Dashboard Principal
        </p>
      </div>

      {/* Bloque 1: Tarjetas superiores */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <KpiCard title="CLIENTES" value="245" highlight />
        <KpiCard title="COMENTARIOS" value="1,248" />
        <KpiCard title="PROMEDIO" value="16.4 min" />
        <KpiCard title="PROCESADOS" value="94%" />
      </div>

      {/* Bloque 2: Gráficos y Categorías */}
      <div style={{ display: 'flex', gap: '16px', marginTop: '20px', flexWrap: 'wrap' }}>
        <AttentionChart />
        <CategoriesDistribution />
      </div>

      {/* Bloque 3: Palabras más frecuentes */}
      <FrequentWords />
    </div>
  );
};

export default Dashboard;