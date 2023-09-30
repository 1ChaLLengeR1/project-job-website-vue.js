<template>
  <main class="w-full min-h-[calc(100vh-64px)]">
    <loading-spinner v-if="loading_spinner"></loading-spinner>
    <new-notification
      :id="notification_value.id"
      :description="notification_value.description"
      :type="notification_value.type"
    ></new-notification>
    <div class="w-full sm:pt-28 pb-3">
      <table class="w-full flex flex-col items-center gap-3">
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
import ConfigVue from "../components/JS/ConfigVue";

//components
import ItemNameVue from "../components/Logs/ItemName.vue";
import LoadingSpinner from "@/components/utils/LoadingSpinner.vue";
import Notification from "@/components/utils/Notification.vue";
import ItemValueVue from "../components/Logs/ItemValue.vue";

export default defineComponent({
  name: "Logs",
  components: {
    "item-name": ItemNameVue,
    "item-value": ItemValueVue,
    "loading-spinner": LoadingSpinner,
    "new-notification": Notification,
  },
  setup() {
    //values
    const loading_spinner = ref<boolean>(false);

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
    window.addEventListener("resize", check_date_length)
    check_date_length()

    const load_logs = async () => {
      const url = `${config_vue.value.url_server}/routers/log_routers/log/logs_values/5`;
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
      for (const item of response) {
        logs.value.push(item);
      }
    };
    load_logs();

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
    };
  },
});
</script>

<style scoped></style>
