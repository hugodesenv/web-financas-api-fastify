import { Person, Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { PersonRepositoryInfra } from "./PersonRepositoryInfra";

export class PersonRepository implements PersonRepositoryInfra {
  async delete(id: number): Promise<boolean> {
    try {
      await prisma.person.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  async findAll(): Promise<Person[]> {
    const query = await prisma.person.findMany();
    return query;
  }

  async findByID(id: number): Promise<Person | null> {
    const query = await prisma.person.findFirst({ where: { id } });
    return query;
  }

  async create(person: Prisma.PersonCreateInput): Promise<Person> {
    return await prisma.person.create({ data: person });
  }
}
