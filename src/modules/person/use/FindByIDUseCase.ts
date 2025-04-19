import { TAPIResponse } from "../../../utils/commomUtils";
import { PersonRepository } from "../repository/PersonRepository";

export class FindByIDPersonUseCase {
  constructor(readonly repository: PersonRepository) { }

  async execute(id: number): Promise<TAPIResponse> {
    const person = await this.repository.findByID(id);

    return {
      data: [person],
      success: [person].length > 0
    }
  }
}