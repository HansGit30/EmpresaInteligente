import React from 'react';
import { Card } from '../ui/Card';

interface NlpStatusBoxProps {
  inputValue: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProcess: () => void;
}

export const NlpStatusBox: React.FC<NlpStatusBoxProps> = ({ inputValue, onChange, onProcess }) => (
  <Card style={{ margin: '20px 0' }}>
    <h3 style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '12px', color: '#0f172a' }}>
      Ejecutar Procesamiento NLP
    </h3>
    <div style={{ display: 'flex', gap: '12px', maxWidth: '400px' }}>
      <input 
        type="text" 
        value={inputValue} 
        onChange={onChange}
        style={{
          flex: 1,
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          outline: 'none',
          fontSize: '14px'
        }}
      />
      <button 
        onClick={onProcess}
        style={{
          backgroundColor: '#16a34a',
          color: '#ffffff',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Procesar NLTK
      </button>
    </div>
  </Card>
);