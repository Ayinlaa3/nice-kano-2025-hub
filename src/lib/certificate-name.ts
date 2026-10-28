// Only names returned by the registration eligibility lookup may be printed.
export function certificateRegistrationName(registrations: { full_name: string }[] | null): string | null {
  const name = registrations?.[0]?.full_name;
  return typeof name === "string" && name.trim() ? name : null;
}