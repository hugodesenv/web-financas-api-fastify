import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreatePurposeSchema } from "../schema/purposeSchema";
import { CreatePurposeUseCase } from "../use/CreatePurposeUseCase";
import { PurposeRepository } from "../repository/PurposeRepository";

export function createPurposeRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: CreatePurposeSchema,
      },
    },
    async (req: FastifyRequest, rep: FastifyReply) => {
      const use = new CreatePurposeUseCase(new PurposeRepository());
      const response = await use.execute();

      return rep.status(response.success ? 200 : 400).send(response);
    }
  );
}
