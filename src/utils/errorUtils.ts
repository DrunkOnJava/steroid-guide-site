/**
 * @fileoverview Error handling utilities and types
 * @project     Steroid Guide Site
 * @module      utils/errorUtils
 */

// Error types for better error handling and security
export enum ErrorType {
  VALIDATION = "VALIDATION",
  NETWORK = "NETWORK",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  NOT_FOUND = "NOT_FOUND",
  SERVER = "SERVER",
  CLIENT = "CLIENT",
  SECURITY = "SECURITY",
  DATA_INTEGRITY = "DATA_INTEGRITY",
  UNKNOWN = "UNKNOWN",
}

export interface AppError extends Error {
  type: ErrorType;
  code?: string;
  context?: Record<string, unknown>;
  isOperational?: boolean; // Indicates if error is operational (expected) vs programmer error
}

export class ApplicationError extends Error implements AppError {
  public type: ErrorType;
  public code?: string;
  public context?: Record<string, unknown>;
  public isOperational: boolean;

  constructor(
    message: string,
    type: ErrorType = ErrorType.UNKNOWN,
    code?: string,
    context?: Record<string, unknown>,
    isOperational = true
  ) {
    super(message);
    this.name = "ApplicationError";
    this.type = type;
    this.code = code;
    this.context = context;
    this.isOperational = isOperational;

    // Maintains proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApplicationError);
    }
  }
}

// Utility function to safely handle errors
export const handleError = (error: unknown): AppError => {
  if (error instanceof ApplicationError) {
    return error;
  }

  if (error instanceof Error) {
    return new ApplicationError(error.message, ErrorType.UNKNOWN, undefined, {
      originalError: error.name,
      stack: error.stack,
    });
  }

  return new ApplicationError(
    typeof error === "string" ? error : "An unknown error occurred",
    ErrorType.UNKNOWN
  );
};

// Security-related error creators
export const createAuthenticationError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) => new ApplicationError(message, ErrorType.AUTHENTICATION, code, context);

export const createAuthorizationError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) => new ApplicationError(message, ErrorType.AUTHORIZATION, code, context);

export const createSecurityError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) => new ApplicationError(message, ErrorType.SECURITY, code, context, false);

// Data validation error creator
export const createValidationError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) => new ApplicationError(message, ErrorType.VALIDATION, code, context);

// Network error creator
export const createNetworkError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) => new ApplicationError(message, ErrorType.NETWORK, code, context);

// Data integrity error creator
export const createDataIntegrityError = (
  message: string,
  code?: string,
  context?: Record<string, unknown>
) =>
  new ApplicationError(message, ErrorType.DATA_INTEGRITY, code, context, false);

// Retry mechanism for operations that might fail
export const retry = async <T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1000,
  onError?: (error: Error, attempt: number) => void
): Promise<T> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (onError) {
        onError(lastError, attempt);
      }

      if (attempt === retries) {
        throw handleError(lastError);
      }

      await new Promise((resolve) => setTimeout(resolve, delay * attempt));
    }
  }

  throw lastError!; // This line should never be reached due to the throw in the loop
};

// Error logging utility
export const logError = (error: unknown, context?: Record<string, unknown>) => {
  const appError = handleError(error);

  // TODO: Implement proper error logging service integration
  console.error("[Error Log]", {
    name: appError.name,
    message: appError.message,
    type: appError.type,
    code: appError.code,
    context: {
      ...appError.context,
      ...context,
    },
    stack: appError.stack,
    timestamp: new Date().toISOString(),
  });
};
