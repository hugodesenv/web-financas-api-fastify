import { TAPIResponse } from "../../../utils/types/commonTypes";
import { TCreatePersonSchema } from "../type/personTypes";
import { PersonRepository } from "../repository/PersonRepository";

export class CreatePersonUseCase {
  constructor(private readonly repository: PersonRepository) { }

  async execute(data: TCreatePersonSchema): Promise<TAPIResponse> {
    const { active, name, nickname } = data;
    const newPerson = await this.repository.create({ active, name, nickname });
    return { success: newPerson.id > 0 }
  }
}