from sqlalchemy import Column, Integer, String, Float
from config.database import Base


class Producto(Base):
    __tablename__ = "producto"

    codigo = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(255), nullable=False)
    descripcion = Column(String(255))
    precio = Column(Float, nullable=False)
    stock = Column(Integer, default=0)
