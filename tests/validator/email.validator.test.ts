import {
  isEmailDomainValid,
  isEmailValid,
} from "../../src/validators/email.validator";

describe("Valid email format", () => {
  test("Email is valid", () => {
    const email = "myemail@gmsail.com";

    const result = isEmailValid(email);
    expect(true).toBe(result);
  });
  test("Email is not valid", () => {
    const email = "myemail.com";

    const result = isEmailValid(email);
    expect(false).toBe(result);
  });

  test("Email domain is valid", () => {
    const email = "myemail@gmail.com";

    const result = isEmailDomainValid(email);
    expect(true).toBe(result);
  });

  test("Email domain is not valid", () => {
    const email = "myemail@facebook.com";

    const result = isEmailDomainValid(email);
    expect(false).toBe(result);
  });
});
