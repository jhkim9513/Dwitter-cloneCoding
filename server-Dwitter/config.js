import dotenv from "dotenv";
dotenv.config();

function required(Key, defaultValue = undefined) {
  const value = process.env[Key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${Key} is undefined`);
  }
  return value;
}
export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
};
