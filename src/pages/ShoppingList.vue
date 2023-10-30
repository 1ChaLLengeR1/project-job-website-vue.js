<template>
  <main
    class="w-full min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-5 p-2"
  >
    <the-notification
      :id="notification.id"
      :description="notification.description"
      :type="notification.type"
    ></the-notification>
    <div
      class="w-full sm:w-5/6 2xl:w-3/6 flex flex-col gap-3 p-2 bg-color-bg-dark rounded-3xl"
    >
      <!-- <the-image></the-image> -->
      <add-item @submit-shop-list="submit_shop_list"></add-item>
      <shop-list
        v-show="check_array_list"
        :array_shop_list="array_shop_list"
        @submit-edit-form="submit_edit_form"
        @submit-delete="submit_delete"
      ></shop-list>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { SavePage } from "../components/JS/SavePage";
import ConfigVue from "../components/JS/ConfigVue";
import { fetchData } from "../components/JS/fetchData";
import { useStore } from "vuex";
import { AddLog } from "@/components/JS/AddLog";

//componets
import AddItem from "../components/ShoppingList/AddItem.vue";
import ShopList from "../components/ShoppingList/ShopList.vue";
import Notification from "../components/utils/Notification.vue";
import Image from "@/components/ShoppingList/Image.vue";

interface ArrayShopListObject {
  id: string;
  name: string;
  amount: number;
  type: boolean;
  model: string;
}

export default defineComponent({
  components: {
    "add-item": AddItem,
    "shop-list": ShopList,
    "the-notification": Notification,
    "the-image": Image,
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
    const array_shop_list = ref<ArrayShopListObject[]>([]);

    //functions
    SavePage("shoppinglist");
    const add_log = async () => {
      const response_log = await AddLog("Lista Zakupów");
      if (response_log.error) {
        notification.id = Math.random();
        notification.description = response_log.error;
        notification.type = "error";
      }
    };
    add_log();

    const load_shop_list = async () => {
      array_shop_list.value = [];
      const url = `${ConfigVue.url_server}/routers/list_products/list/get_list`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };
      const response = await fetchData(url, method, headers, null, null);
      if (response.error) {
        notification.id = Math.random();
        notification.description = response.error;
        notification.type = "error";
        return;
      }
      for (const item of response) {
        array_shop_list.value.push(item);
      }
    };
    load_shop_list();

    const submit_shop_list = async (val: {
      name: string;
      amount: number;
      type: string;
    }) => {
      const url = `${ConfigVue.url_server}/routers/list_products/list/add_products`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        name: val.name,
        amount: val.amount,
        model: val.type,
        type: false,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        notification.id = Math.random();
        notification.description = response.error;
        notification.type = "error";
        return;
      }
      notification.id = Math.random();
      notification.description = response.detail;
      notification.type = "success";

      await load_shop_list();
      return;
    };

    const submit_edit_form = async (val: {
      id: string;
      name: string;
      amount: number;
      model: string;
      type: boolean;
    }) => {
      const url = `${ConfigVue.url_server}/routers/list_products/list/edit_product`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: val.id,
        name: val.name,
        amount: val.amount,
        model: val.model,
        type: val.type,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        notification.id = Math.random();
        notification.description = response.error;
        notification.type = "error";
        return;
      }
      notification.id = Math.random();
      notification.description = response.detail;
      notification.type = "success";

      await load_shop_list();
      return;
    };

    const submit_delete = async (id: string) => {
      const url = `${ConfigVue.url_server}/routers/list_products/list/delete_product`;
      const method = "DELETE";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: id,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        notification.id = Math.random();
        notification.description = response.error;
        notification.type = "error";
        return;
      }
      notification.id = Math.random();
      notification.description = response.detail;
      notification.type = "success";

      await load_shop_list();
      return;
    };

    //computed
    const check_array_list = computed(() => {
      if (array_shop_list.value.length === 0) {
        return false;
      }
      return true;
    });
    return {
      submit_shop_list,
      notification,
      array_shop_list,
      submit_edit_form,
      submit_delete,
      check_array_list,
    };
  },
});
</script>
