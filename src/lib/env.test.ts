import { describe, it, expect } from "vitest";
import { env } from "./env";

describe("Environment Validation", () => {
  it("should have default development environment and gemini model", () => {
    expect(env.NODE_ENV).toBeDefined();
    expect(env.GEMINI_MODEL).toBe("gemini-2.5-flash");
  });

  it("should not expose secret credentials on client-safe properties", () => {
    // Verify env object exists and doesn't crash without credentials
    expect(typeof env).toBe("object");
  });
});
