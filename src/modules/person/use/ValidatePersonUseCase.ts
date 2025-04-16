import { TAPIResponse } from "../../../utils/commonTypes";
import { PersonRepository } from "../repository/PersonRepository";

export interface IProps {
  id: number;
}

export class ValidatePersonUseCase {
  constructor(private readonly repository: PersonRepository) {}

  async execute(props: IProps): Promise<TAPIResponse> {
    const person = await this.repository.findByID(props.id);

    if (!person) {
      return { success: false, message: "Person not found" };
    }

    if (person.active === false) {
      return { success: false, message: "Person is not active" };
    }

    return { success: true, data: person };
  }
}
