import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TAPIResponse } from "../../../utils/commomUtils";
import { EntryRepository } from "../repository/EntryRepository";
import { FindAllEntryUseCase } from "../use/FindAllUseCase";

export function findAllEntryRoute(app: FastifyInstance) {
  app.get('/', {}, async (req: FastifyRequest, rep: FastifyReply) => {
    const use = new FindAllEntryUseCase(new EntryRepository());
    const entries = await use.execute();

    return rep.status(200).send(<TAPIResponse>{
      success: true,
      data: entries
    });
  })
}