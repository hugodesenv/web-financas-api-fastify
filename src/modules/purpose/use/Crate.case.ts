import { TAPIResponse } from "../../../utils/commom.types.utils";
import { PurposeRepository } from "../repository/Purpose.repository";
import { TCreatePurposeSchema } from "../type/purpose.type";

export class CreatePurposeUseCase {
  constructor(private readonly repository: PurposeRepository) {}

  async execute(data: TCreatePurposeSchema): Promise<TAPIResponse> {
    const { description } = data;
    const purpose = await this.repository.create({ description });
    return { success: purpose.id > 0 };
  }
}
