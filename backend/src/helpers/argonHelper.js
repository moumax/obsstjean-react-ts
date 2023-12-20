import argon2 from "argon2"

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 2,
};

export const hashPassword = (plainPassword) => {
  return argon2.hash(plainPassword, hashingOptions);
};

export const verifyPassword = (plainPassword, hashedPassword) => {
  return argon2.verify(hashedPassword, plainPassword, hashingOptions);
};

