import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode } from "../../../utils/commomUtils";
import { PersonRepository } from "../repository/PersonRepository";
import { CreatePersonSchema } from "../schema/personSchemas";
import { TCreatePersonSchema } from "../type/personType";
import { CreatePersonUseCase } from "../use/CreateUseCase";

export function createPersonRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: CreatePersonSchema,
      },
    },
    async (req: FastifyRequest<{ Body: TCreatePersonSchema }>, rep: FastifyReply) => {
      const useCase = new CreatePersonUseCase(new PersonRepository());
      const response = await useCase.execute(req.body);

      return rep.status(EnAPIStatusCode.ACCEPTED).send(response);
    }
  );
}
