from fastapi import APIRouter, HTTPException, Query
from app.services.dashboard_service import obtener_resumen_kpis, obtener_top_palabras_globales

router = APIRouter(prefix="/dashboard", tags=["Dashboard y Visualización"])

@router.get("/resumen")
def resumen_kpis_endpoint():
    try:
        data = obtener_resumen_kpis()
        return {"status": "ok", "kpis": data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener KPIs: {str(e)}")

@router.get("/top-palabras")
def top_palabras_endpoint(limit: int = Query(default=10, ge=1, le=50)):
    try:
        top_list = obtener_top_palabras_globales(limit=limit)
        return {"status": "ok", "total": len(top_list), "data": top_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener top palabras: {str(e)}")