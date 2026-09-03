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

export interface MetricasLongitud {
  media: number;
  mediana: number;
  moda: number;
  desviacion_estandar: number;
  varianza: number;
  minimo: number;
  maximo: number;
  total_muestras: number;
}