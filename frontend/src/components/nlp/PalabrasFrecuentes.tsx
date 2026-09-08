import React, { useEffect, useState } from 'react';

interface PalabraFrecuencia {
  palabra: string;
  cantidad: number;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const PalabrasFrecuentes: React.FC = () => {
  const [palabras, setPalabras] = useState<PalabraFrecuencia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Lista de palabras vacías (stopwords) a ignorar
  const stopWords = new Set([
    'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se',
    'por', 'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como',
    'mas', 'pero', 'sus', 'le', 'ya', 'o', 'este', 'otra', 'vez'
  ]);

  useEffect(() => {
    fetch(`${API_URL}/comentarios/`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        // Normaliza la respuesta si viene en array directo o dentro de una propiedad
        const listaComentarios = Array.isArray(response)
          ? response
          : (response.data || response.comentarios || response.results || []);

        if (!Array.isArray(listaComentarios) || listaComentarios.length === 0) {
          setPalabras([]);
          return;
        }

        const conteo: Record<string, number> = {};

        listaComentarios.forEach((item: any) => {
          // Evalúa múltiples nombres de propiedades comunes para el texto
          const texto = item.comentario || item.contenido || item.texto || item.mensaje || '';

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

        // Convertir y ordenar por frecuencia descendente
        const resultado = Object.entries(conteo)
          .map(([palabra, cantidad]) => ({ palabra, cantidad }))
          .sort((a, b) => b.cantidad - a.cantidad);

        setPalabras(resultado);
      })
      .catch((err) => {
        console.error('Error al procesar palabras:', err);
        setError('No se pudieron obtener o procesar los comentarios de la API.');
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
        <p style={{ color: '#667085', fontSize: '14px' }}>No se encontraron palabras para procesar en los comentarios.</p>
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