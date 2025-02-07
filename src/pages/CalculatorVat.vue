<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-1"
  >
    <div class="flex w-full flex-wrap-reverse justify-center gap-4 p-1">
      <ResultVue
        :brutto="calculatorVatStore.result.brutto"
        :netto="calculatorVatStore.result.na_czysto"
        :precent="calculatorVatStore.result.zysk_procentowy"
      />
      <OptionsVue />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { savePage } from "@/composable/navigation";

//componets
import ResultVue from "../components/CalculatorVat/Results.vue";
import OptionsVue from "../components/CalculatorVat/Options.vue";
import { paths } from "@/utils/paths";

// stores
import { LogStore } from "@/stores/log/log";
import { CalculatorVatStore } from "@/stores/patryk/calculatorVat";

export default defineComponent({
  components: {
    ResultVue,
    OptionsVue,
  },
  setup() {
    const logStore = LogStore();
    const calculatorVatStore = CalculatorVatStore();
    const notification_value = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });

    (async () => {
      await logStore.apiCreateLog("Kalkulator_Patryka");
      savePage(paths.calculatorVat);
    })();

    return { calculatorVatStore, notification_value };
  },
});
</script>

<style scoped></style>
