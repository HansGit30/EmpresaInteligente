import React, { useState } from 'react';

interface ResultadoNLP {
  comentario_id?: number;
  sentimiento?: string;
  score?: number;
  categoria?: string;
  palabras_clave?: string[];
  mensaje?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'https://backend-empresa-inteligente.onrender.com';

export const AnalizarComentario: React.FC = () => {
  const [comentario, setComentario] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [resultado, setResultado] = useState<ResultadoNLP | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalizar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comentario.trim()) return;

    setLoading(true);
    setError(null);
    setResultado(null);

    try {
      // Ajustado a la ruta FastAPI documentada en Render
      const response = await fetch(`${API_URL}/nlp/procesar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ texto: comentario }),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setResultado(data);
    } catch (err) {
      console.error('Error al analizar comentario:', err);
      setError('No se pudo procesar el comentario con el servicio NLP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#101828' }}>Analizar Comentario Individual</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#667085' }}>
        Ingresa un comentario para clasificar su sentimiento y extraer categorías mediante el modelo NLP.
      </p>

      <form onSubmit={handleAnalizar} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <textarea
          rows={4}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          placeholder="Escribe aquí el comentario del cliente..."
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #d0d5dd',
            fontSize: '14px',
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="submit"
            disabled={loading || !comentario.trim()}
            style={{
              padding: '10px 18px',
              backgroundColor: loading ? '#98a2b3' : '#101828',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Procesando...' : 'Analizar Comentario'}
          </button>
        </div>
      </form>

      {error && (
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#fef3f2', color: '#b42318', borderRadius: '8px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {resultado && (
        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #eaecf0' }}>
          <h4 style={{ margin: '0 0 12px 0', color: '#101828' }}>Resultado del Análisis</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '12px', color: '#667085' }}>Sentimiento:</span>
              <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#101828' }}>
                {resultado.sentimiento || 'N/A'}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '12px', color: '#667085' }}>Categoría:</span>
              <p style={{ margin: '4px 0 0 0', fontWeight: 600, color: '#101828' }}>
                {resultado.categoria || 'N/A'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};