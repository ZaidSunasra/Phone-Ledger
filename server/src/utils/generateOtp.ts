import crypto from "crypto";

export function generateOtp(length = 6): string {
  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;

  return (crypto.randomInt(min, max + 1)).toString();
}