import { defineStore } from "pinia";
import { ref } from "vue";

// api
import { calculatorKeys } from "@/api/patryk/calculatorWork/fetch";
import { calculations } from "@/api/patryk/calculatorWork/post";
import { calculationUpdate } from "@/api/patryk/calculatorWork/put";

export const CalculatorVatStore = defineStore("calculatorVatStore", () => {
  const apiFetch = async () => {};

  const apiCalculations = async () => {};

  const apiCalculationUpdate = async () => {};

  return {};
});
