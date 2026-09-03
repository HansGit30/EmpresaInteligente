from typing import Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.database.connection import supabase

router = APIRouter(prefix="/api/clientes", tags=["Clientes"])

class ClienteCreate(BaseModel):
    nombre: str
    empresa: str
    email: str
    telefono: Optional[str] = None

# Obtener todos los clientes
@router.get("")
@router.get("/")
def listar_clientes():
    try:
        response = supabase.table("clientes").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Obtener historial de actividad desde la tabla clientes
@router.get("/historial")
@router.get("/historial/")
def obtener_historial():
    try:
        response = (
            supabase.table("clientes")
            .select("id, nombre, empresa, created_at")
            .order("created_at", desc=True)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Crear un cliente
@router.post("")
@router.post("/")
def crear_cliente(cliente: ClienteCreate):
    try:
        response = supabase.table("clientes").insert({
            "nombre": cliente.nombre,
            "empresa": cliente.empresa,
            "email": cliente.email,
            "telefono": cliente.telefono,
            "activo": True
        }).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Eliminar un cliente por ID
@router.delete("/{cliente_id}")
@router.delete("/{cliente_id}/")
def eliminar_cliente(cliente_id: int):
    try:
        response = supabase.table("clientes").delete().eq("id", cliente_id).execute()
        return {"message": "Cliente eliminado correctamente", "data": response.data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))