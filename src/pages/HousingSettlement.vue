<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full justify-center p-2 text-white"
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
    <add-flats
      @add-flats="add_flats"
      @confirm-box="delete_flat"
      :array_list_flats="load_list_flats"
    ></add-flats>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { SavePage } from "../components/JS/SavePage";
import { fetchData } from "../components/JS/fetchData.js";
import ConfigVue from "../components/JS/ConfigVue";
import { useStore } from "vuex";
import { AddLog } from "../components/JS/AddLog";

//componets
import AddFlatsVue from "../components/HousingSettlement/Flats/AddFlats.vue";
import Notification from "../components/utils/Notification.vue";
import ConfirmBox from "../components/utils/ConfirmBox.vue";

export default defineComponent({
  components: {
    "add-flats": AddFlatsVue,
    "the-notification": Notification,
    "confirm-box": ConfirmBox,
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

    const array_list_flats = ref<
      {
        id: string;
        house_name: string;
        professional_house_name: string;
        price: number;
      }[]
    >([]);

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

    const get_flats = async () => {
      array_list_flats.value = [];
      const url = `${ConfigVue.url_server}/routers/house_settlement_money/flats/flats/get_flats`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetchData(url, method, headers, null, null);
      if (response.error) {
        notification_values.id = Math.random();
        notification_values.description = response.error;
        notification_values.type = "error";
        return;
      }
      for (const key of response) {
        array_list_flats.value.push(key);
      }
    };
    get_flats();

    const add_flats = async (val: {
      house_name: string;
      professional_house_name: string;
      price: number;
    }) => {
      const url = `${ConfigVue.url_server}/routers/house_settlement_money/flats/flats/add_flats`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        house_name: val.house_name,
        professional_house_name: val.professional_house_name,
        price: +val.price,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        notification_values.id = Math.random();
        notification_values.description = response.detail;
        notification_values.type = "error";
        return;
      }
      notification_values.id = Math.random();
      notification_values.description = response.detail;
      notification_values.type = "success";
      get_flats();
    };

    const delete_flat = async (val: string) => {
      confirm_box_values.show_confirm_box = true;
      confirm_box_values.info = "Czy na pewno chcesz usunąć mieszkanie?";
      confirm_box_values.url = `/routers/house_settlement_money/flats/flats/delete_flat`;
      confirm_box_values.method = "DELETE";
      confirm_box_values.headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      confirm_box_values.body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: val,
      };
      confirm_box_values.method_fetch = "body";
      confirm_box_values.store_paramms = {};
    };

    const show_confirm_box = (val: boolean) => {
      confirm_box_values.show_confirm_box = val;
      confirm_box_values.info = "";
      confirm_box_values.url = "";
      confirm_box_values.method = "";
      confirm_box_values.headers = {};
      confirm_box_values.body = {};
      confirm_box_values.method_fetch = "";
      confirm_box_values.store_paramms = {};
      get_flats();
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

    //computed
    const load_list_flats = computed(() => {
      return array_list_flats.value;
    });
    return {
      add_flats,
      notification_values,
      load_list_flats,
      delete_flat,
      confirm_box_values,
      show_confirm_box,
      response_notification,
    };
  },
});
</script>

<style scoped></style>
