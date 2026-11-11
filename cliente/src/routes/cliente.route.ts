import type { FastifyInstance } from "fastify";
import {
  obtenerClientes,
  obtenerClienteId,
  actualizarCliente,
  crearCliente,
  eliminarCliente,
} from "../controllers/cliente.controller";

export const clienteRouter = (app: FastifyInstance) => {
  app.get("/clientes", async (req, res) => {
    try {
      return res.send(await obtenerClientes());
    } catch (error) {
      req.log.error({ err: error }, "Error al obtener los clientes");
      return res.code(400).send({ mensaje: "Error en obtener clientes" });
    }
  });

  app.get<{ Params: { id: string } }>("/clientes/:id", async (req, res) => {
    try {
      return res.send(await obtenerClienteId(Number(req.params.id)));
    } catch (error) {
      req.log.error({ err: error }, "Error al obtener el cliente");
      return res.code(400).send({ mensaje: "Error en obtener cliente" });
    }
  });

  app.post("/clientes", async (req, res) => {
    try {
      return res.code(201).send(await crearCliente(req.body));
    } catch (error) {
      req.log.error({ err: error }, "Error al crear el cliente");
      return res.code(400).send({ mensaje: "Error al crear cliente" });
    }
  });

  app.put<{ Params: { id: string } }>("/clientes/:id", async (req, res) => {
    try {
      return res.send(
        await actualizarCliente(Number(req.params.id), req.body),
      );
    } catch (error) {
      req.log.error({ err: error }, "Error al actualizar el cliente");
      return res.code(400).send({ mensaje: "Error al actualizar cliente" });
    }
  });

  app.delete<{ Params: { id: string } }>("/clientes/:id", async (req, res) => {
    try {
      return res.send(await eliminarCliente(Number(req.params.id)));
    } catch (error) {
      req.log.error({ err: error }, "Error al eliminar el cliente");
      return res.code(400).send({ mensaje: "Error al eliminar cliente" });
    }
  });
};
