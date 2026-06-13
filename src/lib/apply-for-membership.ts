export type MembershipFeeRow = {
  period: string;
  applicationFee: string;
  totalPayable: string;
};

export const membershipFy27Fees = {
  heading: "FY27 fees",
  licensees: [
    { period: "01/06/26 – 30/09/26", applicationFee: "$415.57", totalPayable: "$422.84" },
    { period: "01/10/26 – 31/12/26", applicationFee: "$311.68", totalPayable: "$317.13" },
    { period: "01/01/27 – 31/03/27", applicationFee: "$207.78", totalPayable: "$211.42" },
    { period: "01/04/27 – 31/05/27", applicationFee: "$103.89", totalPayable: "$105.71" },
  ] satisfies MembershipFeeRow[],
  creditRepresentatives: {
    period: "01/06/26 – 31/05/27",
    applicationFee: "$73.01",
    totalPayable: "$74.29",
  },
  note: "Application and renewal fees are non-refundable.",
};

export const membershipExplainerVideos = [
  {
    title: "How to create a member portal account",
    src: "https://www.youtube.com/embed/-gt-QdXUOqE",
  },
  {
    title: "How to apply for ACR membership",
    src: "https://www.youtube.com/embed/FOlWbd2TAyM",
  },
  {
    title: "How to apply for Licensee membership",
    src: "https://www.youtube.com/embed/0fPx4GGzmH8",
  },
];

export const membershipBenefits = [
  { title: "Expertise" },
  { title: "Professional development" },
  { title: "Knowledge" },
  { title: "Security" },
];

export const licenseeMembershipTypes = [
  "Australian Financial Services Licence",
  "Australian Credit Licence",
  "Australian Limited Financial Services Licence",
  "Voluntary members that operate in the financial services industry",
  "Regulated superannuation funds (excluding self-managed superfunds)",
  "Consumer Data Right participants",
  "Sandbox participants",
  "Approved deposit funds",
  "Retirement savings account providers",
  "Unlicensed product issuers",
  "Annuity providers",
  "Life insurer",
  "Life policy funds",
];

export const acrMembershipOptions = ["Individual", "Company"];
