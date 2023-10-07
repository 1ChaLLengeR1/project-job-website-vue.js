<template>
  <main
    class="w-full min-h-[calc(100vh-64px)] flex flex-col items-center gap-5 p-2"
  >
    <new-notification
      :id="notification.id"
      :description="notification.description"
      :type="notification.type"
    ></new-notification>
    <the-title name="List Zaległych"></the-title>
    <create-list @response-notification="response_notification"></create-list>
    <list-settlement></list-settlement>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { AddLog } from "@/components/JS/AddLog";

//componets
import Title from "../components/MoneySettlement/Title.vue";
import CreateListVue from "../components/MoneySettlement/CreateList.vue";
import Notification from "@/components/utils/Notification.vue";
import ListSettlementVue from "../components/MoneySettlement/ListSettlement.vue";

export default defineComponent({
  components: {
    "the-title": Title,
    "create-list": CreateListVue,
    "new-notification": Notification,
    "list-settlement": ListSettlementVue,
  },
  setup() {
    //values
    const notification = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });

    //functions
    const add_log = async () => {
      const response_log = await AddLog("Lista Zaległych");
      if (response_log.error) {
        notification.description = response_log.error;
        notification.type = "error";
      }
    };

    const response_notification = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      notification.id = val.id;
      notification.description = val.description;
      notification.type = val.type;
    };

    SavePage("moneysettlement");
    add_log();
    return { response_notification, notification };
  },
});
</script>
