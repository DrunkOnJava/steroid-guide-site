import { describe, it, expect, vi } from "vitest";
import {
  ErrorType,
  ApplicationError,
  handleError,
  createAuthenticationError,
  createSecurityError,
  createValidationError,
  retry,
  logError,
} from "../errorUtils";

describe("errorUtils", () => {
  describe("ApplicationError", () => {
    it("creates an error with correct properties", () => {
      const error = new ApplicationError(
        "Test error",
        ErrorType.VALIDATION,
        "TEST_001",
        { field: "username" }
      );

      expect(error.message).toBe("Test error");
      expect(error.type).toBe(ErrorType.VALIDATION);
      expect(error.code).toBe("TEST_001");
      expect(error.context).toEqual({ field: "username" });
      expect(error.isOperational).toBe(true);
    });

    it("captures stack trace", () => {
      const error = new ApplicationError("Test error");
      expect(error.stack).toBeDefined();
    });
  });

  describe("handleError", () => {
    it("returns ApplicationError unchanged", () => {
      const originalError = new ApplicationError("Test error");
      const handledError = handleError(originalError);
      expect(handledError).toBe(originalError);
    });

    it("wraps Error in ApplicationError", () => {
      const error = new Error("Test error");
      const handledError = handleError(error);

      expect(handledError).toBeInstanceOf(ApplicationError);
      expect(handledError.message).toBe("Test error");
      expect(handledError.type).toBe(ErrorType.UNKNOWN);
      expect(handledError.context).toEqual({
        originalError: "Error",
        stack: error.stack,
      });
    });

    it("handles non-Error objects", () => {
      const handledError = handleError("Test error");

      expect(handledError).toBeInstanceOf(ApplicationError);
      expect(handledError.message).toBe("Test error");
      expect(handledError.type).toBe(ErrorType.UNKNOWN);
    });
  });

  describe("error creators", () => {
    it("creates authentication error", () => {
      const error = createAuthenticationError(
        "Invalid credentials",
        "AUTH_001"
      );

      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.type).toBe(ErrorType.AUTHENTICATION);
      expect(error.message).toBe("Invalid credentials");
      expect(error.code).toBe("AUTH_001");
    });

    it("creates security error", () => {
      const error = createSecurityError("Security breach", "SEC_001");

      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.type).toBe(ErrorType.SECURITY);
      expect(error.message).toBe("Security breach");
      expect(error.code).toBe("SEC_001");
      expect(error.isOperational).toBe(false);
    });

    it("creates validation error", () => {
      const error = createValidationError("Invalid input", "VAL_001");

      expect(error).toBeInstanceOf(ApplicationError);
      expect(error.type).toBe(ErrorType.VALIDATION);
      expect(error.message).toBe("Invalid input");
      expect(error.code).toBe("VAL_001");
    });
  });

  describe("retry", () => {
    it("returns successful operation result", async () => {
      const operation = vi.fn().mockResolvedValue("success");
      const result = await retry(operation);

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it("retries failed operation", async () => {
      const operation = vi
        .fn()
        .mockRejectedValueOnce(new Error("Fail"))
        .mockResolvedValueOnce("success");

      const result = await retry(operation);

      expect(result).toBe("success");
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it("throws after max retries", async () => {
      const operation = vi.fn().mockRejectedValue(new Error("Always fail"));

      await expect(retry(operation, 2)).rejects.toThrow("Always fail");
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it("calls onError handler for each failure", async () => {
      const onError = vi.fn();
      const operation = vi.fn().mockRejectedValue(new Error("Fail"));

      await expect(retry(operation, 2, 0, onError)).rejects.toThrow();
      expect(onError).toHaveBeenCalledTimes(2);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), 1);
      expect(onError).toHaveBeenCalledWith(expect.any(Error), 2);
    });
  });

  describe("logError", () => {
    it("logs error with context", () => {
      const consoleSpy = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      const error = new ApplicationError("Test error");
      const context = { userId: "123" };

      logError(error, context);

      expect(consoleSpy).toHaveBeenCalledWith(
        "[Error Log]",
        expect.objectContaining({
          name: "ApplicationError",
          message: "Test error",
          context: expect.objectContaining(context),
          timestamp: expect.any(String),
        })
      );

      consoleSpy.mockRestore();
    });
  });
});
