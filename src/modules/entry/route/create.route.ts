import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateEntrySchemas } from "../schema/create.entry.schemas";
import { TCreateEntrySchema } from "../type/entry.type";
import { EntryRepository } from "../repository/Entry.repository";
import { CreateEntryUseCase } from "../use/Create.use";

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
