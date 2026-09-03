import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnalizarComentario } from '../components/nlp/AnalizarComentario';
import { PalabrasFrecuentes } from '../components/nlp/PalabrasFrecuentes';
import { Categorias } from '../components/nlp/Categorias';
import { Clasificacion } from '../components/nlp/Clasificacion';

export const InteligenciaNLP: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'analizar';
  const [totalComentarios, setTotalComentarios] = useState<number>(0);
  const [precision, setPrecision] = useState<number>(0);

  const setTab = (tabName: string) => {
    setSearchParams({ tab: tabName });
  };

  useEffect(() => {
    // Usamos la ruta existente /comentarios
    fetch('http://localhost:8000/comentarios')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const total = data.length;
          setTotalComentarios(total);

          // Si hay comentarios, se calcula cuántos fueron procesados/clasificados
          if (total > 0) {
            const procesados = data.filter((item: any) => item.procesado === true || item.categoria).length;
            // Porcentaje de efectividad/precisión real
            const porcentaje = Math.round((procesados / total) * 100);
            setPrecision(porcentaje);
          } else {
            setPrecision(0);
          }
        }
      })
      .catch((err) => console.error('Error al obtener comentarios:', err));
  }, []);

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>INTELIGENCIA NLP</h2>

      {/* Navegación por Pestañas */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid #eaecf0', paddingBottom: '12px' }}>
        <button
          onClick={() => setTab('analizar')}
          style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'analizar' ? '#101828' : 'transparent', color: activeTab === 'analizar' ? '#fff' : '#667085' }}
        >
          Analizar comentario
        </button>
        <button
          onClick={() => setTab('palabras')}
          style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'palabras' ? '#101828' : 'transparent', color: activeTab === 'palabras' ? '#fff' : '#667085' }}
        >
          Palabras frecuentes
        </button>
        <button
          onClick={() => setTab('categorias')}
          style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'categorias' ? '#101828' : 'transparent', color: activeTab === 'categorias' ? '#fff' : '#667085' }}
        >
          Categorías
        </button>
        <button
          onClick={() => setTab('clasificacion')}
          style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'clasificacion' ? '#101828' : 'transparent', color: activeTab === 'clasificacion' ? '#fff' : '#667085' }}
        >
          Clasificación
        </button>
      </div>

      {/* Renderizado Condicional */}
      {activeTab === 'analizar' && <AnalizarComentario />}
      {activeTab === 'palabras' && <PalabrasFrecuentes />}
      {activeTab === 'categorias' && <Categorias />}
      {activeTab === 'clasificacion' && (
        <Clasificacion totalComentarios={totalComentarios} precision={precision} />
      )}
    </div>
  );
};