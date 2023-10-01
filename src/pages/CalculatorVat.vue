<template>
  <main class="w-full min-h-[calc(100vh-64px)]">
    <the-notification
      :id="notification_value.id"
      :description="notification_value.description"
      :type="notification_value.type"
    ></the-notification>
    Calculator Vat Patryk
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { AddLog } from "../components/JS/AddLog";

//componets
import Notification from "@/components/utils/Notification.vue";

export default defineComponent({
  components: {
    "the-notification": Notification,
  },
  setup() {
    //values
    const notification_value = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: Math.random(),
      description: "",
      type: "",
    });

    //functions

    const add_log = async () => {
      const response_log = await AddLog("Kalkulator Patryka");
      if (response_log.error) {
        notification_value.description = response_log.error;
        notification_value.type = "error";
      }
    };

    add_log();
    SavePage("calculatorvat");
    return { notification_value };
  },
});
</script>

<style scoped></style>
