import api from './api';
import type { MetricasLongitud } from '../types';

export const getMetricasLongitud = async (): Promise<MetricasLongitud> => {
  const response = await api.get('/metricas/longitud-comentarios');
  return response.data.metricas;
};