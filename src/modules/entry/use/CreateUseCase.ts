import dayjs from "dayjs";
import { TAPIResponse } from "../../../utils/commomUtils";
import { checkAndThrow } from "../../../utils/helperUtils";
import { PersonRepository } from "../../person/repository/PersonRepository";
import { ValidatePersonUseCase } from "../../person/use/ValidateUseCase";
import { PurposeRepository } from "../../purpose/repository/PurposeRepository";
import { ValidatePurposeUseCase } from "../../purpose/use/ValidadeUseCase";
import { EntryRepository } from "../repository/EntryRepository";
import { TCreateEntrySchema } from "../type/entryType";

export class CreateEntryUseCase {
  constructor(private readonly repository: EntryRepository) { }

  async execute(data: TCreateEntrySchema): Promise<TAPIResponse> {
    const validatePerson = new ValidatePersonUseCase(new PersonRepository());
    const validatePurpose = new ValidatePurposeUseCase(new PurposeRepository());

    const validationResponse = await Promise.all([
      validatePerson.execute({ id: data.person_id }),
      validatePurpose.execute(data.purpose_id)
    ]);

    checkAndThrow(validationResponse);

    const payload = {
      person_id: data.person_id,
      purpose_id: data.purpose_id,
      type: data.type,
      total: data.total,
      bank_account_id: data.bank_account_id,
      issue_date: dayjs(data.issue_date).toDate()
    }

    const response = await this.repository.create(payload);

    return { success: response.id > 0 };
  }
}
