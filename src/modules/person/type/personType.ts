import { Static } from "@sinclair/typebox";
import { CreatePersonSchema, DeletePersonSchema } from "../schema/personSchemas";

export type TCreatePersonSchema = Static<typeof CreatePersonSchema>;
export type TDeletePersonSchema = Static<typeof DeletePersonSchema>;