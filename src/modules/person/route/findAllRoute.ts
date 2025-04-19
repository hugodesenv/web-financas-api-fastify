import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FindAllPersonUseCase } from "../use/FindAllUseCase";
import { PersonRepository } from "../repository/PersonRepository";
import { TAPIResponse } from "../../../utils/commomUtils";

export function findAllPersonRoute(app: FastifyInstance) {

  app.get('/', {}, async (req: FastifyRequest, rep: FastifyReply) => {
    const use = new FindAllPersonUseCase(new PersonRepository());
    const data = await use.execute();

    return rep.status(200).send(<TAPIResponse>{ success: true, data })
  })
}