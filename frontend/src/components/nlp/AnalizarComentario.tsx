import React, { useState } from 'react';

export const AnalizarComentario: React.FC = () => {
  const [texto, setTexto] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const handleAnalizar = () => {
    if (!texto.trim()) return;
    // Simulación de análisis rápido
    setResultado({
      categoria: texto.toLowerCase().includes('bueno') || texto.toLowerCase().includes('excelente') ? 'FELICITACION' : 'RECLAMO',
      score: 0.95,
      palabrasClave: texto.split(' ').filter(w => w.length > 3)
    });
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ marginTop: 0 }}>Analizar Comentario Individual</h3>
      <textarea
        rows={4}
        placeholder="Ingresa un comentario para probar el modelo NLTK..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d0d5dd', boxSizing: 'border-box' }}
      />
      <button
        onClick={handleAnalizar}
        style={{ marginTop: '12px', padding: '10px 20px', backgroundColor: '#039855', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}
      >
        Probar NLP
      </button>

      {resultado && (
        <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #eaecf0' }}>
          <h4>Resultado del Análisis:</h4>
          <p><b>Categoría detectada:</b> {resultado.categoria}</p>
          <p><b>Confianza:</b> {(resultado.score * 100)}%</p>
          <p><b>Palabras clave:</b> {resultado.palabrasClave.join(', ')}</p>
        </div>
      )}
    </div>
  );
};