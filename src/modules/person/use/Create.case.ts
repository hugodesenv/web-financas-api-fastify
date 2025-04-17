import { TAPIResponse } from "../../../utils/commom.types.utils";
import { TCreatePersonSchema } from "../type/person.type";
import { PersonRepository } from "../repository/Person.repository";

export class CreatePersonUseCase {
  constructor(private readonly repository: PersonRepository) { }

  async execute(data: TCreatePersonSchema): Promise<TAPIResponse> {
    const { active, name, nickname } = data;
    const newPerson = await this.repository.create({ active, name, nickname });
    return { success: newPerson.id > 0 }
  }
}