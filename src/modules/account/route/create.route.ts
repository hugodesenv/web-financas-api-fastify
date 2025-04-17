import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TAPIResponse } from '../../../utils/commom.types.utils';
import { CreateAccountSchema } from '../schema/account.schemas';
import { TCreateAccountSchema } from '../type/account.type';
import { AccountRepository } from '../repository/Account.repository';
import { CreateAccountUseCase } from '../use/Create.use';

export function createAccountRoute(app: FastifyInstance) {
  app.post('/', {
    schema: {
      body: CreateAccountSchema,
    }
  }, async (req: FastifyRequest<{ Body: TCreateAccountSchema }>, rep: FastifyReply) => {
    const use = new CreateAccountUseCase(new AccountRepository());
    const response = await use.execute(req.body);

    return rep.status(response.success ? 200 : 400).send(response);
  })
}