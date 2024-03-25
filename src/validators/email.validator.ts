import { REGEX_DOMAIN_EMAIL, REGEX_EMAIL } from "../utils/constants";

export const isEmailValid = (email: string): boolean => {
  return REGEX_EMAIL.test(email);
};

export const isEmailDomainValid = (email: string): boolean => {
  return REGEX_DOMAIN_EMAIL.test(email);
};
