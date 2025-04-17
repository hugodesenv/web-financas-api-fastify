import { Prisma } from "@prisma/client";
import { prisma } from "../../..";
import { PurposeRepositoryInfra } from "./infra/purpose.repository.infra";

export class PurposeRepository implements PurposeRepositoryInfra {
  async create(
    purpose: Prisma.PurposeCreateInput
  ): Promise<{ description: string; id: number }> {
    const response = await prisma.purpose.create({ data: purpose });
    return response;
  }
}
