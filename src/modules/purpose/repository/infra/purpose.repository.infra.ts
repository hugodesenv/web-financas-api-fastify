import { Prisma, Purpose } from "@prisma/client";

export interface PurposeRepositoryInfra {
  create(purpose: Prisma.PurposeCreateInput): Promise<Purpose>;
}
