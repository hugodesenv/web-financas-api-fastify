import { TAPIResponse } from "../../../utils/commomUtils";
import { PersonRepository } from "../repository/PersonRepository";

export class DeletePersonUseCase {
  constructor(readonly repository: PersonRepository) { }

  async execute(id: number): Promise<TAPIResponse> {
    const personExists = await this.repository.findByID(id);

    if (!personExists) {
      return {
        success: false,
        message: "Person not found"
      }
    }

    const isDeleted = await this.repository.delete(id);
    return { success: isDeleted }
  }
}