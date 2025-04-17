import { AccountRepository } from "../repository/Account.repository";

export class AuthenticationUseCase {
  constructor(
    private readonly username: string,
    private readonly password: string,
    private readonly repository: AccountRepository,
  ) { }

  async execute(): Promise<{ success: boolean, message: string }> {
    const account = await this.repository.findUserCredential({ username: this.username, password: this.password });

    if (account?.active !== true) {
      return { success: false, message: "Account not found or not active" }
    }

    return {
      success: account !== null,
      message: ""
    }
  }
}