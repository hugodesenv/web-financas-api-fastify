import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreatePurposeSchema } from "../schema/create.purpose.schema";
import { CreatePurposeUseCase } from "../use/Crate.case";
import { PurposeRepository } from "../repository/Purpose.repository";
import { TCreatePurposeSchema } from "../type/purpose.type";

export function createPurposeRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: CreatePurposeSchema,
      },
    },
    async (req: FastifyRequest<{ Body: TCreatePurposeSchema }>, rep: FastifyReply) => {
      const use = new CreatePurposeUseCase(new PurposeRepository());
      const response = await use.execute(req.body);
      return rep.status(response.success ? 200 : 400).send(response);
    }
  );
}
