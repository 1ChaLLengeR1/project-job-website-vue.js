<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full items-center justify-center p-1"
  >
    <the-notification
      :id="notification_value.id"
      :description="notification_value.description"
      :type="notification_value.type"
    ></the-notification>
    <div class="flex w-full flex-wrap-reverse justify-center gap-4 p-1">
      <the-result
        :brutto="results_value.brutto"
        :netto="results_value.netto"
        :precent="results_value.precent"
      ></the-result>
      <the-options
        @calculator-options="submit"
        @response-message="response_message"
      ></the-options>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { useStore } from "vuex";
import { SavePage } from "../components/JS/SavePage";
import { AddLog } from "../components/JS/AddLog";
import { fetchData } from "../components/JS/fetchData";
import ConfigVue from "../components/JS/ConfigVue";

//componets
import Notification from "@/components/utils/Notification.vue";
import Result from "../components/CalculatorVat/Results.vue";
import Options from "../components/CalculatorVat/Options.vue";

export default defineComponent({
  components: {
    "the-notification": Notification,
    "the-result": Result,
    "the-options": Options,
  },
  setup() {
    //values
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

    const results_value = reactive<{
      brutto: number;
      netto: number;
      precent: number;
    }>({
      brutto: 0,
      netto: 0,
      precent: 0,
    });

    const config_vue = ref<{ url_server: string }>(ConfigVue);

    //functions

    const add_log = async () => {
      const response_log = await AddLog("Kalkulator Patryka");
      if (response_log.error) {
        notification_value.description = response_log.error;
        notification_value.type = "error";
      }
    };

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

      results_value.brutto = response.brutto;
      results_value.netto = response.na_czysto;
      results_value.precent = response.zysk_procentowy;
    };

    add_log();
    SavePage("calculatorvat");
    return { notification_value, results_value, submit, response_message };
  },
});
</script>

<style scoped></style>
