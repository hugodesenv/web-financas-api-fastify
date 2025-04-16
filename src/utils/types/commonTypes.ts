export type TAPIResponse = {
  success: boolean,
  message?: string,
  statusCode?: number,
  data?: Record<string, any>,
}

export enum EnAPIStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBBIDEN = 403,
  RESOURCE_NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}