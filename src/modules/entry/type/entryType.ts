import { Static } from "@sinclair/typebox";
import { CreateEntrySchemas } from "../schema/entrySchemas";

export type TCreateEntrySchema = Static<typeof CreateEntrySchemas>;
