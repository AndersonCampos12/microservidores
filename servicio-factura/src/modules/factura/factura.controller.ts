import { Controller, Body, Get, Post, Put, Patch, Delete, Param } from '@nestjs/common';
import { FacturaService } from './factura.service.js';

@Controller('facturas')
export class FacturaController {
constructor(private readonly facturaService: FacturaService) { }

@Get()
listar() {
return this.facturaService.listar();
}

@Get(':codigo')
consultar(@Param('codigo') codigo: string) {
return this.facturaService.consultar(codigo);
}

@Post()
crear(@Body() data: any) {
return this.facturaService.crear(data);
}

@Patch(':codigo')
actualizar(
@Param('codigo') codigo: string,
@Body() data: any
) {
return this.facturaService.actualizar(codigo, data);
}

@Delete(':codigo')
eliminar(@Param('codigo') codigo: string) {
return this.facturaService.eliminar(codigo);
}

//DETALLES FACTURA

@Post(':codigo/detalles')
agregarDetalle(
@Param('codigo') codigo: string, @Body() data: any) {
return this.facturaService.agregarDetalle(codigo, data);
}

@Patch(':codigo/detalle/:codigoDetalle')
actualizarDetalle(
@Param('codigo') codigo: string,
@Param('codigoDetalle') codigoDetalle: string,
@Body() data: any
) {
return this.facturaService.actualizarDetalle(codigo, Number(codigoDetalle), data);
}

@Delete(':codigo/detalles/:codigoDetalle')
eliminarDetalle(
@Param('codigo') codigo: string,
@Param('codigoDetalle') codigoDetalle: string
) {
return this.facturaService.eliminarDetalle(codigo, +codigoDetalle);
}
}