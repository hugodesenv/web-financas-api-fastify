import { Static } from "@sinclair/typebox";
import { CreateBankAccountSchema } from "../schema/create.bank.account.schema";

export type TCreateBankAccountSchema = Static<typeof CreateBankAccountSchema>;
