import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import DashboardPage from '../pages/Dashboard';
import MetricasPage from '../pages/CientificData';
import ClientesPage from '../pages/Clientes';
import { Comentarios } from '../pages/Comentarios';
import { InteligenciaNLP } from '../pages/InteligenciaNLP';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="metricas" element={<MetricasPage />} />
        <Route path="comentarios" element={<Comentarios />} />
        {/* Nueva ruta para Inteligencia NLP */}
        <Route path="nlp" element={<InteligenciaNLP />} />
      </Route>
    </Routes>
  );
};