import { Entry, Prisma } from "@prisma/client";

export interface EntryRepositoryInfra {
  create(data: Prisma.EntryUncheckedCreateInput): Promise<Entry>;
  findAll(): Promise<Entry[]>
}
