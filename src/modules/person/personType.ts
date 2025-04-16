import { Static } from "@sinclair/typebox";
import { CreatePersonSchema } from "./personSchemas";

export type TCreatePersonSchema = Static<typeof CreatePersonSchema>;