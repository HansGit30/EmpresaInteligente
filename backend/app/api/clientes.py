from fastapi import APIRouter
from app.database.connection import supabase

router = APIRouter(prefix="/clientes", tags=["Clientes"])

@router.get("/")
def listar_clientes():
    response = supabase.table("clientes").select("*").execute()
    return response.data