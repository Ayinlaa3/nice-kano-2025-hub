// ============================================================================
// NICE Conference Platform — Central Configuration (Lagos 2026)
// ============================================================================

export const CONFERENCE = {
  edition: "24th International Conference",
  editionShort: "24th",
  year: 2026,
  shortName: "LAGOS 2026",
  tagline: "THIS IS LAGOS!!!",
  organisation: "Nigerian Institution of Civil Engineers",
  organisationShort: "NICE",
  theme:
    "Civil Engineering: Sustainable and Resilient Infrastructure for Economic Growth",
  subtitle:
    "The 24th International Civil Engineering Conference and Annual General Meeting of the Nigerian Institution of Civil Engineers (NICE).",

  dates: {
    startISO: "2026-10-20",
    endISO: "2026-10-22",
    countdownTarget: "2026-10-20T09:00:00",
    display: "20–22 Oct 2026",
    displayLong: "October 20–22, 2026",
  },

  venue: {
    name: "HiPoint Event Centre, Ikeja",
    shortName: "HiPoint Event Centre",
    address:
      "5 Impressive Close, Behind NECA House & Opposite LASPARK, Off L.J. Dosunmu Street, Central Business District, Alausa, Ikeja, Lagos",
    city: "Ikeja",
    region: "Lagos State",
    country: "NG",
  },

  registrationPath: "/registration",
  organiserUrl: "https://nicehq.org",

  // Host-city stats — surfaced in the hero ticker
  stats: [
    { value: "3,000+", label: "Delegates" },
    { value: "30+", label: "Nations" },
    { value: "24th", label: "Edition" },
    { value: "180+", label: "Years of Lagos Engineering Legacy" },
  ],

  subThemes: [
    "Sustainable Materials & Green Construction",
    "Resilient & Smart Cities",
    "Digital Transformation, BIM & Digital Twins",
    "Climate-Adaptive Infrastructure",
    "Coastal, Marine & Water Engineering",
    "Transportation & Mega-Projects",
    "Engineering Policy, Finance & PPPs",
  ],
} as const;

// ----------------------------------------------------------------------------
// Registration pricing engine
// ----------------------------------------------------------------------------
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
  earlyBird: number;
  regular: number;
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
export type ConfPaymentMethod =
  | "nice_portal_receipt"
  | "bank_transfer_receipt"
  | "remita";

export const PAYMENT_INFO = {
  nicePortalReceipt: {
    label: "NICE Portal Payment",
    instructions:
      "If you have already paid through the NICE member portal, upload your portal payment receipt below. Our team will verify it and confirm your registration.",
  },
  bankTransferReceipt: {
    label: "Direct Bank Transfer",
    instructions:
      "Transfer the exact amount to one of the NICE conference bank accounts shown below, using your full name as the reference. Then upload your transfer receipt for verification.",
  },
  remita: {
    label: "Pay with Remita",
    instructions:
      "Pay securely online via Remita (card, bank, USSD). You will be redirected to Remita to complete payment, and your registration is confirmed automatically once payment succeeds.",
  },
} as const;
