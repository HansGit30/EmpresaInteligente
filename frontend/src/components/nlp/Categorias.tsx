import React, { useEffect, useState } from 'react';

interface Categoria {
  id: number;
  nombre: string;
  descripcion: string;
  activo?: boolean;
}

export const Categorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    // Agregamos la barra diagonal / al final para evitar redirecciones 307
    fetch('http://localhost:8000/categorias/')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error en la respuesta: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCategorias(data);
        } else {
          setCategorias([]);
        }
      })
      .catch((err) => {
        console.error('Error al obtener categorías:', err);
        setError('No se pudieron cargar las categorías');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px', color: '#667085', fontSize: '14px' }}>
        Cargando categorías...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px', color: '#f04438', fontSize: '14px' }}>
        {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.25rem', color: '#101828', fontWeight: 600 }}>
        Categorías Registradas
      </h3>

      {categorias.length === 0 ? (
        <p style={{ color: '#667085' }}>No se encontraron categorías.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {categorias.map((cat) => (
            <div
              key={cat.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)',
                border: '1px solid #eaecf0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease-in-out',
              }}
            >
              <div>
                {/* Cabecera de la Tarjeta */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <span
                    style={{
                      backgroundColor: '#f2f4f7',
                      color: '#344054',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    ID #{cat.id}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        color: cat.activo !== false ? '#12b76a' : '#f04438',
                        fontWeight: 500,
                      }}
                    >
                      {cat.activo !== false ? 'Activo' : 'Inactivo'}
                    </span>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: cat.activo !== false ? '#12b76a' : '#f04438',
                      }}
                    />
                  </div>
                </div>

                {/* Título y Descripción */}
                <h4
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#101828',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                  }}
                >
                  {cat.nombre}
                </h4>

                <p
                  style={{
                    margin: 0,
                    fontSize: '14px',
                    color: '#475467',
                    lineHeight: '1.5',
                  }}
                >
                  {cat.descripcion || 'Sin descripción disponible.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};