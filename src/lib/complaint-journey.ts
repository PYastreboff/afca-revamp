export type ComplaintJourneyStep = {
  step: number;
  title: string;
  href: string;
  external?: boolean;
};

export const complaintJourneySteps: ComplaintJourneyStep[] = [
  {
    step: 1,
    title: "Make a complaint",
    href: "/make-a-complaint",
  },
  {
    step: 2,
    title: "Before you complain to us",
    href: "/make-a-complaint/complain",
  },
  {
    step: 3,
    title: "Lodge your complaint",
    href: "https://my.afca.org.au/make-a-complaint/",
    external: true,
  },
];

export function getComplaintJourneyStep(path: string): number | null {
  const normalized = path.replace(/^\/+|\/+$/g, "");

  if (normalized === "make-a-complaint") return 1;
  if (
    normalized === "make-a-complaint/complain" ||
    normalized.startsWith("make-a-complaint/complain/")
  ) {
    return 2;
  }

  return null;
}

export function isComplaintJourneyPage(path: string): boolean {
  return getComplaintJourneyStep(path) !== null;
}
