import React, { useEffect, useState } from 'react';

export const OptimizacionSciPy: React.FC = () => {
  const [umbral, setUmbral] = useState<number | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/scipy/optimizacion')
      .then((res) => res.json())
      .then((data) => setUmbral(data.umbral_optimo_calculado));
  }, []);

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>Optimización de Parámetros</h4>
      <p style={{ color: '#475467', fontSize: '14px' }}>
        Umbral óptimo obtenido mediante método Nelder-Mead: <strong>{umbral ?? 'Calculando...'}</strong>
      </p>
    </div>
  );
};