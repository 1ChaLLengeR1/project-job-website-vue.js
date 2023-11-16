<template>
  <div class="flex w-full justify-center">
    <basic-values @edit-values="edit_values"></basic-values>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { fetchData } from "../JS/fetchData";
import ConvigVue from "../JS/ConfigVue";
//componets
import BasicValues from "./BasicEditValues/BasicValues.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    "basic-values": BasicValues,
  },
  setup(_, ctx) {
    //values
    const store = useStore();

    //functions
    const edit_values = async (val: {
      id: string;
      electric_current: number;
      water: number;
      trash: number;
      internet: number;
      transfer: number;
    }) => {
      const url = `${ConvigVue.url_server}/routers/house_settlement_money/basic_rental_values/basic_values/edit_values`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: val.id,
        electric_current: +val.electric_current,
        water: +val.water,
        transfer: +val.transfer,
        trash: +val.trash,
        internet: +val.internet,
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
      await store.dispatch("response/get_basic_rental_values");
    };
    return { edit_values };
  },
});
</script>

<style scoped></style>
