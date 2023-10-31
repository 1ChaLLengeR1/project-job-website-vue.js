<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <confirm-box
      v-if="show_confirm"
      :info="values_confirm_box.info"
      :url="values_confirm_box.url"
      :method="values_confirm_box.method"
      :headers="values_confirm_box.headers"
      :body="values_confirm_box.body"
      :method_fetch="values_confirm_box.method_fetch"
      :store_paramms="values_confirm_box.store_paramms"
      @show-confirm-box="show_confirm_box"
      @response-error="response_notification"
    ></confirm-box>
    <new-notification
      :id="notification.id"
      :description="notification.description"
      :type="notification.type"
    ></new-notification>
    <the-title name="List Zaległych"></the-title>
    <create-list @response-notification="response_notification"></create-list>
    <list-settlement
      @response-error="response_notification"
      @confirm-box="confirm_box"
    ></list-settlement>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { AddLog } from "@/components/JS/AddLog";
import { useStore } from "vuex";

//componets
import Title from "../components/MoneySettlement/Title.vue";
import CreateListVue from "../components/MoneySettlement/CreateList.vue";
import Notification from "@/components/utils/Notification.vue";
import ListSettlementVue from "../components/MoneySettlement/ListSettlement.vue";
import ConfirmBox from "@/components/utils/ConfirmBox.vue";

export default defineComponent({
  components: {
    "the-title": Title,
    "create-list": CreateListVue,
    "new-notification": Notification,
    "list-settlement": ListSettlementVue,
    "confirm-box": ConfirmBox,
  },
  setup() {
    //values
    const store = useStore();
    const notification = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });
    const show_confirm = ref<boolean>(false);
    const values_confirm_box = reactive({
      info: "",
      url: "",
      method: "",
      headers: {},
      body: {},
      method_fetch: "",
      store_paramms: {},
    });

    //functions
    const show_confirm_box = (val: boolean) => {
      show_confirm.value = val;
      values_confirm_box.info = "";
      values_confirm_box.url = "";
      values_confirm_box.method = "";
      values_confirm_box.headers = {};
      values_confirm_box.body = {};
      values_confirm_box.method_fetch = "";
      values_confirm_box.store_paramms = {};
    };

    const confirm_box = (val: {
      info: string;
      url: string;
      method: string;
      headers: object;
      body: object;
      method_fetch: string;
      store_paramms: object;
    }) => {
      show_confirm.value = true;
      values_confirm_box.info = val.info;
      values_confirm_box.url = val.url;
      values_confirm_box.method = val.method;
      values_confirm_box.headers = val.headers;
      values_confirm_box.body = val.body;
      values_confirm_box.method_fetch = val.method_fetch;
      values_confirm_box.store_paramms = val.store_paramms;
    };

    const add_log = async () => {
      const response_log = await AddLog("Lista Zaległych");
      if (response_log.error) {
        notification.id = Math.random();
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

    //hoks
    onMounted(async () => {
      await store.dispatch("response/get_list_settlement");
      if (!store.getters["response/response_error"]) {
        return store.getters["response/response_error"];
      } else {
        notification.id = Math.random();
        notification.description =
          store.getters["response/response_error"].error;
        notification.type = "error";
      }
    });

    return {
      response_notification,
      notification,
      show_confirm,
      show_confirm_box,
      confirm_box,
      values_confirm_box,
    };
  },
});
</script>
