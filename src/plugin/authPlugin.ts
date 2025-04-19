import { FastifyReply, FastifyRequest } from "fastify";
import { EnAPIStatusCode, TAPIResponse } from "../utils/commomUtils";

const URL_IGNORE = ["/", "/account/auth"];

export async function authenticationAPIPlugin(request: FastifyRequest, reply: FastifyReply) {
  const { url } = request;

  if (URL_IGNORE.includes(url)) {
    return;
  }

  try {
    await request.jwtVerify();
  } catch (e: any) {
    return reply.status(EnAPIStatusCode.UNAUTHORIZED).send(<TAPIResponse>{
      success: false,
      message: e?.message ?? "Fail to authenticate",
      statusCode: EnAPIStatusCode.UNAUTHORIZED,
    });
  }
}
