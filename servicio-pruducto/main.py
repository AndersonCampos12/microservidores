from fastapi import FastAPI

from config.database import engine, Base
from router.producto_route import router as producto_router

app = FastAPI(
    title="Servicio de Productos",
    description="Servicio desarrollado en clases",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(producto_router, prefix="/api")

@app.get("")
def inicio():
    return {"mensaje": "Bienvenido servicio ejecutandose correctamente"}


 