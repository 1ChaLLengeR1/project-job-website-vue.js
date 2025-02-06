<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-1"
  >
    <NotificationVue
      :id="notification_value.id"
      :description="notification_value.description"
      :type="notification_value.type"
    />
    <div class="flex w-full flex-wrap-reverse justify-center gap-4 p-1">
      <ResultVue
        :brutto="results.brutto"
        :netto="results.netto"
        :precent="results.precent"
      />
      <OptionsVue
        @calculator-options="submit"
        @response-message="response_message"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../components/JS/fetchData";
import ConfigVue from "../components/JS/ConfigVue";
import { savePage } from "@/composable/navigation";

//componets
import NotificationVue from "@/components/utils/Notification.vue";
import ResultVue from "../components/CalculatorVat/Results.vue";
import OptionsVue from "../components/CalculatorVat/Options.vue";
import { paths } from "@/utils/paths";

// stores
import { LogStore } from "@/stores/log/log";

export default defineComponent({
  components: {
    NotificationVue,
    ResultVue,
    OptionsVue,
  },
  setup() {
    const logStore = LogStore();
    const store = useStore();
    const notification_value = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });

    const results = reactive<{
      brutto: number;
      netto: number;
      precent: number;
    }>({
      brutto: 0,
      netto: 0,
      precent: 0,
    });

    const config_vue = ref<{ url_server: string }>(ConfigVue);

    const response_message = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      notification_value.id = val.id;
      notification_value.description = val.description;
      notification_value.type = val.type;
    };

    const submit = async (val: {
      referrer: string;
      gross_sales: number;
      gross_purchase: number;
      provision: number;
      distinction: number;
    }) => {
      const url = `${config_vue.value.url_server}/routers/patryk_routers/calculator_work/calculator_earning/calculations`;
      const headers = {
        "Content-Type": "application/json",
      };

      const body = {
        id: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        referrer: val.referrer,
        gross_sales: val.gross_sales,
        gross_purchase: val.gross_purchase,
        provision: val.provision,
        distinction: val.distinction,
      };

      const response = await fetchData(url, "POST", headers, body, "body");
      if (response.error) {
        notification_value.id = Math.random();
        notification_value.description = response.error;
        notification_value.type = "error";
        return;
      }

      results.brutto = response.brutto;
      results.netto = response.na_czysto;
      results.precent = response.zysk_procentowy;
    };

    (async () => {
      await logStore.apiCreateLog("Kalkulator_Patryka");
      savePage(paths.calculatorVat);
    })();

    return { notification_value, results, submit, response_message };
  },
});
</script>

<style scoped></style>
