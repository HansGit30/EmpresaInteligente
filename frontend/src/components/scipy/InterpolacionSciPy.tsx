import React, { useState } from 'react';

export const InterpolacionSciPy: React.FC = () => {
  const [target, setTarget] = useState<number>(2.5);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    fetch(`http://localhost:8000/scipy/interpolacion?x_target=${target}`)
      .then((res) => res.json())
      .then((data) => setResultado(data.valor_interpolado));
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h4 style={{ margin: '0 0 12px 0' }}>Estimación mediante Interpolación Lineal</h4>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <input 
          type="number" 
          value={target} 
          onChange={(e) => setTarget(parseFloat(e.target.value))}
          style={{ padding: '8px', borderRadius: '6px', border: '1px solid #d0d5dd' }} 
        />
        <button onClick={calcular} style={{ padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '6px' }}>
          Calcular
        </button>
      </div>
      {resultado !== null && <p style={{ marginTop: '16px' }}>Valor estimado: <strong>{resultado}</strong></p>}
    </div>
  );
};