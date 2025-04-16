import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode, TAPIResponse } from "../../../utils/types/commonTypes";
import { CreatePersonSchema } from "../schema/personSchemas";
import { TCreatePersonSchema } from "../type/personTypes";
import { CreatePersonUseCase } from "../use/CreatePersonUseCase";
import { PersonRepository } from "../repository/PersonRepository";

export function createPersonRoute(app: FastifyInstance) {
  app.post('/', {
    schema: {
      body: CreatePersonSchema,
    }
  }, async (req: FastifyRequest<{ Body: TCreatePersonSchema }>, rep: FastifyReply) => {
    const useCase = new CreatePersonUseCase(new PersonRepository());
    const response = await useCase.execute(req.body);

    return rep.status(EnAPIStatusCode.ACCEPTED).send(response);
  })
}