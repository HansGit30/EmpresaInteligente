from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import clientes, nlp, metricas, dashboard, comentarios
from app.api.categorias import router as categorias_router
from app.api import scipy

app = FastAPI(title="Empresa Inteligente API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(clientes.router)
app.include_router(nlp.router)
app.include_router(metricas.router)
app.include_router(dashboard.router)
app.include_router(comentarios.router)
app.include_router(categorias_router)
app.include_router(scipy.router)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backend activo"}