import { APIGatewayProxyEvent } from "aws-lambda";
import { HEADER_AUTHORIZATION } from "./constants";
import { extractBearerToken } from "./utils";
import { CONFIG } from "../config/environment";

export const isValidPrivateKey = (event: APIGatewayProxyEvent) => {
  const authHeader =
    event.headers[HEADER_AUTHORIZATION] ||
    event.headers[HEADER_AUTHORIZATION.toLowerCase()];

  const token = extractBearerToken(authHeader);

  return !!token && isValidToken(token);
};
const isValidToken = (token: string): boolean => {
  return token === CONFIG.APP.PRIVATE_KEY;
};
