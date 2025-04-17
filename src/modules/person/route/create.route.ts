import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode, TAPIResponse } from "../../../utils/commom.types.utils";
import { CreatePersonSchema } from "../schema/create.person.schemas";
import { TCreatePersonSchema } from "../type/person.type";
import { CreatePersonUseCase } from "../use/Create.case";
import { PersonRepository } from "../repository/Person.repository";

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
