import { Static } from "@sinclair/typebox";
import { CreateBankAccountSchema } from "../schema/bankAccountSchemas";

export type TCreateBankAccountSchema = Static<typeof CreateBankAccountSchema>;
