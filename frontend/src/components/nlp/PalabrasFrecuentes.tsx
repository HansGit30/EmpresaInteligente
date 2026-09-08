import React, { useEffect, useState } from 'react';

interface PalabraFrecuencia {
  palabra: string;
  cantidad: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-empresa-inteligente.onrender.com';

export const PalabrasFrecuentes: React.FC = () => {
  const [palabras, setPalabras] = useState<PalabraFrecuencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/nlp/palabras-frecuentes`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data: PalabraFrecuencia[]) => {
        setPalabras(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Error al procesar palabras:', err);
        setError('No se pudieron obtener las palabras frecuentes de la API.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '20px', color: '#667085' }}>Procesando palabras...</div>;
  if (error) return <div style={{ padding: '20px', color: '#f04438' }}>{error}</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#101828' }}>Palabras Más Frecuentes</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#667085' }}>
        Conteo de palabras clave procesadas en los comentarios:
      </p>

      {palabras.length === 0 ? (
        <div style={{ padding: '16px', backgroundColor: '#fffaeb', border: '1px solid #fedf89', borderRadius: '8px', color: '#b54708', fontSize: '14px' }}>
          No hay palabras analizadas aún. Procesa algunos comentarios primero mediante la opción <strong>Analizar comentario</strong> para poblar la tabla.
        </div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {palabras.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#f2f4f7',
                padding: '6px 10px 6px 14px',
                borderRadius: '20px',
                border: '1px solid #e4e7ec',
              }}
            >
              <span style={{ fontWeight: 600, color: '#344054', fontSize: '14px' }}>
                {item.palabra}
              </span>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#12b76a',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 700,
                  borderRadius: '50%',
                  width: '22px',
                  height: '22px',
                  lineHeight: 1,
                  flexShrink: 0,
                  padding: 0,
                  margin: 0
                }}
              >
                {item.cantidad}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};