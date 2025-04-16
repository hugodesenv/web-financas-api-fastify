import { TAPIResponse } from "./commonTypes";

/**
 * If some object results error, the throw Error is activated.
 * @param props list of TAPIResponse.
 */
export function checkAndThrow(props: [TAPIResponse]) {
  const [withError] = props.filter(({ success }) => !success);

  if (withError) {
    throw new APIResponseError({ success: false, message: withError.message, status: 400 }).execute();
  }
}

class APIResponseError extends Error {
  constructor(private props: { success: boolean; message?: string; data?: Record<string, any>; status?: number }) {
    super(props.message);
  }

  execute = () => this.props;
}
