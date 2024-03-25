import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  getToken as getTokenService,
  saveToken as saveTokenService,
} from "../services/token.service";
export async function getToken(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  return getTokenService(event);
}

export async function saveToken(
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> {
  return saveTokenService(event);
}
