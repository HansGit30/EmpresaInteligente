import React, { useState } from 'react';
import { Card } from '../ui/Card';

export const NuevoCliente: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre,
          empresa: empresa,
          email: email,
          telefono: telefono,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al registrar cliente');
      }

      alert('¡Cliente registrado correctamente!');
      
      setNombre('');
      setEmpresa('');
      setEmail('');
      setTelefono('');
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el backend o la base de datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>
        Registrar Nuevo Cliente
      </h3>
      <form style={{ display: 'grid', gap: '12px', maxWidth: '450px' }} onSubmit={handleSubmit}>
        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
            Nombre del Contacto
          </label>
          <input 
            type="text" 
            required
            placeholder="Ej: Juan Pérez" 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
            Nombre de la Empresa
          </label>
          <input 
            type="text" 
            required
            placeholder="Ej: Empresa Vial S.A.C." 
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
            Correo de Contacto
          </label>
          <input 
            type="email" 
            required
            placeholder="contacto@empresa.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
          />
        </div>

        <div>
          <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#475569' }}>
            Teléfono (Opcional)
          </label>
          <input 
            type="text" 
            placeholder="Ej: +51 987654321" 
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '4px' }} 
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{
            backgroundColor: loading ? '#64748b' : '#14532d',
            color: '#ffffff',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '8px'
          }}
        >
          {loading ? 'Guardando...' : 'Guardar Cliente'}
        </button>
      </form>
    </Card>
  );
};