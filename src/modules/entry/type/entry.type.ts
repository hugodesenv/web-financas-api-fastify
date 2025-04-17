import { Static } from "@sinclair/typebox";
import { CreateEntrySchemas } from "../schema/create.entry.schemas";

export type TCreateEntrySchema = Static<typeof CreateEntrySchemas>;
