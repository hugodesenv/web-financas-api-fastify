import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { TAPIResponse } from '../../../utils/types/commonTypes';
import { CreateAccountSchema } from '../accountSchemas';
import { TCreateAccountSchema } from '../accountType';
import { AccountRepository } from '../repository/AccountRepository';
import { CreateAccountUseCase } from '../use/CreateUseCase';

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