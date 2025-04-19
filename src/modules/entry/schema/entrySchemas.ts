import { EntryType } from "@prisma/client";
import { Type } from "@sinclair/typebox";

export const CreateEntrySchemas = Type.Object({
  person_id: Type.Integer(),
  purpose_id: Type.Integer(),
  total: Type.Number({ exclusiveMinimum: 0 }),
  type: Type.Enum(EntryType),
  issue_date: Type.String({ format: 'date' }),
  bank_account_id: Type.String()
});
