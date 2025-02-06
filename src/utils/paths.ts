export const paths = {
  default: "/",
  login: "/login_panel",
  calculatorVat: "/calculator_vat",
  moneySettlement: "/money_settlement",
  fuelcalculator: "/fuel_calculator",
  logs: "/logs",
  notFound: "/:pathMatch(.*)*",
};

export type Link = {
  title: string;
  path: string;
};

export const pathsArtek: Link[] = [
  {
    title: "navSlider.links.artek.moneySettlement",
    path: paths.moneySettlement,
  },
  {
    title: "navSlider.links.artek.fuelCalculator",
    path: paths.fuelcalculator,
  },
  {
    title: "navSlider.links.artek.log",
    path: paths.logs,
  },
];

export const pathsPatryk: Link[] = [
  {
    title: "navSlider.links.patryk.calculatorVat",
    path: paths.calculatorVat,
  },
];
