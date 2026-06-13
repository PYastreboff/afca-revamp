export type StatisticsDocument = {
  label: string;
  href: string;
};

export type StatisticsSection = {
  heading: string;
  documents: StatisticsDocument[];
};

export const statisticsSections: StatisticsSection[] = [
  {
    heading: "COVID-19 complaints snapshots",
    documents: [
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 28 February 2021",
        href: "https://www.afca.org.au/sites/default/files/2021-03/COVID-19%20complaints%20-%203%20March%202020%20to%2028%20February%202021.pdf",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 31 January 2021",
        href: "https://www.afca.org.au/sites/default/files/2021-02/COVID-19%20complaints%20-%203%20March%202020%20to%2031%20January%202021.pdf",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 31 December 2020",
        href: "https://www.afca.org.au/sites/default/files/2021-01/COVID-19%20complaints%20-%203%20March%202020%20to%2031%20December%202020.pdf",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 30 November 2020",
        href: "/media/1083/download",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 31 October 2020",
        href: "/media/1058/download",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 30 September 2020",
        href: "/media/1036/download",
      },
      {
        label: "COVID-19 complaints snapshot - 3 March 2020 to 31 August 2020",
        href: "/media/1000/download",
      },
    ],
  },
  {
    heading: "Two year report",
    documents: [
      {
        label: "AFCA two year report - 1 November 2018 to 31 October 2020",
        href: "https://www.afca.org.au/sites/default/files/2021-03/AFCA%20Two%20Year%20Report%20%281%29.pdf",
      },
    ],
  },
  {
    heading: "Annual Review",
    documents: [
      {
        label: "Annual Review 2021-22",
        href: "/news/latest-news/afca-releases-2021-22-annual-review",
      },
      {
        label: "Annual Review 2020-21",
        href: "/news/latest-news/afca-releases-2020-21-annual-review",
      },
      {
        label: "Annual Review 2019-20",
        href: "/media/1057/download",
      },
      {
        label: "Annual Review 2018-19",
        href: "/media/306/download",
      },
    ],
  },
  {
    heading: "Financial Year Snapshot",
    documents: [
      {
        label: "AFCA Snapshot - Financial Year 2021-22",
        href: "/news/statistics/data-snapshot-2022",
      },
      {
        label: "AFCA Snapshot - Financial Year 2020-21",
        href: "/media/1192/download",
      },
      {
        label: "AFCA Snapshot - Financial Year 2019-20",
        href: "/media/967/download",
      },
    ],
  },
  {
    heading: "Six month reports",
    documents: [
      {
        label: "AFCA's first six months",
        href: "/news/statistics/six-month-report",
      },
    ],
  },
];
