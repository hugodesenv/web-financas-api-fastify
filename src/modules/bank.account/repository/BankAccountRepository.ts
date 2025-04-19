import { Bank_account, Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { BankAccountRepositoryInfra } from "./BankAccountRepositoryInfra";

export class BankAccountRepository implements BankAccountRepositoryInfra {
  async create(data: Prisma.Bank_accountUncheckedCreateInput): Promise<Bank_account> {
    const account = await prisma.bank_account.create({ data });
    return account;
  }
}
