import React, { useState } from 'react';
import { procesarComentarioNLP } from '../../services/nltk';

interface Comentario {
  id: number;
  cliente_id?: number;
  contenido: string;
  canal: string;
  categoria: string | null;
  procesado: boolean;
}

interface Props {
  comentarios: Comentario[];
  onRefresh: () => void;
}

export const TablaComentarios: React.FC<Props> = ({ comentarios, onRefresh }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleProcesar = async (id: number) => {
    try {
      setLoadingId(id);
      await procesarComentarioNLP(id);
      onRefresh();
    } catch (error) {
      console.error('Error al procesar:', error);
      alert('Ocurrió un error al analizar el comentario con NLP');
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <>
      {/* Estilos inyectados directamente en el componente */}
      <style>{`
        .tabla-container {
          width: 100%;
          background-color: #ffffff;
          border-radius: 16px;
          border: 1px solid #eaecf0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .custom-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .custom-table thead tr {
          background-color: #f9fafb;
          border-bottom: 1px solid #eaecf0;
        }

        .custom-table th {
          padding: 14px 20px;
          font-size: 11px;
          font-weight: 600;
          color: #667085;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .custom-table tbody tr {
          border-bottom: 1px solid #f2f4f7;
          transition: background-color 0.15s ease;
        }

        .custom-table tbody tr:hover {
          background-color: #f9fafb;
        }

        .custom-table td {
          padding: 16px 20px;
          vertical-align: middle;
        }

        .custom-checkbox {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Avatar e información del Cliente */
        .cliente-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: #f2f4f7;
          color: #344054;
          font-weight: 700;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e4e7ec;
        }

        .comentario-id {
          font-weight: 600;
          color: #101828;
        }

        .cliente-id {
          font-size: 12px;
          color: #98a2b3;
        }

        /* Contenido */
        .contenido-cell p {
          margin: 0;
          color: #344054;
          max-width: 380px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .canal-text {
          text-transform: capitalize;
          color: #475467;
          font-weight: 500;
        }

        /* Badges de Categoría */
        .badge-categoria {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .badge-felicitacion {
          background-color: #ecfdf3;
          color: #027a48;
          border: 1px solid #abefc6;
        }

        .badge-reclamo {
          background-color: #fef3f2;
          color: #b42318;
          border: 1px solid #fecdca;
        }

        .badge-default {
          background-color: #f8f9fa;
          color: #667085;
          border: 1px solid #e4e7ec;
        }

        /* Badges de Estado NLP */
        .badge-estado {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 500;
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .estado-procesado {
          background-color: #ecfdf3;
          color: #027a48;
        }

        .estado-procesado .dot {
          background-color: #12b76a;
        }

        .estado-pendiente {
          background-color: #fffaeb;
          color: #b54708;
        }

        .estado-pendiente .dot {
          background-color: #f79009;
        }

        /* Botones */
        .btn-analizar {
          background-color: #039855;
          color: #ffffff;
          border: none;
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-analizar:hover {
          background-color: #027a48;
        }

        .btn-analizar:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-more {
          background: none;
          border: none;
          color: #98a2b3;
          font-size: 16px;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
        }

        .btn-more:hover {
          background-color: #f2f4f7;
          color: #344054;
        }

        /* Paginador */
        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 20px;
          border-top: 1px solid #eaecf0;
          font-size: 12px;
          color: #667085;
        }

        .pagination-buttons {
          display: flex;
          gap: 4px;
        }

        .page-btn {
          border: none;
          background: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 500;
          color: #344054;
          cursor: pointer;
        }

        .page-btn.active {
          background-color: #101828;
          color: #ffffff;
        }

        .page-btn:hover:not(.active) {
          background-color: #f2f4f7;
        }
      `}</style>

      <div className="tabla-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input type="checkbox" className="custom-checkbox" />
              </th>
              <th>ID / CLIENTE</th>
              <th>CONTENIDO</th>
              <th>CANAL</th>
              <th>CATEGORÍA</th>
              <th>ESTADO NLP</th>
              <th style={{ textAlign: 'right' }}>ACCIÓN</th>
            </tr>
          </thead>
          <tbody>
            {comentarios.map((c) => {
              const categoriaClass = 
                c.categoria === 'FELICITACION' ? 'badge-felicitacion' :
                c.categoria === 'RECLAMO' ? 'badge-reclamo' : 'badge-default';

              return (
                <tr key={c.id}>
                  <td>
                    <input type="checkbox" className="custom-checkbox" />
                  </td>
                  <td>
                    <div className="cliente-info">
                      <div className="avatar">C{c.cliente_id || c.id}</div>
                      <div>
                        <div className="comentario-id">#Comentario {c.id}</div>
                        <div className="cliente-id">Cliente ID: {c.cliente_id || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="contenido-cell">
                    <p title={c.contenido}>{c.contenido}</p>
                  </td>
                  <td>
                    <span className="canal-text">{c.canal}</span>
                  </td>
                  <td>
                    <span className={`badge-categoria ${categoriaClass}`}>
                      {c.categoria || 'Sin clasificar'}
                    </span>
                  </td>
                  <td>
                    <span className={`badge-estado ${c.procesado ? 'estado-procesado' : 'estado-pendiente'}`}>
                      <span className="dot"></span>
                      {c.procesado ? 'Procesado' : 'Pendiente'}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {!c.procesado ? (
                      <button
                        onClick={() => handleProcesar(c.id)}
                        disabled={loadingId === c.id}
                        className="btn-analizar"
                      >
                        {loadingId === c.id ? 'Analizando...' : 'Analizar NLP'}
                      </button>
                    ) : (
                      <button className="btn-more" title="Opciones">•••</button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="pagination-container">
          <span>Mostrando <b>{comentarios.length}</b> comentarios</span>
          <div className="pagination-buttons">
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
          </div>
        </div>
      </div>
    </>
  );
};