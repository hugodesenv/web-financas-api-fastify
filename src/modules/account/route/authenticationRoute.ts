import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode, TAPIResponse } from "../../../utils/commonTypes";
import { AuthenticationAccountSchema } from "../accountSchemas";
import { TAuthenticationAccountSchema } from "../accountType";
import { AuthenticationUseCase } from "../use/AuthenticationUseCase";
import { AccountRepository } from "../repository/AccountRepository";

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
