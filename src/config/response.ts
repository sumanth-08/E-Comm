export const RESPONSE = {
  SUCCESS: {
    code: 200,
    message: "Everything worked as expected",
  },
  UNKNOWN: {
    code: 500,
    message: "Something went wrong, try again",
  },
  ALREADY_EXIST: {
    code: 201,
    message: "is aleady exist",
  },
  VALIDATOR: {
    code: 202,
    message: "",
  },
  NOT_FOUND: {
    code: 203,
    message: "data not found",
  },
  MULTER_ERR: {
    code: 204,
    message: "",
  },
  ACCESS_DENIED: {
    code: 400,
    message: "Access denied. Unauthorized user",
  },
  INVALID_TOKEN: {
    code: 401,
    message: "Invalid token",
  },
  FORBIDDEN: {
    code: 403,
    message: "Forbidden! you are not allowed to access",
  },
};
