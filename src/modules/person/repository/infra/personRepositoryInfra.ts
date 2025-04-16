import { Person, Prisma } from "@prisma/client";

export interface PersonRepositoryInfra {
  create(person: Prisma.PersonCreateInput): Promise<Person>;
}