import { validateToken } from "../../src/validators/token.validator";

describe("validateToken", () => {
  it("should throw an error if token is undefined", () => {
    expect(() => validateToken(undefined)).toThrowError("Token is required");
  });
  it("should throw an error if token length is not 16", () => {
    expect(() => validateToken("12345")).toThrowError("Token is not valid");
  });
  it("should not throw an error with valid token", () => {
    expect(() => validateToken("1234567890123456")).not.toThrow();
  });
});
