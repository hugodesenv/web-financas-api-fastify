import { Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { AccountRepositoryInfra } from "./AccountRepositoryInfra";

export class AccountRepository implements AccountRepositoryInfra {
  async create(account: Prisma.AccountCreateInput): Promise<{ id: string; username: string; password: string; active: boolean; }> {
    return await prisma.account.create({ data: account });
  }

  async findUserCredential(props: { username?: string, password?: string }): Promise<{ id: string; username: string; password: string; active: boolean; } | null> {
    const { password, username } = props;

    const account = await prisma.account.findFirst({
      where: { username, password }
    });

    return account;
  }
}