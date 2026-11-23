    import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { db } from '../../prisma/db.js';
import { Factura } from '../../models/factura.model.js';
import { DetalleFactura } from '../../models/detalle-factura.model.js';

@Injectable()
export class FacturaService {  
    //esto es de factura, no de detalle factura 
    async crear(data: Factura){
        const factura =  await db.orm.Factura.where({ codigo: data.codigo }).first();
        if(factura){
            throw new ConflictException('La factura ya existe');
        }
    
    return db.orm.Factura.create({...data, fecha: new Date(data.fecha)});
    }  
    async consultar(codigo: string){
        const factura = await db.orm.Factura.where({codigo: codigo}).first();
        if(!factura){
            throw new NotFoundException("Factura no encontrada");
        }
        return factura;
    }

    async listar(){
        return db.orm.Factura.all();
    }

    async consultarDetalles(codigo: string){
        const factura = await db.orm.Factura.where({codigo: codigo}).first();
        if(!factura){
            throw new NotFoundException("Factura no encontrada");
        }
        return factura.detalles_factura;
    }

    async eliminar(codigo: string){
        const factura = await db.orm.Factura.where({codigo: codigo}).first();
        if(!factura){
            throw new NotFoundException("Factura no encontrada");
        }
        await db.orm.Factura.where({codigo: codigo}).delete();
        return { mensaje: "Factura eliminada correctamente" };
    }
    
        async actualizar(codigo: string, data: Partial<Factura>){
        const factura = await db.orm.Factura.where({codigo: codigo}).first();
        if(!factura){
            throw new NotFoundException("Factura no encontrada");
        }
        const { fecha, ...resto } = data;
        return db.orm.Factura.where({codigo: codigo}).update({
            ...resto,
            ...(fecha && { fecha: new Date(fecha) }),
        });
    }

    //detalle de factura
     async agregarDetalle(codigo: string, data: DetalleFactura){
        const factura = await this.consultar(codigo);
        const detalles = [...factura.detalles_factura, data];
        return db.orm.Factura.where({ codigo }).update({ detalles_factura: detalles });
    }

    //patch 
    async actualizarDetalle(codigo: string, codigoDetalle: number, data: Partial<DetalleFactura>){
        const factura = await this.consultar(codigo);
        const existe = factura.detalles_factura.some(d => d.codigo === codigoDetalle);
        if(!existe){
            throw new NotFoundException("Detalle no encontrado");
        }
        const detalles = factura.detalles_factura.map(d =>
            d.codigo === codigoDetalle ? { ...d, ...data } : d
        );
        return db.orm.Factura.where({ codigo }).update({ detalles_factura: detalles });
    }

    async eliminarDetalle(codigo: string, codigoDetalle: number){
        const factura = await this.consultar(codigo);
        const detalles = factura.detalles_factura.filter(d => d.codigo !== codigoDetalle);
        if(detalles.length === factura.detalles_factura.length){
            throw new NotFoundException("Detalle no encontrado");
        }
        return db.orm.Factura.where({ codigo }).update({ detalles_factura: detalles });
    }

}