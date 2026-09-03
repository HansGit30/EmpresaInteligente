import api from './api';

// Tipos para el módulo NLP
export interface ResultadoNLP {
  comentario_id: number;
  cantidad_palabras: number;
  palabras_limpias: string[];
  palabras_frecuentes: { palabra: string; frecuencia: number }[];
  categoria_detectada: string;
  confianza: number;
}

export interface RespuestaProcesamiento {
  status: string;
  categoria: string;
  confianza: number;
  data: ResultadoNLP[];
}

// 1. Enviar un comentario a procesar individualmente con NLTK
export const procesarComentarioNLP = async (id: number): Promise<RespuestaProcesamiento> => {
  const response = await api.post(`/nlp/procesar/${id}`);
  return response.data;
};

// 2. Obtener lista de palabras más frecuentes
export const getPalabrasFrecuentes = async (limit = 10) => {
  const response = await api.get(`/nlp/palabras-frecuentes?limit=${limit}`);
  return response.data;
};

// 3. Obtener distribución por categorías de NLTK
export const getCategoriasNLP = async () => {
  const response = await api.get('/nlp/categorias');
  return response.data;
};