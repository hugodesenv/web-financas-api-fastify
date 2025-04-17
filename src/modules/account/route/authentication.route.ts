import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode, TAPIResponse } from "../../../utils/commom.types.utils";
import { AuthenticationAccountSchema } from "../schema/account.schemas";
import { TAuthenticationAccountSchema } from "../type/account.type";
import { AuthenticationUseCase } from "../use/Authentication.use";
import { AccountRepository } from "../repository/Account.repository";

export function authenticationRoute(app: FastifyInstance) {
  app.post(
    "/auth",
    {
      schema: {
        body: AuthenticationAccountSchema,
      },
    },
    async (req: FastifyRequest<{ Body: TAuthenticationAccountSchema }>, rep: FastifyReply) => {
      const { password, username } = req.body;

      const use = new AuthenticationUseCase(username, password, new AccountRepository());
      const { success, message } = await use.execute();

      if (!success) {
        return rep.status(EnAPIStatusCode.UNAUTHORIZED).send(<TAPIResponse>{ success, message: message ?? "Access not allowed" });
      }

      const token = app.jwt.sign({ username }, { expiresIn: "8h" });

      return rep.status(EnAPIStatusCode.ACCEPTED).send(<TAPIResponse>{
        success,
        statusCode: EnAPIStatusCode.ACCEPTED,
        data: { token },
      });
    }
  );
}
