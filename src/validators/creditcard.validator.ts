import {
  AMEX_NUMBERS_START,
  MAX_YEARS_VALID,
  REGEX_CVV,
  VISA_DIGIT_START,
} from "../utils/constants";

export const isValidCreditCardNumber = (creditCardNumber: string): boolean => {
  return (
    isLuhnalgorithmValid(creditCardNumber) &&
    (isVisaCard(creditCardNumber) ||
      isMasterCard(creditCardNumber) ||
      isAmericanExpressCard(creditCardNumber))
  );
};
export const isLuhnalgorithmValid = (creditCardNumber: string): boolean => {
  let sum = 0;
  const length = creditCardNumber.length;
  const isEvenLength = length % 2 === 0;

  for (let i = 0; i < length; i++) {
    let digit = parseInt(creditCardNumber[i], 10);

    if ((i % 2 === 0) === isEvenLength) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
  }
  return sum % 10 === 0;
};

export const isVisaCard = (creditCardNumber: string): boolean => {
  return (
    creditCardNumber.startsWith(VISA_DIGIT_START) &&
    (creditCardNumber.length === 13 || creditCardNumber.length === 16)
  );
};
export const isMasterCard = (creditCardNumber: string): boolean => {
  const prefix = parseInt(creditCardNumber.substring(0, 2));
  const prefix4 = parseInt(creditCardNumber.substring(0, 4));
  return (
    ((prefix >= 51 && prefix <= 55) || (prefix4 >= 2221 && prefix4 <= 2720)) &&
    creditCardNumber.length === 16
  );
};
export const isAmericanExpressCard = (creditCardNumber: string): boolean => {
  const prefix = parseInt(creditCardNumber.substring(0, 2));
  return AMEX_NUMBERS_START.includes(prefix) && creditCardNumber.length === 15;
};

export const isCvvValid = (cvv: string, creditCardNumber: string): boolean => {
  return (
    REGEX_CVV.test(cvv) &&
    (isValidVisaMasterCardCVV(cvv, creditCardNumber) ||
      isValidAMEXCVV(cvv, creditCardNumber))
  );
};

export const isMonthValid = (expirationMonth: string): boolean => {
  const monthNumber = Number(expirationMonth);

  return (
    expirationMonth.length <= 2 &&
    !isNaN(monthNumber) &&
    monthNumber <= 12 &&
    monthNumber >= 1
  );
};
export const isYearValid = (expirationYear: string): boolean => {
  const currentYear = new Date().getFullYear();
  const yearsValid = Array.from(
    { length: MAX_YEARS_VALID },
    (_, index) => currentYear + index,
  ).map((year: number) => year.toString());

  return yearsValid.includes(expirationYear);
};

const isValidVisaMasterCardCVV = (cvv: string, creditCardNumber: string) => {
  return (
    (isVisaCard(creditCardNumber) || isMasterCard(creditCardNumber)) &&
    cvv === "123"
  );
};

const isValidAMEXCVV = (cvv: string, creditCardNumber: string) => {
  return isAmericanExpressCard(creditCardNumber) && cvv === "4532";
};
