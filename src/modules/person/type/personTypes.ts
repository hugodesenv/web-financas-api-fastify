import { Static } from "@sinclair/typebox";
import { CreatePersonSchema } from "../schema/personSchemas";

export type TCreatePersonSchema = Static<typeof CreatePersonSchema>;