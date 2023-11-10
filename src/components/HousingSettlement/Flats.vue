<template>
  <div class="flex w-full justify-center">
    <add-flats
      @add-flats="add_flats"
      @confirm-box="delete_flat"
      @edit-flats="edit_flats"
      :array_list_flats="load_list_flats"
    ></add-flats>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { fetchData } from "../../components/JS/fetchData";
import ConfigVue from "../../components/JS/ConfigVue";
import { useStore } from "vuex";

//componets
import AddFlatsVue from "./Flats/AddFlats.vue";

export default defineComponent({
  emits: ["notification-values", "show-confirm-box"],
  components: {
    "add-flats": AddFlatsVue,
  },
  setup(_, ctx) {
    //values
    const store = useStore();

    //functions
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
        ctx.emit("notification-values", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }
      ctx.emit("notification-values", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      await store.dispatch("response/get_flats");
    };

    const delete_flat = async (val: string) => {
      ctx.emit("show-confirm-box", {
        show: true,
        info: "Czy na pewno chcesz usunąć mieszkanie?",
        url: "/routers/house_settlement_money/flats/flats/delete_flat",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
        },
        body: {
          id_user: store.getters["auth/getUser"].id,
          username: store.getters["auth/getUser"].username,
          id: val,
        },
        method_fetch: "body",
        store_paramms: {
          type: true,
          url: "response/get_flats",
        },
      });
    };

    const edit_flats = async (val: {
      id: string;
      house_name: string;
      professional_house_name: string;
      price: number;
    }) => {
      const url = `${ConfigVue.url_server}/routers/house_settlement_money/flats/flats/edit_flat`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: val.id,
        house_name: val.house_name,
        professional_house_name: val.professional_house_name,
        price: val.price,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        ctx.emit("notification-values", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }
      ctx.emit("notification-values", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      await store.dispatch("response/get_flats");
    };

    //computed
    const load_list_flats = computed(() => {
      return store.getters["response/get_flats"];
    });
    return { load_list_flats, add_flats, delete_flat, edit_flats };
  },
});
</script>

<style scoped></style>
