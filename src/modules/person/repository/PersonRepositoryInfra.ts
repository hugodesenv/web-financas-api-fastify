import { Person, Prisma } from "@prisma/client";

export interface PersonRepositoryInfra {
  create(person: Prisma.PersonCreateInput): Promise<Person>;
  findByID(id: number): Promise<Person | null>;
  findAll(): Promise<Person[]>;
  delete(id: number): Promise<boolean>;
}
