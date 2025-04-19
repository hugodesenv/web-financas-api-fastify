import { Static } from "@sinclair/typebox";
import { CreatePersonSchema, PersonIDSchema } from "../schema/personSchemas";

export type TCreatePersonSchema = Static<typeof CreatePersonSchema>;
export type TDeletePersonSchema = Static<typeof PersonIDSchema>;
export type TFindByIDPersonSchema = Static<typeof PersonIDSchema>;