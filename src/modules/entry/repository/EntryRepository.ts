import { $Enums, Entry, Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { EntryRepositoryInfra } from "./EntryRepositoryInfra";

export class EntryRepository implements EntryRepositoryInfra {
  async findAll(): Promise<{ id: number; person_id: number; purpose_id: number; total: Prisma.Decimal; type: $Enums.EntryType; bank_account_id: string; created_at: Date; issue_date: Date; }[]> {
    const entries = await prisma.entry.findMany();
    return entries;
  }

  async create(data: Prisma.EntryUncheckedCreateInput): Promise<Entry> {
    const entry = await prisma.entry.create({ data });
    return entry;
  }
}
