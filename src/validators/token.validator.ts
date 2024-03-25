export const validateToken = (token: string | undefined): void => {
  if (token == null) {
    throw new Error("Token is required");
  }
  if (token.length != 16) {
    throw new Error("Token is not valid");
  }
};
