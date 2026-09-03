from fastapi import APIRouter, HTTPException
from app.database.connection import supabase
from app.services.scipy_service import calcular_metricas_longitud

router = APIRouter(prefix="/metricas", tags=["Análisis Estadístico (SciPy)"])

@router.get("/longitud-comentarios")
def obtener_metricas_longitudes():
    try:
        # Obtener la cantidad de palabras guardadas en analisis_nlp
        res = supabase.table("analisis_nlp").select("cantidad_palabras").execute()
        
        if not res.data:
            return {
                "status": "ok",
                "message": "No hay datos procesados en analisis_nlp aún",
                "metricas": calcular_metricas_longitud([])
            }
        
        # Extraer lista de enteros
        longitudes = [item["cantidad_palabras"] for item in res.data if item.get("cantidad_palabras") is not None]
        
        # Procesar estadísticas con SciPy
        metricas = calcular_metricas_longitud(longitudes)
        
        return {
            "status": "ok",
            "metricas": metricas
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al calcular métricas: {str(e)}")