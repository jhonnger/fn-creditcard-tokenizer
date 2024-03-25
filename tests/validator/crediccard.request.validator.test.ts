import { creditCardRequestValidate } from "../../src/validators/creditcard.request.validator";

describe("creditCardRequestValidate", () => {
  const validRequest = {
    card_number: "4111111111111111",
    cvv: "123",
    expiration_month: "12",
    expiration_year: "2025",
    email: "test@hotmail.com",
  };

  it("should throw an error if card number is null", () => {
    const request = { ...validRequest, card_number: undefined };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Card Number is required",
    );
  });

  it("should throw an error if card number is not valid", () => {
    const request = { ...validRequest, card_number: "12345" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Card Number is not valid",
    );
  });

  it("should throw an error if cvv is not present", () => {
    const request = { ...validRequest, cvv: undefined };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "CVV is required",
    );
  });

  it("should throw an error if cvv is not valid", () => {
    const request = { ...validRequest, cvv: "555" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "CVV is not valid",
    );
  });

  it("should throw an error if month is not present", () => {
    const request = { ...validRequest, expiration_month: undefined };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Expiration Month is required",
    );
  });

  it("should throw an error if month is not valid", () => {
    const request = { ...validRequest, expiration_month: "" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Expiration Month is not valid",
    );
  });

  it("should throw an error if year is not present", () => {
    const request = { ...validRequest, expiration_year: undefined };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Expiration Year is required",
    );
  });

  it("should throw an error if year is not valid", () => {
    const request = { ...validRequest, expiration_year: "21" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Expiration Year is not valid",
    );
  });

  it("should throw an error if email is not present", () => {
    const request = { ...validRequest, email: undefined };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Email is required",
    );
  });

  it("should throw an error if email is not valid", () => {
    const request = { ...validRequest, email: "asd.com" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Email is not valid",
    );
  });

  it("should throw an error if email domain is not valid", () => {
    const request = { ...validRequest, email: "asd@facebook.com" };
    expect(() => creditCardRequestValidate(request)).toThrowError(
      "Email domain is not valid",
    );
  });

  it("should not throw an error with valid request", () => {
    expect(() => creditCardRequestValidate(validRequest)).not.toThrow();
  });
});
