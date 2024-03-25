import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { isValidPrivateKey } from "../utils/validators";
import {
  responseErrorValidation,
  responseNotAuthorized,
  responseNotFound,
  responseSuccess,
} from "../utils/responses";
import {
  generateCustomUUID,
  getBodyOfEvent,
  getParamIdOfEvent,
} from "../utils/utils";
import { CreditcardRequest } from "../dtos/creditcard.request";
import { validateToken } from "../validators/token.validator";
import { CreditCardResponse } from "../dtos/creditcard.response";
import { RedisDb } from "../database/redis.db";
import { creditCardRequestValidate } from "../validators/creditcard.request.validator";

export const saveToken = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (!isValidPrivateKey(event)) {
    return responseNotAuthorized();
  }

  const redisService = new RedisDb();
  const body = getBodyOfEvent(event) as CreditcardRequest;

  try {
    creditCardRequestValidate(body);
  } catch (e) {
    if (e instanceof Error) {
      return responseErrorValidation(e.message);
    }
  }

  const generateUuId = generateCustomUUID();
  await redisService.set(generateUuId, JSON.stringify(body));
  return responseSuccess(generateUuId, "tokenID");
};

export const getToken = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  if (!isValidPrivateKey(event)) {
    return responseNotAuthorized();
  }
  const redisService = new RedisDb();
  const tokenId = getParamIdOfEvent(event);

  try {
    validateToken(tokenId);
  } catch (e) {
    if (e instanceof Error) {
      return responseErrorValidation(e.message);
    }
  }

  const tokenString = (await redisService.get(tokenId)) || "";
  if (!tokenString) {
    return responseNotFound("token is not found");
  }
  const tokenData = convertCreditCardResponse(JSON.parse(tokenString));
  return responseSuccess(tokenData, "tokenData");
};

export const convertCreditCardResponse = (
  data: CreditcardRequest,
): CreditCardResponse => {
  return {
    email: data.email,
    card_number: data.card_number,
    expiration_month: data.expiration_month,
    expiration_year: data.expiration_year,
  };
};
