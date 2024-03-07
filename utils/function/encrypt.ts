import * as crypto from "crypto";

/**
 * Encrypts the input text using AES encryption.
 *
 * @param {string} inputText - The text to be encrypted.
 * @return {string} The encrypted text.
 */

export const encryptAes = (data: string, privateKey: string, ivKey: string) => {
  try {
    const cipher = crypto.createCipheriv("aes-256-cbc", privateKey, ivKey);
    cipher.setAutoPadding(true); // Set auto padding to true

    let encrypted = cipher.update(data, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (error) {
    console.log(error);

    return "";
  }
};

export const decryptAes = (
  data: string,

  privateKey: string,
  ivKey: string
) => {
  const cipher = crypto.createDecipheriv(
    "aes-256-cbc",
    privateKey,
    ivKey
    // "AFd6N3v1ebLw711zxpZjxZ7iq4fYpNYa",
    // "MesA7nqIVa23b167"
  );
  const decrypted = cipher.update(data, "utf8", "base64");
  return decrypted;
};
