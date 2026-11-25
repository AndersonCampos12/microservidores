from pydantic import BaseModel, ConfigDict, Field


class ProductoCreate(BaseModel):
    nombre: str = Field(min_length=1)
    descripcion: str | None = None
    precio: float = Field(gt=0)
    stock: int = Field(default=0, ge=0)


class ProductoResponse(ProductoCreate):
    codigo: int

    model_config = ConfigDict(from_attributes=True)
