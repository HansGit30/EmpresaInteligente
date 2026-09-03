import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Headphones, 
  Brain, 
  Calculator, 
  FileText, 
  Settings,
  ChevronDown, 
  ChevronRight,
  Search,
  Bell,
  Mail,
  UserCheck
} from 'lucide-react';

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    clientes: true,
    atencion: true,
    nlp: true,
    scipy: true,
    reportes: false,
    configuracion: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div style={containerStyle}>
      {/* SIDEBAR IZQUIERDO */}
      <aside style={sidebarStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>
            <Brain size={20} color="#ffffff" />
          </div>
          <span style={logoTextStyle}>Empresa Inteligente</span>
        </div>

        {/* Menú de Navegación */}
        <nav style={navContainerStyle}>
          <div style={menuGroupHeaderStyle}>MENU</div>

          {/* DASHBOARD */}
          <Link to="/" style={parentItemStyle(isActive('/'))}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
          </Link>

          {/* CLIENTES */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('clientes')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} />
                <span>Clientes</span>
              </div>
              {openSections.clientes ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.clientes && (
              <div style={subMenuContainerStyle}>
                <Link to="/clientes" style={subItemStyle(isActive('/clientes'))}>
                  Lista de clientes
                </Link>
                <span style={subItemStyle(false)}>Nuevo cliente</span>
                <span style={subItemStyle(false)}>Historial</span>
              </div>
            )}
          </div>

          {/* ATENCIÓN */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('atencion')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Headphones size={18} />
                <span>Atención</span>
              </div>
              {openSections.atencion ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.atencion && (
              <div style={subMenuContainerStyle}>
                <span style={subItemStyle(false)}>Solicitudes</span>
                <Link to="/comentarios" style={subItemStyle(isActive('/comentarios'))}>
                  Comentarios
                </Link>
                <span style={subItemStyle(false)}>Tiempos de atención</span>
              </div>
            )}
          </div>

          {/* INTELIGENCIA NLP */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('nlp')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Brain size={18} />
                <span>Inteligencia NLP</span>
              </div>
              {openSections.nlp ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.nlp && (
              <div style={subMenuContainerStyle}>
                <span style={subItemStyle(false)}>Analizar comentario</span>
                <span style={subItemStyle(false)}>Palabras frecuentes</span>
                <span style={subItemStyle(false)}>Categorías</span>
                <span style={subItemStyle(false)}>Clasificación</span>
              </div>
            )}
          </div>

          {/* SCIENTIFIC DATA */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('scipy')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calculator size={18} />
                <span>Scientific Data</span>
              </div>
              {openSections.scipy ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.scipy && (
              <div style={subMenuContainerStyle}>
                <Link to="/metricas" style={subItemStyle(isActive('/metricas'))}>
                  Estadísticas (SciPy)
                </Link>
                <span style={subItemStyle(false)}>Interpolación</span>
                <span style={subItemStyle(false)}>Optimización</span>
              </div>
            )}
          </div>

          <div style={menuGroupHeaderStyle}>GENERAL</div>

          {/* REPORTES */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('reportes')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={18} />
                <span>Reportes</span>
              </div>
              {openSections.reportes ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.reportes && (
              <div style={subMenuContainerStyle}>
                <span style={subItemStyle(false)}>Atención</span>
                <span style={subItemStyle(false)}>NLP</span>
                <span style={subItemStyle(false)}>Estadísticas</span>
              </div>
            )}
          </div>

          {/* CONFIGURACIÓN */}
          <div>
            <div style={parentItemStyle(false)} onClick={() => toggleSection('configuracion')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={18} />
                <span>Configuración</span>
              </div>
              {openSections.configuracion ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </div>
            {openSections.configuracion && (
              <div style={subMenuContainerStyle}>
                <span style={subItemStyle(false)}>Usuarios</span>
                <span style={subItemStyle(false)}>Categorías</span>
                <span style={subItemStyle(false)}>Auditoría</span>
              </div>
            )}
          </div>
        </nav>
      </aside>

      {/* ÁREA DE CONTENIDO DERECHA */}
      <div style={mainContentWrapperStyle}>
        {/* HEADER SUPERIOR */}
        <header style={headerStyle}>
          <div style={searchBarContainerStyle}>
            <Search size={16} color="#94a3b8" />
            <input type="text" placeholder="Buscar analíticas, clientes..." style={searchInputStyle} />
          </div>

          <div style={headerRightStyle}>
            <div style={iconBadgeStyle}><Mail size={18} color="#475569" /></div>
            <div style={iconBadgeStyle}><Bell size={18} color="#475569" /></div>
            <div style={profileContainerStyle}>
              <div style={avatarStyle}><UserCheck size={18} color="#ffffff" /></div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0f172a' }}>Analista SENATI</div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>admin@empresa.com</div>
              </div>
            </div>
          </div>
        </header>

        {/* PÁGINA INTERNA */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ESTILOS DE COMPONENTES */

const containerStyle: React.CSSProperties = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
  backgroundColor: '#f1f5f9',
  fontFamily: 'Inter, system-ui, sans-serif',
  overflow: 'hidden'
};

const sidebarStyle: React.CSSProperties = {
  width: '250px',
  backgroundColor: '#ffffff',
  margin: '12px 0 12px 12px',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
  padding: '20px 14px',
  boxSizing: 'border-box'
};

const logoContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '24px',
  paddingLeft: '6px'
};

const logoIconStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  borderRadius: '10px',
  backgroundColor: '#14532d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const logoTextStyle: React.CSSProperties = {
  fontWeight: '700',
  fontSize: '16px',
  color: '#0f172a'
};

const navContainerStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px'
};

const menuGroupHeaderStyle: React.CSSProperties = {
  fontSize: '10px',
  fontWeight: '700',
  color: '#94a3b8',
  marginTop: '12px',
  marginBottom: '4px',
  paddingLeft: '10px',
  letterSpacing: '0.05em'
};

const parentItemStyle = (active: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 12px',
  borderRadius: '10px',
  color: active ? '#14532d' : '#475569',
  backgroundColor: active ? '#f0fdf4' : 'transparent',
  textDecoration: 'none',
  fontSize: '13px',
  fontWeight: active ? '600' : '500',
  cursor: 'pointer',
  transition: 'all 0.15s ease'
});

const subMenuContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '32px',
  gap: '4px',
  marginTop: '2px',
  marginBottom: '4px'
};

const subItemStyle = (active: boolean): React.CSSProperties => ({
  fontSize: '12px',
  color: active ? '#14532d' : '#64748b',
  fontWeight: active ? '600' : 'normal',
  textDecoration: 'none',
  padding: '4px 0',
  cursor: 'pointer'
});

const mainContentWrapperStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  overflow: 'hidden'
};

const headerStyle: React.CSSProperties = {
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  marginTop: '12px'
};

const searchBarContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#ffffff',
  padding: '8px 14px',
  borderRadius: '20px',
  width: '320px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
};

const searchInputStyle: React.CSSProperties = {
  border: 'none',
  outline: 'none',
  width: '100%',
  fontSize: '13px',
  color: '#334155'
};

const headerRightStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const iconBadgeStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: '#ffffff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
};

const profileContainerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  backgroundColor: '#ffffff',
  padding: '4px 12px 4px 6px',
  borderRadius: '24px',
  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
};

const avatarStyle: React.CSSProperties = {
  width: '30px',
  height: '30px',
  borderRadius: '50%',
  backgroundColor: '#14532d',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default MainLayout;