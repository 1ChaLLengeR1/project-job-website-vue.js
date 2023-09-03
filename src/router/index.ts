import { createRouter, createWebHistory } from "vue-router";

//pages
import LoginPanel from "../pages/LoginPanel.vue";

//pages Patryk
import CalculatorVat from "../pages/CalculatorVat.vue";

//pages Artur
import HousingSettlement from "../pages/HousingSettlement.vue";
import MoneySettlement from "../pages/MoneySettlement.vue";
import Provision from "../pages/Provisions.vue";
import ShoppingList from "../pages/ShoppingList.vue";
import FuelCalculator from "../pages/FuelCalculator.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: LoginPanel,
    },
    {
      path: "/login-panel",
      name: "loginpanel",
      component: LoginPanel,
    },
    {
      path: "/calculator-vat",
      name: "calculatorvat",
      component: CalculatorVat,
    },
    {
      path: "/housing-settlement",
      name: "housingsettlement",
      component: HousingSettlement,
    },
    {
      path: "/money-settlement",
      name: "moneysettlement",
      component: MoneySettlement,
    },
    {
      path: "/provision",
      name: "provision",
      component: Provision,
    },
    {
      path: "/shopping-list",
      name: "shoppinglist",
      component: ShoppingList,
    },
    {
      path: "/fuel-calculator",
      name: "fuelcalculator",
      component: FuelCalculator,
    },
  ],
});

export default router;
