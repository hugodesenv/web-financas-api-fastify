import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import { authenticationRoute } from "./modules/account/route/authenticationRoute";
import { createPersonRoute } from "./modules/person/route/createRoute";
import { authenticationAPIPlugin } from "./plugin/authenticationAPIPlugin";
import { API_CONFIG } from "./utils/env";
import { TAPIResponse } from "./utils/commonTypes";
import { createAccountRoute } from "./modules/account/route/createRoute";
import { createPurposeRoute } from "./modules/purpose/route/createRoute";
import { createEntryRoute } from "./modules/entry/route/createRoute";

const server = fastify();
export const prisma = new PrismaClient();

// jwt
server.register(fastifyJwt, {
  secret: API_CONFIG.jwt_secret,
});

// hooks
server.addHook("onRequest", async (req, rep) => await authenticationAPIPlugin(req, rep));

// routes
server.get("/", async (request, reply) => {
  return { success: true, message: "API is running", statusCode: 200 } as TAPIResponse;
});

server.register(
  (instance: FastifyInstance) => {
    instance.register(authenticationRoute);
    instance.register(createAccountRoute);
  },
  { prefix: "/account" }
);

server.register(
  (instance: FastifyInstance) => {
    instance.register(createEntryRoute);
  },
  { prefix: "/entry" }
);

server.register(
  (instance: FastifyInstance) => {
    instance.register(createPurposeRoute);
  },
  { prefix: "purpose" }
);

server.register(createPersonRoute, { prefix: "/person" });

// starting
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
