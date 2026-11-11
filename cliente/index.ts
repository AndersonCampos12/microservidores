import fastify from "fastify";
import { sequelize } from "./src/config/database";
import { clienteRouter } from "./src/routes/cliente.route";

const app = fastify({ logger: true });

app.register(clienteRouter, { prefix: "/api" });

const startServer = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const address = await app.listen({
      port: Number(process.env.PORT) || 3001,
      host: process.env.HOST || "0.0.0.0",
    });

    app.log.info(`Servidor escuchando en ${address}`);
  } catch (error) {
    app.log.error({ err: error }, "No se pudo iniciar el servidor");
    try {
      await app.close();
      await sequelize.close();
    } catch (shutdownError) {
      app.log.error({ err: shutdownError }, "Error al cerrar la aplicación");
    }
    process.exitCode = 1;
  }
};

void startServer();
