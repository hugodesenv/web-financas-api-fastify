import { Type } from "@sinclair/typebox";

export const CreateBankAccountSchema = Type.Object({
  active: Type.Boolean({ default: true }),
  description: Type.String({ maxLength: 40 }),
  initial_value: Type.Number(),
  initial_date: Type.String({ format: "date" }),
});
