import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import DashboardPage from '../pages/Dashboard';
import MetricasPage from '../pages/Metricas';
import ClientesPage from '../pages/Clientes';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="clientes" element={<ClientesPage />} />
        <Route path="metricas" element={<MetricasPage />} />
      </Route>
    </Routes>
  );
};