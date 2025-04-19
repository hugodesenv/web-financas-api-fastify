import { PurposeRepository } from "../repository/PurposeRepository";

export class FindAllPurposeUseCase {
  constructor(readonly repository: PurposeRepository) { }

  async execute() {
    return await this.repository.findAll();
  }
}