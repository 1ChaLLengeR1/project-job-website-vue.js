<template>
  <div class="w-full">
    <form class="w-full flex justify-center flex-wrap gap-3">
      <base-input
        type_input="text"
        :value="input_value.name"
        type="name"
        placeholder="nazwa produktu"
        @input-update="input_update"
      ></base-input>
      <base-input
        type_input="number"
        :value="input_value.amount"
        type="amount"
        @input-update="input_update"
      ></base-input>
      <button
        class="w-full sm:w-64 p-1 sm:p-3 bg-color-yellow font-syne font-bold"
        @click.prevent="add_submit"
      >
        Dodaj do listy
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ConfigVue from "../../JS/ConfigVue";
import { fetchData } from "../../JS/fetchData";
import { useStore } from "vuex";

//componets
import BaseInput from "./BaseInput.vue";

export default defineComponent({
  props: {
    id_name: {
      required: true,
      type: String,
    },
  },
  emits: ["response-error"],
  components: {
    "base-input": BaseInput,
  },
  setup(props, ctx) {
    //values
    const store = useStore();
    const input_value = reactive<{ name: string; amount: number }>({
      name: "",
      amount: 0,
    });

    //functions
    const input_update = (val: { value: number; type: string }) => {
      input_value[`${val.type}`] = val.value;
    };

    const add_submit = async () => {
      const url = `${ConfigVue.url_server}/routers/outstanding_money/outstandingmoney/add_item`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id_name: props.id_name,
        amount: input_value.amount,
        name: input_value.name,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        ctx.emit("response-error", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }

      ctx.emit("response-error", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      input_value.name = "";
      input_value.amount = 0;
      await store.dispatch("response/get_list_settlement");
    };

    return { input_update, add_submit, input_value };
  },
});
</script>

<style scoped></style>
