import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { TablaComentarios } from '../components/atencion/TablaComentarios';

export const Comentarios: React.FC = () => {
  const [comentarios, setComentarios] = useState<any[]>([]);
  const [clienteId, setClienteId] = useState<number>(1);
  const [contenido, setContenido] = useState<string>('');
  const [canal, setCanal] = useState<string>('web');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComentarios = async () => {
    try {
      const res = await api.get('/comentarios');
      setComentarios(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComentarios();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contenido.trim()) return;

    try {
      setLoading(true);
      await api.post('/comentarios', {
        cliente_id: clienteId,
        contenido,
        canal,
        estado: 'pendiente'
      });
      setContenido('');
      fetchComentarios();
    } catch (error) {
      console.error('Error al guardar comentario:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
        GESTIÓN DE COMENTARIOS
      </h2>

      {/* Formulario de Registro */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <input
          type="number"
          placeholder="ID Cliente"
          value={clienteId}
          onChange={(e) => setClienteId(Number(e.target.value))}
          style={{ width: '90px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Escribe el comentario del cliente..."
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <select 
          value={canal} 
          onChange={(e) => setCanal(e.target.value)} 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        >
          <option value="web">Web</option>
          <option value="email">Email</option>
          <option value="redes">Redes Sociales</option>
        </select>
        <button 
          type="submit" 
          disabled={loading} 
          style={{ padding: '10px 20px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          {loading ? 'Guardando...' : 'Registrar'}
        </button>
      </form>

      {/* AQUÍ ESTÁ EL CAMBIO: Se llama al componente rediseñado */}
      <TablaComentarios comentarios={comentarios} onRefresh={fetchComentarios} />
    </div>
  );
};