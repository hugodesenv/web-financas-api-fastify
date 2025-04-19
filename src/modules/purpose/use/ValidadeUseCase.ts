import { TAPIResponse } from "../../../utils/commomUtils";
import { PurposeRepository } from "../repository/PurposeRepository";

export class ValidatePurposeUseCase {
  constructor(private readonly repository: PurposeRepository) { }

  async execute(id: number): Promise<TAPIResponse> {
    const purpose = await this.repository.findByID(id);

    if (!purpose) {
      return {
        success: false,
        message: "Purpose not found"
      }
    }

    return {
      success: true
    }
  }
}