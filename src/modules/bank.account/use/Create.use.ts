import { TAPIResponse } from "../../../utils/commom.types.utils";
import { BankAccountRepository } from "../repository/Bank.account.repository";
import { TCreateBankAccountSchema } from "../type/bank.account.type";

export class CreateBankAccountUseCase {
  constructor(private readonly repository: BankAccountRepository) {}

  async execute(data: TCreateBankAccountSchema): Promise<TAPIResponse> {
    const { id } = await this.repository.create({
      description: data.description,
      initial_date: data.initial_date,
      active: data.active,
      initial_value: data.initial_value,
    });

    return { success: id.length > 0 };
  }
}
