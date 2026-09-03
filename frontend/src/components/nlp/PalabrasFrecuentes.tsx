import React, { useEffect, useState } from 'react';

interface PalabraFrecuencia {
  palabra: string;
  cantidad: number;
}

export const PalabrasFrecuentes: React.FC = () => {
  const [palabras, setPalabras] = useState<PalabraFrecuencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Lista de palabras vacías (stopwords) a ignorar
  const stopWords = new Set([
    'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se',
    'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como',
    'mas', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'otra', 'vez'
  ]);

  useEffect(() => {
    fetch('http://localhost:8000/comentarios/')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const conteo: Record<string, number> = {};

          data.forEach((item: any) => {
            const texto = item.comentario || item.contenido || '';
            
            const textoLimpio = texto
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .replace(/[^\w\s]/g, '');

            const palabrasTexto = textoLimpio.split(/\s+/);

            palabrasTexto.forEach((palabra: string) => {
              if (palabra.length > 2 && !stopWords.has(palabra)) {
                conteo[palabra] = (conteo[palabra] || 0) + 1;
              }
            });
          });

          // Convertir, filtrar (solo > 1) y ordenar
          const resultado = Object.entries(conteo)
            .map(([palabra, cantidad]) => ({ palabra, cantidad }))
            .filter((item) => item.cantidad > 1) // <--- SOLO MAYORES A 1
            .sort((a, b) => b.cantidad - a.cantidad);

          setPalabras(resultado);
        }
      })
      .catch((err) => console.error('Error al procesar palabras:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Procesando palabras...</div>;

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#101828' }}>Palabras Más Frecuentes</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#667085' }}>
        Conteo de palabras clave repetidas en los comentarios:
      </p>

      {palabras.length === 0 ? (
        <p style={{ color: '#667085', fontSize: '14px' }}>No hay palabras repetidas con frecuencia mayor a 1.</p>
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

              {/* Badge del número perfectamente centrado */}
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