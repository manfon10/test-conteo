import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./config";
import { ErrorHandler } from "./presentation";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private readonly app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;

    this.port = port;
    this.routes = routes;
  }

  start() {
    this.listen();

    this.middlewares();
  }

  middlewares() {
    this.app.use(express.json());

    this.app.use(express.urlencoded({ extended: true }));

    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    this.app.use("/", this.routes);

    this.app.use(ErrorHandler.handleError);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
