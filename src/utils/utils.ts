import { APIGatewayProxyEvent } from "aws-lambda";
import { CHARACTER_UUID, CHARACTER_UUID_LENGTH } from "./constants";

export const extractBearerToken = (
  authHeader: string | undefined,
): string | null => {
  if (!authHeader) return null;

  const bearerPrefix = "Bearer ";
  if (!authHeader.startsWith(bearerPrefix)) return null;

  return authHeader.substring(bearerPrefix.length);
};

export const getBodyOfEvent = (event: APIGatewayProxyEvent) => {
  return event.body ? JSON.parse(event.body) : null;
};

export const generateCustomUUID = () => {
  const characters = CHARACTER_UUID;
  const charactersLength = characters.length;
  let customUUID = "";

  for (let i = 0; i < CHARACTER_UUID_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    customUUID += characters.charAt(randomIndex);
  }

  return customUUID;
};

export const getParamIdOfEvent = (event: APIGatewayProxyEvent) => {
  let token = "";
  if (event.pathParameters && event.pathParameters.id) {
    token = event.pathParameters.id;
  }
  return token;
};
