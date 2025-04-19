import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { DeletePersonSchema } from "../schema/personSchemas";
import { TDeletePersonSchema } from "../type/personType";
import { DeletePersonUseCase } from "../use/DeletePersonUseCase";
import { PersonRepository } from "../repository/PersonRepository";
import { TAPIResponse } from "../../../utils/commomUtils";

export async function deletePersonRoute(app: FastifyInstance) {
  app.delete('/', {
    schema: {
      querystring: DeletePersonSchema
    }
  }, async (req: FastifyRequest<{ Querystring: TDeletePersonSchema }>, rep: FastifyReply) => {
    const use = new DeletePersonUseCase(new PersonRepository());
    const response = await use.execute(req.query.id);

    return rep.status(response.success ? 200 : 400).send(response);
  });
}