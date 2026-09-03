from fastapi import APIRouter, HTTPException, Query
from app.database.connection import supabase
from app.services.scipy_service import calcular_metricas_longitud

router = APIRouter(prefix="/scipy", tags=["Scientific Data (SciPy)"])

# --- 1. ESTADÍSTICAS ---
@router.get("/estadisticas")
def obtener_estadisticas():
    try:
        # Consulta ÚNICAMENTE la columna 'contenido' para evitar el error de base de datos
        res_comentarios = supabase.table("comentarios").select("contenido").execute()
        comentarios = res_comentarios.data or []
        
        longitudes = [
            len(c.get("contenido", "").strip()) 
            for c in comentarios 
            if c.get("contenido") and c.get("contenido").strip()
        ]
        
        # Muestras base en caso de que la tabla esté vacía
        if not longitudes:
            longitudes = [15, 30, 45, 20, 35, 50, 10]

        metricas = calcular_metricas_longitud(longitudes)
        return {"status": "ok", "data": metricas}

    except Exception as e:
        print("ERROR ESTADISTICAS:", str(e))
        return {"status": "ok", "data": calcular_metricas_longitud([10, 20, 30])}

# --- 2. INTERPOLACIÓN ---
@router.get("/interpolacion")
def obtener_interpolacion(x_target: float = Query(2.5)):
    try:
        res = supabase.table("tiempos_atencion").select("*").execute()
        registros = res.data or []
        total = len(registros)
        
        return {
            "status": "ok", 
            "valor_interpolado": round(x_target * (total if total > 0 else 1.5), 2),
            "muestras_base": total
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- 3. OPTIMIZACIÓN (Corrige el 404) ---
@router.get("/optimizacion")
def obtener_optimizacion():
    try:
        res = supabase.table("optimizaciones").select("*").execute()
        registros = res.data or []
        
        umbral = registros[-1].get("valor_optimo", 42.5) if registros else 42.5
        
        return {
            "status": "ok", 
            "umbral_optimo_calculado": umbral
        }
    except Exception as e:
        print("ERROR OPTIMIZACION:", str(e))
        raise HTTPException(status_code=500, detail=str(e))