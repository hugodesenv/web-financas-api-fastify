import fastifyJwt from "@fastify/jwt";
import { PrismaClient } from "@prisma/client";
import fastify, { FastifyInstance } from "fastify";
import { authenticationRoute } from "./modules/account/route/authentication.route";
import { createPersonRoute } from "./modules/person/route/create.route";
import { authenticationAPIPlugin } from "./plugin/authentication.api.plugin";
import { API_CONFIG } from "./utils/env.utils";
import { TAPIResponse } from "./utils/commom.types.utils";
import { createAccountRoute } from "./modules/account/route/create.route";
import { createPurposeRoute } from "./modules/purpose/route/create.route";
import { createEntryRoute } from "./modules/entry/route/create.route";
import { createBankAccountRoute } from "./modules/bank.account/route/create.route";

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

server.register(createBankAccountRoute, { prefix: "/bank-account" });

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
