export const paths = {
  default: "/",
  login: "/login_panel",
  calculatorVat: "/calculator_vat",
  moneySettlement: "/money_settlement",
  fuelcalculator: "/fuel_calculator",
  logs: "/logs",
  tasks: "/tasks",
  calendarSettlement: "/calendar_settlement",
  // Wynajem mieszkań — jedna pozycja w nawigacji, w środku podstrony
  rentals: "/rentals",
  rentalDictionaries: "/rentals/dictionaries",
  rentalBilling: "/rentals/billing",
  rentalFamily: "/rentals/family",
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
    title: "navSlider.links.artek.tasks",
    path: paths.tasks,
  },
  {
    title: "navSlider.links.artek.calendarSettlement",
    path: paths.calendarSettlement,
  },
  {
    title: "navSlider.links.artek.fuelCalculator",
    path: paths.fuelcalculator,
  },
  {
    title: "navSlider.links.artek.log",
    path: paths.logs,
  },
  {
    title: "navSlider.links.artek.rentals",
    path: paths.rentals,
  },
];

// podstrony w obrębie sekcji "Wynajem mieszkań"
export const pathsRentals: Link[] = [
  {
    title: "pages.rentals.tabs.dictionaries",
    path: paths.rentalDictionaries,
  },
  {
    title: "pages.rentals.tabs.billing",
    path: paths.rentalBilling,
  },
  {
    title: "pages.rentals.tabs.family",
    path: paths.rentalFamily,
  },
];

export const pathsPatryk: Link[] = [
  {
    title: "navSlider.links.patryk.calculatorVat",
    path: paths.calculatorVat,
  },
];
