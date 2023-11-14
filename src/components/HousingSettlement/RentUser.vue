<template>
  <div class="flex w-full justify-center">
    <add-rent-user
      :load_flats="load_flats"
      :load_rent_users="load_rent_users"
      @add-user="add_user"
      @confirm-box="delete_user"
    ></add-rent-user>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../JS/fetchData";
import ConfigVue from "../JS/ConfigVue";

//componets
import AddRentUserVue from "./RentUser/AddRentUser.vue";

export default defineComponent({
  emits: ["notification-values", "show-confirm-box"],
  components: {
    "add-rent-user": AddRentUserVue,
  },
  setup(_, ctx) {
    //values
    const store = useStore();

    //functions
    const add_user = async (val: {
      name: string;
      quantity_users: string | number;
      id_flats: string;
    }) => {
      const url = `${ConfigVue.url_server}/routers/house_settlement_money/renting_user/renting_user/add_user`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        name: val.name,
        quantity_users: val.quantity_users,
        id_flats: val.id_flats,
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
      await store.dispatch("response/get_renting_user");
    };

    const delete_user = (val: string) => {
      ctx.emit("show-confirm-box", {
        show: true,
        info: "Czy na pewno chcesz usunąć wynajmującego?",
        url: "/routers/house_settlement_money/renting_user/renting_user/delete_user",
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
          url: "response/get_renting_user",
        },
      });
    };

    //computed
    const load_flats = computed(() => {
      return store.getters["response/get_flats"];
    });

    const load_rent_users = computed(() => {
      return store.getters["response/get_renting_users"];
    });

    return { load_flats, add_user, load_rent_users, delete_user };
  },
});
</script>

<style scoped></style>
