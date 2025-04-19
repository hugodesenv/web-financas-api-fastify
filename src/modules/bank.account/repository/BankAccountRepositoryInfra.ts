import { Bank_account, Prisma } from "@prisma/client";

export interface BankAccountRepositoryInfra {
  create(data: Prisma.Bank_accountUncheckedCreateInput): Promise<Bank_account>;
}
