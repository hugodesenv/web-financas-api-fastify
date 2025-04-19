import { TAPIResponse } from "../../../utils/commomUtils";
import { TCreatePersonSchema } from "../type/personType";
import { PersonRepository } from "../repository/PersonRepository";

export class CreatePersonUseCase {
  constructor(private readonly repository: PersonRepository) { }

  async execute(data: TCreatePersonSchema): Promise<TAPIResponse> {
    const { active, name, nickname, type } = data;
    const newPerson = await this.repository.create({
      active,
      name,
      nickname,
      is_client: type.client,
      is_company: type.company,
      is_employee: type.employee
    });

    return { success: newPerson.id > 0 }
  }
}