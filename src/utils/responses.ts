import { DataResponse } from "./types";

export const responseGeneric = (
  statusCode: number,
  data: DataResponse,
  message: string,
) => {
  return {
    statusCode,
    body: JSON.stringify({
      data,
      message,
    }),
  };
};
export const responseNotAuthorized = () => {
  return responseGeneric(401, null, "Private key is not valid");
};

export const responseErrorValidation = (error: string) => {
  return responseGeneric(400, null, error);
};

export const responseSuccess = (data: DataResponse, message = "") => {
  return responseGeneric(200, data, message);
};
export const responseNotFound = (message: string) => {
  return responseGeneric(404, null, message);
};
