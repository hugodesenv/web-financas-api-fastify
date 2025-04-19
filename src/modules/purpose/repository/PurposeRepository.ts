import { Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { PurposeRepositoryInfra } from "./PurposeRepositoryInfra";

export class PurposeRepository implements PurposeRepositoryInfra {
  async findAll(): Promise<{ id: number; description: string; }[]> {
    return await prisma.purpose.findMany();
  }

  async findByID(id: number): Promise<{ id: number; description: string; } | null> {
    const response = await prisma.purpose.findFirst({ where: { id } });
    return response;
  }

  async create(
    purpose: Prisma.PurposeCreateInput
  ): Promise<{ description: string; id: number }> {
    const response = await prisma.purpose.create({ data: purpose });
    return response;
  }
}
