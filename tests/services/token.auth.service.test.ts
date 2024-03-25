import { APIGatewayProxyEvent } from "aws-lambda";
import { getToken } from "../../src/services/token.service";
import { responseNotAuthorized } from "../../src/utils/responses";
import { APIGatewayProxyEventHeaders } from "aws-lambda/trigger/api-gateway-proxy";

describe("Test without psk", () => {
  let event: APIGatewayProxyEvent;

  beforeEach(() => {
    const headers: APIGatewayProxyEventHeaders = {};
    event = {
      headers: headers,
    } as APIGatewayProxyEvent;

    jest.clearAllMocks();
  });

  it("should return a not authorized response if the private key is not valid", async () => {
    const response = await getToken(event);

    expect(response).toEqual(responseNotAuthorized());
  });
});
