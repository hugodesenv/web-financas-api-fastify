import { Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { PersonRepositoryInfra } from "./infra/personRepositoryInfra";

export class PersonRepository implements PersonRepositoryInfra {
  async findByID(id: number): Promise<{ name: string; id: number; nickname: string; active: boolean } | null> {
    const person = await prisma.person.findFirst({ where: { id } });
    return person;
  }

  async create(person: Prisma.PersonCreateInput): Promise<{ active: boolean; id: number; name: string; nickname: string }> {
    return await prisma.person.create({ data: person });
  }
}
