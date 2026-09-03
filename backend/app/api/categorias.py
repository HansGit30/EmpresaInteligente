from fastapi import APIRouter, HTTPException
from app.database.connection import supabase

router = APIRouter(prefix="/categorias", tags=["Categorías"])

@router.get("")
@router.get("/")
def obtener_categorias():
    try:
        res = supabase.table("categorias").select("*").order("id", desc=False).execute()
        return res.data or []
    except Exception as e:
        print("ERROR CATEGORIAS:", str(e))
        raise HTTPException(status_code=500, detail=f"Error al obtener categorías: {str(e)}")