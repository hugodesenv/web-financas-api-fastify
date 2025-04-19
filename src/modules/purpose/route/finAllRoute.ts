import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FindAllPurposeUseCase } from "../use/FindAllUseCase";
import { PurposeRepository } from "../repository/PurposeRepository";
import { TAPIResponse } from "../../../utils/commomUtils";

export function findAllPurposeRoute(app: FastifyInstance) {
  app.get('/', {}, async (req: FastifyRequest, rep: FastifyReply) => {
    const use = new FindAllPurposeUseCase(new PurposeRepository());
    const data = await use.execute();
    return rep.status(200).send(<TAPIResponse>{ success: true, data });
  })
}