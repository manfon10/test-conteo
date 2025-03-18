import "dotenv/config";

import { get } from "env-var";

export const envs = {
  PORT: get("PORT").asPortNumber(),
  NODE_ENV: get("NODE_ENV").default("development").asString(),
  MONGO_USER: get("MONGO_USER").required().asString(),
  MONGO_PASSWORD: get("MONGO_PASSWORD").required().asString(),
  MONGO_PORT: get("MONGO_PORT").required().asPortNumber(),
  MONGO_DB: get("MONGO_DB").required().asString(),
  MONGO_HOST: get("MONGO_HOST").required().asString(),
};
