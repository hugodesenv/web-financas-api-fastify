import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateBankAccountSchema } from "../schema/create.bank.account.schema";
import { TCreateBankAccountSchema } from "../type/bank.account.type";
import { CreateBankAccountUseCase } from "../use/Create.use";
import { BankAccountRepository } from "../repository/Bank.account.repository";

export function createBankAccountRoute(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        body: CreateBankAccountSchema,
      },
    },
    async (req: FastifyRequest<{ Body: TCreateBankAccountSchema }>, rep: FastifyReply) => {
      const use = new CreateBankAccountUseCase(new BankAccountRepository());
      const response = await use.execute(req.body);
      return rep.status(response.success ? 200 : 400).send(response);
    }
  );
}
