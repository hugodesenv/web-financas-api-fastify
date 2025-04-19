import { Static } from "@sinclair/typebox";
import { AuthenticationAccountSchema, CreateAccountSchema } from "../schema/accountSchemas";

export type TAuthenticationAccountSchema = Static<typeof AuthenticationAccountSchema>;
export type TCreateAccountSchema = Static<typeof CreateAccountSchema>;