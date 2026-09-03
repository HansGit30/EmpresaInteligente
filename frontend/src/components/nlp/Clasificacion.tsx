import React from 'react';

interface ClasificacionProps {
  totalComentarios?: number;
  precision?: number;
}

export const Clasificacion: React.FC<ClasificacionProps> = ({ 
  totalComentarios = 0, 
  precision = 0 
}) => {
  return (
    <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #eaecf0' }}>
      <h3 style={{ marginTop: 0 }}>Métricas de Clasificación</h3>
      <p style={{ color: '#667085' }}>Resumen del rendimiento del modelo NLTK en los comentarios registrados.</p>
      <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#027a48' }}>{precision}%</h2>
          <span style={{ fontSize: '12px', color: '#667085' }}>Precisión global</span>
        </div>
        <div style={{ flex: 1, padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', textAlign: 'center' }}>
          <h2 style={{ margin: 0, color: '#101828' }}>{totalComentarios}</h2>
          <span style={{ fontSize: '12px', color: '#667085' }}>Comentarios procesados</span>
        </div>
      </div>
    </div>
  );
};