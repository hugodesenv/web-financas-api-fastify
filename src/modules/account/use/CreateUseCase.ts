import { TAPIResponse } from "../../../utils/types/commonTypes";
import { TCreateAccountSchema } from "../type/accountTypes";
import { AccountRepository } from "../repository/AccountRepository";

export class CreateAccountUseCase {
  constructor(private readonly repository: AccountRepository) { }

  async execute(data: TCreateAccountSchema): Promise<TAPIResponse> {
    const currentAcount = await this.repository.findUserCredential({ username: data.username });

    if (currentAcount !== null) {
      return {
        success: false,
        message: "There is already an account registered with this credential",
      }
    }

    const { id } = await this.repository.create({
      active: data.active,
      username: data.username,
      password: data.password,
    });

    return { success: id.length > 0 };
  }
}