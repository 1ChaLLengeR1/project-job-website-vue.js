<template>
  <main class="min-h-[calc(100vh-64px)] w-full">
    <loading-spinner v-if="loading_spinner"></loading-spinner>
    <new-notification
      :id="notification_value.id"
      :description="notification_value.description"
      :type="notification_value.type"
    ></new-notification>
    <div class="flex w-full flex-col items-center gap-3 py-3">
      <h1 class="font-syne text-3xl text-color-grey sm:pb-3 sm:text-[70px]">
        Server Logs
      </h1>
      <buttons-number-logs @number-logs="get_logs"></buttons-number-logs>
      <table class="flex w-full flex-col items-center gap-3">
        <tr class="flex gap-3">
          <item-name :name="names_table.id" rounded="left"></item-name>
          <item-name :name="names_table.description" rounded="none"></item-name>
          <item-name :name="names_table.date" rounded="right"></item-name>
        </tr>
        <tr
          v-for="item in load_logs_computed"
          :key="item.id"
          class="flex gap-3"
        >
          <item-value :name="item.username"></item-value>
          <item-value :name="item.description"></item-value>
          <item-value
            :name="data_length(item.date, date_response)"
          ></item-value>
        </tr>
      </table>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { fetchData } from "../components/JS/fetchData";
import { AddLog } from "../components/JS/AddLog";
import ConfigVue from "../components/JS/ConfigVue";

//components
import ItemNameVue from "../components/Logs/ItemName.vue";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import Notification from "@/components/utils/Notification.vue";
import ItemValueVue from "../components/Logs/ItemValue.vue";
import ButtonsNumberLogsVue from "../components/Logs/ButtonsNumberLogs.vue";

export default defineComponent({
  name: "Logs",
  components: {
    "item-name": ItemNameVue,
    "item-value": ItemValueVue,
    "loading-spinner": LoadingSpinner,
    "new-notification": Notification,
    "buttons-number-logs": ButtonsNumberLogsVue,
  },
  setup() {
    //values
    const loading_spinner = ref<boolean>(false);
    const number_logs = ref<number>(10);

    const names_table = reactive({
      id: "Username/Id",
      description: "Description",
      date: "Date",
    });

    const logs = ref<
      { id: string; description: string; username: string; date: string }[]
    >([]);
    const date_response = ref<boolean>(false);

    const config_vue = ref<{ url_server: string }>(ConfigVue);

    const notification_value = reactive({
      id: Math.random(),
      description: "",
      type: "",
    });

    //fucntions

    const data_length = (date: string, length: boolean) => {
      if (length) {
        return date.substring(0, 10);
      } else {
        return date;
      }
    };

    const check_date_length = () => {
      if (window.innerWidth <= 1024) {
        date_response.value = true;
      } else {
        date_response.value = false;
      }
    };
    window.addEventListener("resize", check_date_length);
    check_date_length();

    const load_logs = async () => {
      const url = `${config_vue.value.url_server}/routers/log_routers/log/logs_values/${number_logs.value}`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };

      loading_spinner.value = true;
      const response = await fetchData(url, method, headers, {}, null);
      if (response.error) {
        notification_value.description = response.error;
        notification_value.type = "error";
        loading_spinner.value = false;
        return;
      }
      loading_spinner.value = false;
      logs.value = [];
      for (const item of response) {
        logs.value.push(item);
      }
    };
    setTimeout(() => {
      load_logs();
    }, 100);

    const get_logs = (val: number) => {
      number_logs.value = val;
      load_logs();
    };

    const change_names_table = () => {
      if (window.innerWidth <= 640) {
        names_table.id = "id";
        names_table.description = "de";
        names_table.date = "da";
      } else {
        names_table.id = "Username/Id";
        names_table.description = "Description";
        names_table.date = "Date";
      }
    };

    window.addEventListener("resize", change_names_table);
    change_names_table();

    SavePage("logs");

    const add_log = async () => {
      const response_log = await AddLog("Logi");
      if (response_log.error) {
        notification_value.description = response_log.error;
        notification_value.type = "error";
      }
    };
    add_log();

    //computed
    const load_logs_computed = computed(() => {
      return logs.value;
    });

    return {
      names_table,
      loading_spinner,
      notification_value,
      load_logs_computed,
      data_length,
      date_response,
      get_logs,
    };
  },
});
</script>

<style scoped></style>
