import { $Enums, Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { EntryRepositoryInfra } from "./infra/entryRepositoryInfra";

export class EntryRepository implements EntryRepositoryInfra {
  async create(
    data: Prisma.EntryUncheckedCreateInput
  ): Promise<{ person_id: number; purpose_id: number; total: Prisma.Decimal; type: $Enums.EntryType; id: number }> {
    const entry = await prisma.entry.create({ data });
    return entry;
  }
}
