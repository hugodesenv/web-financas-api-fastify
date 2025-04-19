import { TAPIResponse } from "./commomUtils";

/**
 * If some object results error, the throw Error is activated.
 * @param props list of TAPIResponse.
 */
export function checkAndThrow(props: TAPIResponse[]) {
  const [withError] = props.filter(({ success }) => !success);

  if (withError) {
    throw new APIFinancasResponseError({ message: withError.message, status: 400 }).toResponse();
  }
}

export class APIFinancasResponseError extends Error {
  constructor(
    private props: {
      message?: string;
      data?: Record<string, any>;
      status?: number;
    }
  ) {
    super(props.message);
    this.props = { ...props, data: props.data ?? {} };
  }

  toResponse = () => {
    return { ... this.props, success: false }
  };
}
