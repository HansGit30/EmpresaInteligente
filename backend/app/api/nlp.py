from fastapi import APIRouter, HTTPException
from app.database.connection import supabase
from app.services.nltk_service import analizar_comentario

router = APIRouter(prefix="/nlp", tags=["Procesamiento NLP"])

@router.post("/procesar/{comentario_id}")
def procesar_comentario_endpoint(comentario_id: int):
    try:
        # 1. Obtener comentario
        res = supabase.table("comentarios").select("*").eq("id", comentario_id).execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Comentario no encontrado")
        
        comentario = res.data[0]
        texto = comentario.get("contenido") or comentario.get("comentario") or ""
        
        # 2. Procesar NLTK
        resultado = analizar_comentario(texto)
        
        # 3. Payload formateado
        payload = {
            "comentario_id": int(comentario_id),
            "idioma": "es",
            "cantidad_palabras": int(resultado["cantidad_palabras"]),
            "palabras_limpias": list(resultado["palabras_limpias"]),
            "palabras_frecuentes": list(resultado["palabras_frecuentes"])
        }
        
        # 4. Insertar y actualizar
        res_insert = supabase.table("analisis_nlp").insert(payload).execute()
        supabase.table("comentarios").update({"procesado": True}).eq("id", comentario_id).execute()
        
        return {"status": "ok", "data": res_insert.data}

    except HTTPException as http_ex:
        raise http_ex
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))