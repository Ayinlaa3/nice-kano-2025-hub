// ============================================================================
// NICE Conference Platform — Central Configuration
// ----------------------------------------------------------------------------
// This is the single source of truth for the current conference edition.
// To roll the platform over to a future year, update the values here and the
// rest of the site (nav, hero, registration pricing, SEO) follows along.
// ============================================================================

export const CONFERENCE = {
  edition: "24th International Conference",
  year: 2026,
  shortName: "LAGOS 2026",
  organisation: "Nigerian Institution of Civil Engineers",
  organisationShort: "NICE",
  theme:
    "Civil Engineering: Sustainable and Resilient Infrastructure for Economic Growth",
  subtitle:
    "The 24th International Civil Engineering Conference and Annual General Meeting of the Nigerian Institution of Civil Engineers (NICE).",
  // Dates
  dates: {
    startISO: "2026-10-20",
    endISO: "2026-10-22",
    countdownTarget: "2026-10-20T00:00:00",
    display: "20–22 Oct 2026",
    displayLong: "October 20–22, 2026",
  },
  // Venue
  venue: {
    name: "HiPoint Event Centre, Ikeja",
    shortName: "HiPoint Event Centre",
    address:
      "5 Impressive Close, Behind NECA House & Opposite LASPARK, Off L.J. Dosunmu Street, Central Business District, Alausa, Ikeja, Lagos",
    city: "Ikeja",
    region: "Lagos State",
    country: "NG",
  },
  // Registration entry point — now the in-app page (replaces the old Google Form)
  registrationPath: "/registration",
  organiserUrl: "https://nicehq.org",
} as const;

// ----------------------------------------------------------------------------
// Registration pricing engine
// ----------------------------------------------------------------------------
// Early-bird cutoff: registrations completed on or before this date get the
// early-bird rate; afterwards the regular rate applies.
export const EARLY_BIRD_CUTOFF_ISO = "2026-08-15";

export type RegistrationCategoryId =
  | "fellow"
  | "member"
  | "associate"
  | "graduate"
  | "student"
  | "non_member"
  | "spouse"
  | "international";

export interface RegistrationCategory {
  id: RegistrationCategoryId;
  label: string;
  earlyBird: number; // in Naira
  regular: number; // in Naira
  note?: string;
}

export const REGISTRATION_CATEGORIES: RegistrationCategory[] = [
  { id: "fellow", label: "Fellow (FNICE)", earlyBird: 70000, regular: 80000 },
  { id: "member", label: "Member (MNICE)", earlyBird: 60000, regular: 70000 },
  { id: "associate", label: "Associate", earlyBird: 55000, regular: 65000 },
  { id: "graduate", label: "Graduate Member", earlyBird: 35000, regular: 40000 },
  { id: "student", label: "Student", earlyBird: 15000, regular: 20000 },
  { id: "non_member", label: "Non-Member", earlyBird: 80000, regular: 100000 },
  { id: "spouse", label: "Spouse", earlyBird: 30000, regular: 40000 },
  {
    id: "international",
    label: "International Delegate",
    earlyBird: 130000,
    regular: 130000,
    note: "≈ US$100 — flat rate",
  },
];

export function isEarlyBird(now: Date = new Date()): boolean {
  const cutoff = new Date(`${EARLY_BIRD_CUTOFF_ISO}T23:59:59`);
  return now.getTime() <= cutoff.getTime();
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getCategoryFee(
  categoryId: RegistrationCategoryId | "",
  now: Date = new Date()
): { amount: number; isEarly: boolean; category?: RegistrationCategory } | null {
  const category = REGISTRATION_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return null;
  const early = isEarlyBird(now);
  return {
    amount: early ? category.earlyBird : category.regular,
    isEarly: early,
    category,
  };
}

// ----------------------------------------------------------------------------
// Payment instructions
// ----------------------------------------------------------------------------
export const PAYMENT_INFO = {
  bankTransfer: {
    bankName: "Provided on confirmation",
    accountName: "Nigerian Institution of Civil Engineers",
    accountNumber: "Provided on confirmation",
    instructions:
      "After submitting this form, you will receive the official NICE conference account details. Use your full name as the transfer reference and keep your payment receipt for on-site verification.",
  },
  remita: {
    instructions:
      "Online card and Remita payment will be available shortly. For now, please choose Bank Transfer or complete payment at the on-site registration desk.",
  },
} as const;
