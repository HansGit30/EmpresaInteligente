import React from 'react';
import { Card } from '../ui/Card';

export const NuevoCliente: React.FC = () => (
  <Card>
    <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
      Registrar Nuevo Cliente
    </h3>
    <form style={{ display: 'grid', gap: '12px', maxWidth: '450px' }} onSubmit={(e) => e.preventDefault()}>
      <div>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Nombre de la Empresa / Cliente</label>
        <input 
          type="text" 
          placeholder="Ej: Corp Tech" 
          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
        />
      </div>
      <div>
        <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>Correo de Contacto</label>
        <input 
          type="email" 
          placeholder="contacto@empresa.com" 
          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
        />
      </div>
      <button 
        type="submit" 
        style={{
          backgroundColor: '#14532d',
          color: '#ffffff',
          border: 'none',
          padding: '10px 16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginTop: '8px'
        }}
      >
        Guardar Cliente
      </button>
    </form>
  </Card>
);