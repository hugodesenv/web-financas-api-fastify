import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateEntrySchemas } from "../schema/entrySchemas";
import { TCreateEntrySchema } from "../type/entryType";
import { EntryRepository } from "../repository/EntryRepository";
import { CreateEntryUseCase } from "../use/CreateUseCase";

export function createEntryRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: CreateEntrySchemas,
      },
    },
    async (req: FastifyRequest<{ Body: TCreateEntrySchema }>, rep: FastifyReply) => {
      const use = new CreateEntryUseCase(new EntryRepository());
      const response = await use.execute(req.body);

      return rep.status(response.success ? 201 : 400).send(response);
    }
  );
}
