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
      <add-item @submit-shop-list="submit_shop_list"></add-item>
      <shop-list :array_shop_list="array_shop_list"></shop-list>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { SavePage } from "../components/JS/SavePage";
import ConfigVue from "../components/JS/ConfigVue";
import { fetchData } from "../components/JS/fetchData";
import { useStore } from "vuex";

//componets
import AddItem from "../components/ShoppingList/AddItem.vue";
import ShopList from "../components/ShoppingList/ShopList.vue";
import Notification from "../components/utils/Notification.vue";

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
      notification.description = "Dodano poprawnie do listy zakupów!";
      notification.type = "success";

      await load_shop_list();
      return;
    };
    return { submit_shop_list, notification, array_shop_list };
  },
});
</script>
