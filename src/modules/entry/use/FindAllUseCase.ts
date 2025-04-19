import { Entry } from "@prisma/client";
import { EntryRepository } from "../repository/EntryRepository";

export class FindAllEntryUseCase {
  constructor(readonly repository: EntryRepository) { }

  async execute(): Promise<Entry[]> {
    const entries = await this.repository.findAll();
    return entries;
  }
}