import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TAPIResponse } from "../../../utils/commomUtils";
import { PersonRepository } from "../repository/PersonRepository";
import { PersonIDSchema } from "../schema/personSchemas";
import { TFindByIDPersonSchema } from "../type/personType";
import { FindByIDPersonUseCase } from "../use/FindByIDUseCase";

export function findByIDPersonRoute(app: FastifyInstance) {

  app.get('/find/', {
    schema: {
      querystring: PersonIDSchema,
    }
  }, async (req: FastifyRequest<{ Querystring: TFindByIDPersonSchema }>, rep: FastifyReply) => {
    const use = new FindByIDPersonUseCase(new PersonRepository());
    const person = await use.execute(req.query.id);
    return rep.status(200).send(person)
  })
}