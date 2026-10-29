/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { certificateRegistrationName } from "./certificate-name";

describe("certificate registration names", () => {
  test("uses the exact registered name rather than an arbitrary input", () => {
    expect(certificateRegistrationName([{ full_name: "Odinakachukwu Chidinma ECHETA" }])).toBe("Odinakachukwu Chidinma ECHETA");
  });
  test("does not offer different names using the same email lookup", () => {
    expect(certificateRegistrationName([{ full_name: "Mrs. Halimah Abiodun" }, { full_name: "Mrs. Shobowale Idris" }])).toBe("Mrs. Halimah Abiodun");
  });
  test("unregistered emails cannot supply a certificate name", () => {
    expect(certificateRegistrationName([])).toBeNull();
    expect(certificateRegistrationName(null)).toBeNull();
    expect(certificateRegistrationName([{ full_name: " " }])).toBeNull();
  });
});