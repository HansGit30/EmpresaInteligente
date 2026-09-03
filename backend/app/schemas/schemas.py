from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# Esquemas para Clientes
class ClienteBase(BaseModel):
    nombre: str
    email: Optional[EmailStr] = None
    telefono: Optional[str] = None
    empresa: Optional[str] = None

class ClienteCreate(ClienteBase):
    pass

class ClienteResponse(ClienteBase):
    id: int
    activo: bool
    created_at: datetime

    class Config:
        from_attributes = True

# Esquemas para Comentarios y NLP
class ComentarioCreate(BaseModel):
    cliente_id: int
    contenido: str
    canal: Optional[str] = "web"

# Esquemas para SciPy (Tiempos de Atención)
class TiempoAtencionCreate(BaseModel):
    cliente_id: int
    tiempo_minutos: float
    operador: Optional[str] = None