// Past conference editions archive data.
// 2025 (Kano) has a full report; earlier years are placeholders to be filled in.

export interface PastConference {
  year: number;
  slug: string;
  edition: string;
  city: string;
  theme?: string;
  status: "report" | "placeholder";
}

export const PAST_CONFERENCES: PastConference[] = [
  {
    year: 2025,
    slug: "2025",
    edition: "23rd International Conference",
    city: "Kano",
    theme:
      "Integration of Innovative Construction Towards Sustainable Civil Infrastructure Development",
    status: "report",
  },
  { year: 2024, slug: "2024", edition: "22nd International Conference", city: "To be archived", status: "placeholder" },
  { year: 2023, slug: "2023", edition: "21st International Conference", city: "To be archived", status: "placeholder" },
  { year: 2022, slug: "2022", edition: "20th International Conference", city: "To be archived", status: "placeholder" },
  { year: 2021, slug: "2021", edition: "19th International Conference", city: "To be archived", status: "placeholder" },
  { year: 2020, slug: "2020", edition: "18th International Conference", city: "To be archived", status: "placeholder" },
  { year: 2019, slug: "2019", edition: "17th International Conference", city: "To be archived", status: "placeholder" },
  { year: 2018, slug: "2018", edition: "16th International Conference", city: "To be archived", status: "placeholder" },
];

export function getPastConference(slug: string): PastConference | undefined {
  return PAST_CONFERENCES.find((c) => c.slug === slug);
}
