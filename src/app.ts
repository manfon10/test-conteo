import { envs } from "./config";
import { MongoDatabase } from "./data";

import { AppRoutes } from "./routes";

import { Server } from "./server";

const main = async () => {
  const mongoUrl = `mongodb://${envs.MONGO_USER}:${envs.MONGO_PASSWORD}@${envs.MONGO_HOST}:${envs.MONGO_PORT}`;

  await MongoDatabase.connect({ dbName: envs.MONGO_DB, mongoUrl });

  const server = new Server({ port: envs.PORT || 3000, routes: AppRoutes.routes });

  server.start();
};

main();
