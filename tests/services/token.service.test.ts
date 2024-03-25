import { APIGatewayProxyEvent } from "aws-lambda";
import { getToken } from "../../src/services/token.service";
import { responseErrorValidation } from "../../src/utils/responses";
import { getParamIdOfEvent } from "../../src/utils/utils";

jest.mock("../../src/utils/validators", () => ({
  // Reemplaza con la ubicación correcta de tu archivo
  ...jest.requireActual("../../src/utils/validators"), // Importa todos los demás exports sin hacerles mock
  isValidPrivateKey: jest.fn(() => true), // Mockea isValidPrivateKey para que siempre retorne true
}));

jest.mock("../../src/utils/utils", () => ({
  // Reemplaza con la ubicación correcta de tu archivo
  ...jest.requireActual("../../src/utils/utils"), // Importa todos los demás exports sin hacerles mock
  getParamIdOfEvent: jest.fn(() => ""), // Mockea isValidPrivateKey para que siempre retorne true
}));

jest.mock("../../src/database/redis.db", () => {
  return {
    RedisDb: jest.fn().mockImplementation(() => {
      return {
        isOpen: jest.fn().mockResolvedValue(true),
        set: jest.fn().mockResolvedValue(undefined),
        get: jest.fn().mockResolvedValue("mocked data"),
      };
    }),
  };
});
describe("getToken", () => {
  let event: APIGatewayProxyEvent;

  beforeEach(() => {




  });

  it("should return a validation error response if the token id is not valid", async () => {

    const response = await getToken(event);

    expect(response).toEqual(responseErrorValidation("Token is not valid"));
  });
});
