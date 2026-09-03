import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ children, style }) => (
  <div style={{
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    border: '1px solid #f1f5f9',
    ...style
  }}>
    {children}
  </div>
);