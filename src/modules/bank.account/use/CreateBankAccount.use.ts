import { TAPIResponse } from "../../../utils/commomUtils";
import { BankAccountRepository } from "../repository/BankAccountRepository";
import { TCreateBankAccountSchema } from "../type/bankAccountTypes";
import dayjs from 'dayjs';

export class CreateBankAccountUseCase {
  constructor(private readonly repository: BankAccountRepository) { }

  async execute(data: TCreateBankAccountSchema): Promise<TAPIResponse> {
    console.log('...bank account', data)
    const { id } = await this.repository.create({
      description: data.description,
      initial_date: dayjs(data.initial_date).toDate(),
      active: data.active,
      initial_value: data.initial_value,
    });

    return { success: id.length > 0 };
  }
}
