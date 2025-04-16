import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreatePurposeSchema } from "../schema/purposeSchema";
import { CreatePurposeUseCase } from "../use/CreatePurposeUseCase";
import { PurposeRepository } from "../repository/PurposeRepository";
import { TCreatePurposeSchema } from "../type/purposeType";

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
