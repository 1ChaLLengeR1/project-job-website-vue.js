<template>
  <div class="w-full">
    <form class="flex w-full justify-center gap-3">
      <base-input
        type_input="text"
        type="name"
        :value="name"
        width="sm:w-52"
        @input-update="input_update"
      ></base-input>
      <base-input
        type_input="number"
        type="amount"
        :value="amount"
        @input-update="input_update"
      ></base-input>
      <button
        class="w-full bg-color-yellow p-1 font-syne font-bold sm:w-64 sm:p-3"
        @click.prevent="submit"
      >
        Zapisz
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ConfigVue from "../../JS/ConfigVue";
import { fetchData } from "../../JS/fetchData";
// import { useStore } from "vuex";
//componets
import BaseInput from "./BaseInput.vue";

export default defineComponent({
  components: {
    "base-input": BaseInput,
  },
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  emits: ["response-error"],
  setup(props, ctx) {
    //values
    const store = useStore();
    const inputs_value = reactive<{
      name: string;
      amount: number;
    }>({
      name: props.name,
      amount: props.amount,
    });

    //functions
    const input_update = (val: { type: string; value: number }) => {
      inputs_value[`${val.type}`] = val.value;
    };

    const submit = async () => {
      const url = `${ConfigVue.url_server}/routers/outstanding_money/outstandingmoney/edit_item`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: props.id,
        amount: inputs_value.amount,
        name: inputs_value.name,
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
      await store.dispatch("response/get_list_settlement");
    };

    return { inputs_value, input_update, submit };
  },
});
</script>

<style scoped></style>
