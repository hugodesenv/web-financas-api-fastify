import { Static } from "@sinclair/typebox";
import { CreateEntrySchemas } from "./entrySchemas";

export type TCreateEntrySchema = Static<typeof CreateEntrySchemas>;
