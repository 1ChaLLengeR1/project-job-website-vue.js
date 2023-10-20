<template>
  <main
    class="w-full min-h-[calc(100vh-64px)] flex flex-col justify-center items-center gap-3 p-3"
  >
    <the-result
      :pattern="pattern_value.pattern"
      :result="pattern_value.result"
    ></the-result>
    <the-panel @calculator-values="calculator_value"></the-panel>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { SavePage } from "../components/JS/SavePage";
import ConfigVue from "../components/JS/ConfigVue";
import { fetchData } from "../components/JS/fetchData";
import { AddLog } from "@/components/JS/AddLog";

//componets
import Result from "../components/FuelCalculator/Result.vue";
import Panel from "../components/FuelCalculator/Panel.vue";

export default defineComponent({
  components: {
    "the-result": Result,
    "the-panel": Panel,
  },
  setup() {
    //values
    const pattern_value = reactive<{ pattern: string; result: number }>({
      pattern: "",
      result: 0,
    });

    //functions

    const add_log = async () => {
      const response_log = await AddLog("Kalkulator Paliw");
      if (response_log.error) {
        return;
      }
    };
    add_log();

    const calculator_value = async (val: {
      way: number;
      fuel: number;
      combustion: number;
      remaining_values: number;
    }) => {
      const url = `${ConfigVue.url_server}/routers/fuel_calculator/fuel/fuel_calculations`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        way: val.way,
        fuel: val.fuel,
        combustion: val.combustion,
        remaining_values: val.remaining_values,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        return;
      }
      pattern_value.pattern = response.pattern;
      pattern_value.result = parseFloat(response.price);
    };

    SavePage("fuelcalculator");
    return { pattern_value, calculator_value };
  },
});
</script>

<style scoped></style>
