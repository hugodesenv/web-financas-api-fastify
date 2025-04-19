import { Person } from "@prisma/client";
import { PersonRepository } from "../repository/PersonRepository";

export class FindAllPersonUseCase {
  constructor(readonly repository: PersonRepository) { }

  async execute(): Promise<Person[]> {
    const personList = await this.repository.findAll();
    return personList;
  }
}