import { Account, Prisma } from "@prisma/client";

export interface AccountRepositoryInfra {
  create(account: Prisma.AccountCreateInput): Promise<Account>;

  findUserCredential(props: { username?: string, password?: string }):
    Promise<{ id: string; username: string; password: string; active: boolean } | null>;
}