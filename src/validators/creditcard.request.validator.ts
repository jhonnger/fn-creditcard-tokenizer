import { CreditcardRequest } from "../dtos/creditcard.request";
import {
  isCvvValid,
  isMonthValid,
  isValidCreditCardNumber,
  isYearValid,
} from "./creditcard.validator";
import { isEmailDomainValid, isEmailValid } from "./email.validator";

export const creditCardRequestValidate = (request: CreditcardRequest): void => {
  const cardNumber = request.card_number?.toString();
  if (cardNumber == null) {
    throw new Error("Card Number is required");
  }

  if (!isValidCreditCardNumber(cardNumber)) {
    throw new Error("Card Number is not valid");
  }

  if (request.cvv == null) {
    throw new Error("CVV is required");
  }

  if (!isCvvValid(request.cvv, cardNumber)) {
    throw new Error("CVV is not valid");
  }
  if (request.expiration_month == null) {
    throw new Error("Expiration Month is required");
  }

  if (!isMonthValid(request.expiration_month)) {
    throw new Error("Expiration Month is not valid");
  }

  if (request.expiration_year == null) {
    throw new Error("Expiration Year is required");
  }

  if (!isYearValid(request.expiration_year)) {
    throw new Error("Expiration Year is not valid");
  }

  if (request.email == null) {
    throw new Error("Email is required");
  }

  if (!isEmailValid(request.email)) {
    throw new Error("Email is not valid");
  }

  if (!isEmailDomainValid(request.email)) {
    throw new Error("Email domain is not valid");
  }
};
