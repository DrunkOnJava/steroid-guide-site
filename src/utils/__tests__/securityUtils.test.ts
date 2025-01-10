import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  sanitizeInput,
  sanitizeObject,
  encryptData,
  decryptData,
  secureStore,
  validateDataIntegrity,
  generateHash,
} from "../securityUtils";

describe("securityUtils", () => {
  describe("sanitizeInput", () => {
    it("sanitizes HTML special characters", () => {
      const input = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe(
        "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
      );
    });

    it("handles empty strings", () => {
      expect(sanitizeInput("")).toBe("");
    });

    it("throws error for non-string input", () => {
      // @ts-expect-error Testing invalid input
      expect(() => sanitizeInput(123)).toThrow(
        "Invalid input type for sanitization"
      );
    });
  });

  describe("sanitizeObject", () => {
    it("sanitizes nested object properties", () => {
      const input = {
        name: '<script>alert("xss")</script>',
        details: {
          description: '<img src="x" onerror="alert(1)">',
        },
        count: 42,
      };

      const sanitized = sanitizeObject(input);

      expect(sanitized).toEqual({
        name: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
        details: {
          description:
            "&lt;img src=&quot;x&quot; onerror=&quot;alert(1)&quot;&gt;",
        },
        count: 42,
      });
    });

    it("preserves non-string values", () => {
      const input = {
        number: 42,
        boolean: true,
        array: [1, 2, 3],
        null: null,
      };

      const sanitized = sanitizeObject(input);
      expect(sanitized).toEqual(input);
    });
  });

  describe("encryption and decryption", () => {
    const testData = "sensitive data";
    const testPassword = "test-password-123";

    it("encrypts and decrypts data correctly", async () => {
      const encrypted = await encryptData(testData, testPassword);
      expect(encrypted).toBeDefined();
      expect(typeof encrypted).toBe("string");

      const decrypted = await decryptData(encrypted, testPassword);
      expect(decrypted).toBe(testData);
    });

    it("produces different ciphertexts for same input", async () => {
      const encrypted1 = await encryptData(testData, testPassword);
      const encrypted2 = await encryptData(testData, testPassword);
      expect(encrypted1).not.toBe(encrypted2);
    });

    it("fails decryption with wrong password", async () => {
      const encrypted = await encryptData(testData, testPassword);
      await expect(decryptData(encrypted, "wrong-password")).rejects.toThrow();
    });
  });

  describe("secureStore", () => {
    beforeEach(() => {
      localStorage.clear();
      vi.clearAllMocks();
    });

    const mockData = { secret: "test-secret" };
    const testKey = "test-key";
    const testPassword = "test-password";

    it("stores and retrieves data securely", async () => {
      await secureStore.setItem(testKey, mockData, testPassword);
      const retrieved = await secureStore.getItem(testKey, testPassword);
      expect(retrieved).toEqual(mockData);
    });

    it("returns null for non-existent key", async () => {
      const result = await secureStore.getItem("non-existent", testPassword);
      expect(result).toBeNull();
    });

    it("removes items correctly", () => {
      secureStore.setItem(testKey, mockData, testPassword);
      secureStore.removeItem(testKey);
      expect(localStorage.getItem(testKey)).toBeNull();
    });

    it("fails to retrieve with wrong password", async () => {
      await secureStore.setItem(testKey, mockData, testPassword);
      await expect(
        secureStore.getItem(testKey, "wrong-password")
      ).rejects.toThrow();
    });
  });

  describe("data integrity", () => {
    const testData = "test data";

    it("validates data integrity correctly", async () => {
      const hash = await generateHash(testData);
      const isValid = await validateDataIntegrity(testData, hash);
      expect(isValid).toBe(true);
    });

    it("detects data tampering", async () => {
      const hash = await generateHash(testData);
      const isValid = await validateDataIntegrity("tampered data", hash);
      expect(isValid).toBe(false);
    });

    it("generates consistent hashes for same input", async () => {
      const hash1 = await generateHash(testData);
      const hash2 = await generateHash(testData);
      expect(hash1).toBe(hash2);
    });

    it("generates different hashes for different inputs", async () => {
      const hash1 = await generateHash("data1");
      const hash2 = await generateHash("data2");
      expect(hash1).not.toBe(hash2);
    });
  });
});
