import { createRouter, createWebHistory } from "vue-router";
import { Authentification } from "../components/JS/Authentification";

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
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/housing-settlement",
      name: "housingsettlement",
      component: HousingSettlement,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/money-settlement",
      name: "moneysettlement",
      component: MoneySettlement,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/provision",
      name: "provision",
      component: Provision,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/shopping-list",
      name: "shoppinglist",
      component: ShoppingList,
      meta: {
        isAuth: true,
      },
    },
    {
      path: "/fuel-calculator",
      name: "fuelcalculator",
      component: FuelCalculator,
      meta: {
        isAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authentification = Authentification()
  if (to.meta.isAuth && !authentification) {
    next("/login-panel");
  } else {
    next();
  }
});

export default router;
