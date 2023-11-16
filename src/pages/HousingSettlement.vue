<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-3 p-2 text-white"
  >
    <confirm-box
      v-if="confirm_box_values.show_confirm_box"
      :info="confirm_box_values.info"
      :url="confirm_box_values.url"
      :method="confirm_box_values.method"
      :headers="confirm_box_values.headers"
      :body="confirm_box_values.body"
      :method_fetch="confirm_box_values.method_fetch"
      :store_paramms="confirm_box_values.store_paramms"
      @show-confirm-box="show_confirm_box"
      @response-error="response_notification"
    ></confirm-box>
    <the-notification
      :id="notification_values.id"
      :description="notification_values.description"
      :type="notification_values.type"
    ></the-notification>
    <the-flats
      @notification-values="response_notification"
      @show-confirm-box="show_confirm_box"
    ></the-flats>
    <rent-user
      @notification-values="response_notification"
      @show-confirm-box="show_confirm_box"
    ></rent-user>
    <basic-edit-values
      @notification-values="response_notification"
    ></basic-edit-values>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { AddLog } from "../components/JS/AddLog";
import { useStore } from "vuex";

//componets
import Notification from "../components/utils/Notification.vue";
import ConfirmBox from "../components/utils/ConfirmBox.vue";
import FlatsVue from "../components/HousingSettlement/Flats.vue";
import RentUserVue from "../components/HousingSettlement/RentUser.vue";
import BasicEditValues from "../components/HousingSettlement/BasicEditValues.vue";

export default defineComponent({
  components: {
    "the-flats": FlatsVue,
    "rent-user": RentUserVue,
    "the-notification": Notification,
    "confirm-box": ConfirmBox,
    "basic-edit-values": BasicEditValues,
  },
  setup() {
    //values
    const store = useStore();
    const notification_values = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });

    const confirm_box_values = reactive<{
      show_confirm_box: boolean;
      info: string;
      url: string;
      method: string;
      headers: object;
      body: object;
      method_fetch: string;
      store_paramms: object;
    }>({
      show_confirm_box: false,
      info: "",
      url: "",
      method: "",
      headers: {},
      body: {},
      method_fetch: "",
      store_paramms: {},
    });

    //functions
    SavePage("housingsettlement");

    const add_log = async () => {
      const response_log = await AddLog("Program do mediów");
      if (response_log.error) {
        notification_values.id = Math.random();
        notification_values.description = response_log.error;
        notification_values.type = "error";
      }
    };
    add_log();

    const show_confirm_box = (val: {
      show: boolean;
      info: string;
      url: string;
      method: string;
      headers: object;
      body: object;
      method_fetch: string;
      store_paramms: object;
    }) => {
      confirm_box_values.show_confirm_box = val.show;
      confirm_box_values.info = val.info || "";
      confirm_box_values.url = val.url || "";
      confirm_box_values.method = val.method || "";
      confirm_box_values.headers = val.headers || {};
      confirm_box_values.body = val.body || {};
      confirm_box_values.method_fetch = val.method_fetch || "";
      confirm_box_values.store_paramms = val.store_paramms || {};
    };

    const response_notification = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      notification_values.id = val.id;
      notification_values.description = val.description;
      notification_values.type = val.type;
    };

    const load_flats = async () => {
      await store.dispatch("response/get_flats");
      if (!store.getters["response/response_error"]) {
        return store.getters["response/response_error"];
      } else {
        notification_values.id = Math.random();
        notification_values.description =
          store.getters["response/response_error"].error;
        notification_values.type = "error";
        store.commit("response/error_response", {});
      }
    };

    const load_renting_users = async () => {
      await store.dispatch("response/get_renting_user");
      if (!store.getters["response/response_error"]) {
        return store.getters["response/response_error"];
      } else {
        notification_values.id = Math.random();
        notification_values.description =
          store.getters["response/response_error"].error;
        notification_values.type = "error";
        store.commit("response/error_response", {});
      }
    };

    const load_basic_rental_values = async () => {
      await store.dispatch("response/get_basic_rental_values");
      if (!store.getters["response/response_error"]) {
        return store.getters["response/response_error"];
      } else {
        notification_values.id = Math.random();
        notification_values.description =
          store.getters["response/response_error"].error;
        notification_values.type = "error";
        store.commit("response/error_response", {});
      }
    };

    //hooks
    onMounted(async () => {
      await load_flats();
      await load_renting_users();
      await load_basic_rental_values();
    });

    return {
      notification_values,
      confirm_box_values,
      show_confirm_box,
      response_notification,
    };
  },
});
</script>

<style scoped></style>
