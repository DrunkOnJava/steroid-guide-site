/**
 * @fileoverview Security utilities for data protection and sanitization
 * @project     Steroid Guide Site
 * @module      utils/securityUtils
 */

import { createSecurityError, createDataIntegrityError } from "./errorUtils";

// Constants for security configuration
const ENCRYPTION_ALGORITHM = "AES-GCM";
const ITERATION_COUNT = 100000;
const SALT_LENGTH = 16;
const IV_LENGTH = 12;
const KEY_LENGTH = 256;

/**
 * Sanitizes user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== "string") {
    throw createSecurityError("Invalid input type for sanitization");
  }

  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "/");
};

/**
 * Validates and sanitizes an object's string properties recursively
 */
export const sanitizeObject = <T extends Record<string, unknown>>(
  obj: T
): T => {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeInput(value);
    } else if (value && typeof value === "object" && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized as T;
};

/**
 * Generates a cryptographically secure key from a password
 */
const generateKey = async (
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> => {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  const importedKey = await crypto.subtle.importKey(
    "raw",
    passwordBuffer,
    "PBKDF2",
    false,
    ["deriveBits", "deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: ITERATION_COUNT,
      hash: "SHA-256",
    },
    importedKey,
    { name: ENCRYPTION_ALGORITHM, length: KEY_LENGTH },
    true,
    ["encrypt", "decrypt"]
  );
};

/**
 * Encrypts sensitive data using AES-GCM
 */
export const encryptData = async (
  data: string,
  password: string
): Promise<string> => {
  try {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await generateKey(password, salt);
    const encoder = new TextEncoder();

    const encryptedContent = await crypto.subtle.encrypt(
      {
        name: ENCRYPTION_ALGORITHM,
        iv,
      },
      key,
      encoder.encode(data)
    );

    // Combine salt, iv, and encrypted content
    const encryptedArray = new Uint8Array(
      salt.length + iv.length + encryptedContent.byteLength
    );
    encryptedArray.set(salt, 0);
    encryptedArray.set(iv, salt.length);
    encryptedArray.set(
      new Uint8Array(encryptedContent),
      salt.length + iv.length
    );

    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    throw createSecurityError("Encryption failed", undefined, { error });
  }
};

/**
 * Decrypts encrypted data using AES-GCM
 */
export const decryptData = async (
  encryptedData: string,
  password: string
): Promise<string> => {
  try {
    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split("")
        .map((char) => char.charCodeAt(0))
    );

    const salt = encryptedArray.slice(0, SALT_LENGTH);
    const iv = encryptedArray.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
    const data = encryptedArray.slice(SALT_LENGTH + IV_LENGTH);

    const key = await generateKey(password, salt);
    const decryptedContent = await crypto.subtle.decrypt(
      {
        name: ENCRYPTION_ALGORITHM,
        iv,
      },
      key,
      data
    );

    return new TextDecoder().decode(decryptedContent);
  } catch (error) {
    throw createSecurityError("Decryption failed", undefined, { error });
  }
};

/**
 * Securely stores data in localStorage with encryption
 */
export const secureStore = {
  async setItem(key: string, value: unknown, password: string): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      const encryptedValue = await encryptData(serializedValue, password);
      localStorage.setItem(key, encryptedValue);
    } catch (error) {
      throw createDataIntegrityError(
        "Failed to store data securely",
        undefined,
        {
          error,
        }
      );
    }
  },

  async getItem<T>(key: string, password: string): Promise<T | null> {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;

      const decryptedValue = await decryptData(encryptedValue, password);
      return JSON.parse(decryptedValue) as T;
    } catch (error) {
      throw createDataIntegrityError(
        "Failed to retrieve data securely",
        undefined,
        { error }
      );
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};

/**
 * Validates data integrity using checksums
 */
export const validateDataIntegrity = async (
  data: string,
  expectedHash: string
): Promise<boolean> => {
  try {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(data)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const actualHash = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    return actualHash === expectedHash;
  } catch (error) {
    throw createDataIntegrityError("Data integrity check failed", undefined, {
      error,
    });
  }
};

/**
 * Generates a secure hash of data
 */
export const generateHash = async (data: string): Promise<string> => {
  try {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest(
      "SHA-256",
      encoder.encode(data)
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  } catch (error) {
    throw createSecurityError("Hash generation failed", undefined, { error });
  }
};
