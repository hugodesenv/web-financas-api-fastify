import { TAPIResponse } from "../../../utils/commonTypes";
import { checkAndThrow } from "../../../utils/helperUtils";
import { PersonRepository } from "../../person/repository/PersonRepository";
import { ValidatePersonUseCase } from "../../person/use/ValidatePersonUseCase";
import { TCreateEntrySchema } from "../entryType";
import { EntryRepository } from "../repository/EntryRepository";

export class CreateEntryUseCase {
  constructor(private readonly repository: EntryRepository) {}

  async execute(data: TCreateEntrySchema): Promise<TAPIResponse> {
    const validatePerson = new ValidatePersonUseCase(new PersonRepository());

    const validationResponse = await Promise.all([validatePerson.execute({ id: data.person_id })]);
    checkAndThrow(validationResponse);

    const response = await this.repository.create({
      person_id: data.person_id,
      purpose_id: data.purpose_id,
      type: data.type,
      total: data.total,
    });

    return {
      success: response.id > 0,
    };
  }
}
