import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListaClientes } from '../components/clientes/ListaClientes';
import { NuevoCliente } from '../components/clientes/NuevoCliente';
import { HistorialClientes } from '../components/clientes/HistorialClientes';

export const Clientes: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lee el parámetro 'tab' de la URL (?tab=nuevo, ?tab=historial, etc.)
  // Si no está definido, toma 'lista' por defecto
  const tab = searchParams.get('tab') || 'lista';

  // Cambia la pestaña actualizando la query string en la URL
  const setTab = (newTab: 'lista' | 'nuevo' | 'historial') => {
    setSearchParams({ tab: newTab });
  };

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', margin: 0 }}>Gestión de Clientes</h1>
        <p style={{ fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' }}>Administra la información de los clientes del sistema</p>
      </div>

      {/* Navegación de Pestañas */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button 
          onClick={() => setTab('lista')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: tab === 'lista' ? '#14532d' : '#e2e8f0',
            color: tab === 'lista' ? '#ffffff' : '#475569',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Lista de clientes
        </button>
        <button 
          onClick={() => setTab('nuevo')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: tab === 'nuevo' ? '#14532d' : '#e2e8f0',
            color: tab === 'nuevo' ? '#ffffff' : '#475569',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Nuevo cliente
        </button>
        <button 
          onClick={() => setTab('historial')}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: tab === 'historial' ? '#14532d' : '#e2e8f0',
            color: tab === 'historial' ? '#ffffff' : '#475569',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Historial
        </button>
      </div>

      {/* Renderizado Condicional */}
      {tab === 'lista' && <ListaClientes />}
      {tab === 'nuevo' && <NuevoCliente />}
      {tab === 'historial' && <HistorialClientes />}
    </div>
  );
};

export default Clientes;