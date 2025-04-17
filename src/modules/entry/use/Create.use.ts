import { TAPIResponse } from "../../../utils/commom.types.utils";
import { APIResponseError, checkAndThrow } from "../../../utils/helper.utils";
import { PersonRepository } from "../../person/repository/Person.repository";
import { ValidatePersonUseCase } from "../../person/use/Validate.case";
import { TCreateEntrySchema } from "../type/entry.type";
import { EntryRepository } from "../repository/Entry.repository";

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

    return { success: response.id > 0 };
  }
}
