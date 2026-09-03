from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    # Inicializa el cliente de Supabase usando la URL y la KEY del archivo .env
    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

supabase = get_supabase_client()