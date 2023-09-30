<template>
  <main class="w-full h-[calc(100vh-64px)] relative">
    <notification
      :id="notification.id"
      :type="notification.type"
      :description="notification.description"
    ></notification>
    <p>Logs</p>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { SavePage } from "../components/JS/SavePage";
import Notification from "@/components/utils/Notification.vue";

export default defineComponent({
  name: "Logs",
  components: {
    notification: Notification,
  },
  setup() {
    //values
    const notification = reactive({
      id: 0,
      type: "",
      description: "",
    });

    //fucntions
    SavePage("logs");

    return { notification };
  },
});
</script>

<style scoped></style>
