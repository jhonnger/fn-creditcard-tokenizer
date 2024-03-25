import {
  isCvvValid,
  isLuhnalgorithmValid,
  isMonthValid,
  isValidCreditCardNumber,
  isYearValid,
} from "../../src/validators/creditcard.validator";

describe("Valid function Luhn algorithm", () => {
  test("Credit card is valid", () => {
    const creditCardNumber = "4558950018068423";

    const result = isLuhnalgorithmValid(creditCardNumber);
    expect(true).toBe(result);
  });
  test("Credit card is not valid", () => {
    const creditCardNumber = "5693950018068423";

    const result = isLuhnalgorithmValid(creditCardNumber);
    expect(false).toBe(result);
  });
});

describe("Valid creditCard", () => {
  test("Credit card is valid", () => {
    const creditCardNumber = "4558950018068423";

    const result = isValidCreditCardNumber(creditCardNumber);
    expect(true).toBe(result);
  });
  test("Credit card is not valid", () => {
    const creditCardNumber = "9558950018068323";

    const result = isValidCreditCardNumber(creditCardNumber);
    expect(false).toBe(result);
  });
});

describe("Valid CVV", () => {
  const visaCardNumber = "4111111111111111";
  const masterCardNumber = "5555555555554444";
  const amexCardNumber = "378282246310005";

  test("CVV empty is not valid", () => {
    const cvv = "";
    const result = isCvvValid(cvv, visaCardNumber);
    expect(false).toBe(result);
  });

  test("CVV visa card is valid", () => {
    const cvv = "123";
    const result = isCvvValid(cvv, visaCardNumber);
    expect(true).toBe(result);
  });

  test("CVV master card is valid", () => {
    const cvv = "123";
    const result = isCvvValid(cvv, masterCardNumber);
    expect(true).toBe(result);
  });

  test("CVV AMEX card is valid", () => {
    const cvv = "4532";
    const result = isCvvValid(cvv, amexCardNumber);
    expect(true).toBe(result);
  });

  test("CVV master card is not valid", () => {
    const cvv = "456";
    const result = isCvvValid(cvv, masterCardNumber);
    expect(false).toBe(result);
  });

  test("CVV AMEX card is not valid", () => {
    const cvv = "8599";
    const result = isCvvValid(cvv, amexCardNumber);
    expect(false).toBe(result);
  });
});

describe("Valid Expiration Month", () => {
  test("Month is valid", () => {
    const result = isMonthValid("01");
    expect(true).toBe(result);
  });
  test("Month is not valid", () => {
    const result = isMonthValid("15");
    expect(false).toBe(result);
  });

  test("Decimal month is not valid", () => {
    const result = isMonthValid("1.5");
    expect(false).toBe(result);
  });

  test("Decimal month is not valid", () => {
    const result = isMonthValid(".5");
    expect(false).toBe(result);
  });
});

describe("Valid Expiration Year", () => {
  const currentYear = new Date().getFullYear();

  test("Current year is valid", () => {
    const result = isYearValid(currentYear.toString());
    expect(true).toBe(result);
  });

  test("Year in the limit of valid range is valid", () => {
    const result = isYearValid((currentYear + 5).toString());
    expect(false).toBe(result);
  });

  test("Year outside valid future range is not valid", () => {
    const result = isYearValid((currentYear + 6).toString());
    expect(false).toBe(result);
  });

  test("Year in the past is not valid", () => {
    const result = isYearValid((currentYear - 2).toString());
    expect(false).toBe(result);
  });
});
