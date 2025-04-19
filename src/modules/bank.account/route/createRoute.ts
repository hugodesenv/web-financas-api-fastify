import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateBankAccountSchema } from "../schema/bankAccountSchemas";
import { TCreateBankAccountSchema } from "../type/bankAccountTypes";
import { CreateBankAccountUseCase } from "../use/CreateBankAccount.use";
import { BankAccountRepository } from "../repository/BankAccountRepository";

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
