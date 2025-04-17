import { TAPIResponse } from "./commom.types.utils";

/**
 * If some object results error, the throw Error is activated.
 * @param props list of TAPIResponse.
 */
export function checkAndThrow(props: [TAPIResponse]) {
  const [withError] = props.filter(({ success }) => !success);

  if (withError) {
    throw new APIResponseError({ success: false, message: withError.message, status: 400 }).toResponse();
  }
}

export class APIResponseError extends Error {
  constructor(
    private props: {
      success?: boolean;
      message?: string;
      data?: Record<string, any>;
      status?: number;
    }
  ) {
    super(props.message);
    this.props = { ...props, success: props.success ?? false, data: props.data ?? {} };
  }

  toResponse = () => this.props;
}
