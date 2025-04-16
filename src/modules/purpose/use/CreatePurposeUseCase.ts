import { TAPIResponse } from "../../../utils/commonTypes";
import { PurposeRepository } from "../repository/PurposeRepository";
import { TCreatePurposeSchema } from "../type/purposeType";

export class CreatePurposeUseCase {
  constructor(private readonly repository: PurposeRepository) {}

  async execute(data: TCreatePurposeSchema): Promise<TAPIResponse> {
    const { description } = data;
    const purpose = await this.repository.create({ description });
    return { success: purpose.id > 0 };
  }
}
