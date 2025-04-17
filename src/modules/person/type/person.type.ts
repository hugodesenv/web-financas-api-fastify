import { Static } from "@sinclair/typebox";
import { CreatePersonSchema } from "../schema/create.person.schemas";

export type TCreatePersonSchema = Static<typeof CreatePersonSchema>;