import { TAPIResponse } from "../../../utils/types/commonTypes";
import { PurposeRepository } from "../repository/PurposeRepository";

export class CreatePurposeUseCase {
  constructor(private readonly repository: PurposeRepository) {}

  async execute(): Promise<TAPIResponse> {
    return {
      success: true,
    };
  }
}
