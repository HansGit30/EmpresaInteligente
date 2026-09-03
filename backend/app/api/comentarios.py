from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.database.connection import supabase

router = APIRouter(prefix="/comentarios", tags=["Comentarios"])

class ComentarioCreate(BaseModel):
    cliente_id: int
    contenido: str
    canal: Optional[str] = "web"
    estado: Optional[str] = "pendiente"

@router.get("")
def listar_comentarios():
    try:
        res = supabase.table("comentarios").select("*").order("id", desc=True).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error en Supabase: {str(e)}")

@router.post("")
def crear_comentario(comentario: ComentarioCreate):
    try:
        payload = {
            "cliente_id": int(comentario.cliente_id),
            "contenido": str(comentario.contenido),
            "canal": str(comentario.canal),
            "estado": str(comentario.estado),
            "procesado": False
        }
        res = supabase.table("comentarios").insert(payload).execute()
        return res.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al insertar en Supabase: {str(e)}")