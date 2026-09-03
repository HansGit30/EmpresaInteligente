from collections import Counter
from app.database.connection import supabase

def obtener_resumen_kpis():
    # Total de comentarios
    res_comentarios = supabase.table("comentarios").select("id, procesado").execute()
    total_comentarios = len(res_comentarios.data) if res_comentarios.data else 0
    procesados = sum(1 for c in res_comentarios.data if c.get("procesado") is True)
    pendientes = total_comentarios - procesados

    # Datos de analisis_nlp
    res_nlp = supabase.table("analisis_nlp").select("cantidad_palabras").execute()
    total_analizados = len(res_nlp.data) if res_nlp.data else 0
    
    total_palabras = sum(item.get("cantidad_palabras", 0) for item in res_nlp.data) if res_nlp.data else 0
    promedio_palabras = round(total_palabras / total_analizados, 2) if total_analizados > 0 else 0.0

    return {
        "total_comentarios": total_comentarios,
        "comentarios_procesados": procesados,
        "comentarios_pendientes": pendientes,
        "total_palabras_analizadas": total_palabras,
        "promedio_palabras_por_comentario": promedio_palabras
    }

def obtener_top_palabras_globales(limit: int = 10):
    res_nlp = supabase.table("analisis_nlp").select("palabras_frecuentes").execute()
    if not res_nlp.data:
        return []

    contador_global = Counter()

    for fila in res_nlp.data:
        frecuentes = fila.get("palabras_frecuentes") or []
        for item in frecuentes:
            palabra = item.get("palabra")
            frecuencia = item.get("frecuencia", 1)
            if palabra:
                contador_global[palabra] += frecuencia

    top_palabras = [
        {"palabra": palabra, "frecuencia": freq}
        for palabra, freq in contador_global.most_common(limit)
    ]

    return top_palabras