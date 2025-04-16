import { Static } from "@sinclair/typebox";
import { AuthenticationAccountSchema, CreateAccountSchema } from "./accountSchemas";

export type TAuthenticationAccountSchema = Static<typeof AuthenticationAccountSchema>;
export type TCreateAccountSchema = Static<typeof CreateAccountSchema>;