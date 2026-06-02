export type Property = {
  id: string;
  title: string;
  brand: string;
  version: string;
  width: number;
  depth: number;
  squareFootage: number;
  beds: number;
  baths: number;
  living: number;
  garage: number;
  facade: string;
  floorPlan: string;
};

const facade = (file: string) => `/images/display-center/facade/${file}`;

const plan = (file: string) => `/images/display-center/plans/${file}`;

export const properties: Property[] = [
  {
    id: "hampton-28",
    title: "The Hampton 28",
    brand: "ITI",
    version: "1.0",
    width: 14.0,
    depth: 18.0,
    squareFootage: 28,
    beds: 4,
    baths: 2,
    living: 2,
    garage: 2,
    facade: facade("RENDER_DF01_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png")
  },
  {
    id: "bondi-24",
    title: "The Bondi 24",
    brand: "ITI",
    version: "1.0",
    width: 12.5,
    depth: 16.5,
    squareFootage: 24,
    beds: 3,
    baths: 2,
    living: 1,
    garage: 2,
    facade: facade("RENDER_DF02_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP02_12.5M BY 28M_RIGHT_VN01.png")
  },
  {
    id: "manhattan-32",
    title: "The Manhattan 32",
    brand: "ITI",
    version: "1.0",
    width: 16.0,
    depth: 20.0,
    squareFootage: 32,
    beds: 4,
    baths: 3,
    living: 2,
    garage: 2,
    facade: facade("RENDER_DF04_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP03_12.5M BY 28M_RIGHT_VN01.png")
  },
  {
    id: "promenade-25",
    title: "The Promenade 25",
    brand: "ITI",
    version: "1.0",
    width: 13.0,
    depth: 17.5,
    squareFootage: 25,
    beds: 3,
    baths: 2,
    living: 1,
    garage: 2,
    facade: facade("RENDER_DF01_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP01_12.5M BY 28M_RIGHT_VN01.png")
  },
  {
    id: "vista-22",
    title: "The Vista 22",
    brand: "ITI",
    version: "1.0",
    width: 11.0,
    depth: 16.0,
    squareFootage: 22,
    beds: 3,
    baths: 1,
    living: 1,
    garage: 1,
    facade: facade("RENDER_DF02_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP02_12.5M BY 28M_RIGHT_VN01.png")
  },
  {
    id: "riviera-34",
    title: "The Riviera 34",
    brand: "ITI",
    version: "1.0",
    width: 18.0,
    depth: 22.0,
    squareFootage: 34,
    beds: 4,
    baths: 3,
    living: 2,
    garage: 2,
    facade: facade("RENDER_DF04_12.5M_RIGHT_VN01.jpg"),
    floorPlan: plan("PLAN_DP03_12.5M BY 28M_RIGHT_VN01.png")
  }
];

export type PropertyView = "facade" | "floor";
