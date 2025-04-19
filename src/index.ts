import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import { authenticationRoute } from "./modules/account/route/authenticationRoute";
import { createPersonRoute } from "./modules/person/route/createRoute";
import { authenticationAPIPlugin } from "./plugin/authPlugin";
import { API_CONFIG } from "./utils/envUtils";
import { TAPIResponse } from "./utils/commomUtils";
import { createAccountRoute } from "./modules/account/route/createRoute";
import { createPurposeRoute } from "./modules/purpose/route/createRoute";
import { createEntryRoute } from "./modules/entry/route/createRoute";
import { createBankAccountRoute } from "./modules/bank.account/route/createRoute";
import { findAllEntryRoute } from "./modules/entry/route/findAllRoute";
import { findAllPersonRoute } from "./modules/person/route/findAllRoute";
import cors from '@fastify/cors';
import { findAllPurposeRoute } from "./modules/purpose/route/finAllRoute";
import { deletePersonRoute } from "./modules/person/route/deleteRoute";

const server = fastify();

server.register(cors, { origin: true });

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

server.register(createBankAccountRoute, { prefix: "/bank-account" });

server.register(
  (instance: FastifyInstance) => {
    instance.register(createEntryRoute);
    instance.register(findAllEntryRoute);
  },
  { prefix: "/entry" }
);

server.register(
  (instance: FastifyInstance) => {
    instance.register(createPurposeRoute);
    instance.register(findAllPurposeRoute);
  },
  { prefix: "/purpose" }
);

server.register((instance: FastifyInstance) => {
  instance.register(createPersonRoute);
  instance.register(findAllPersonRoute);
  instance.register(deletePersonRoute);
}, { prefix: "/person" });

// starting
server.listen({ host: '127.0.0.1', port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
