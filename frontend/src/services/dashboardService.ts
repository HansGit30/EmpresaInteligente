import api from './api';

export interface KPIs {
  total_comentarios: number;
  comentarios_procesados: number;
  comentarios_pendientes: number;
  total_palabras_analizadas: number;
  promedio_palabras_por_comentario: number;
}

export interface TopPalabra {
  palabra: string;
  frecuencia: number;
}

export const getDashboardKPIs = async (): Promise<KPIs> => {
  const response = await api.get('/dashboard/resumen');
  return response.data.kpis;
};

export const getTopPalabras = async (limit = 10): Promise<TopPalabra[]> => {
  const response = await api.get(`/dashboard/top-palabras?limit=${limit}`);
  return response.data.data;
};

export const procesarComentarioNLP = async (id: number) => {
  const response = await api.post(`/nlp/procesar/${id}`);
  return response.data;
};