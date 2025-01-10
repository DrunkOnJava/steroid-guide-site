import "@testing-library/jest-dom";
import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";
import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

declare module "vitest" {
  interface Assertion
    extends TestingLibraryMatchers<HTMLElement | SVGElement, void> {
    // Additional matchers can be added here if needed
    toBeDefined(): void;
  }
}

// Extend Vitest's expect method with testing-library matchers
expect.extend(matchers);

// Cleanup after each test case
afterEach(() => {
  cleanup();
});
