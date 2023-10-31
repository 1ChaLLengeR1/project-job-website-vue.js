<template>
  <form class="relative h-full w-full rounded-3xl bg-color-bg p-2 xl:h-28">
    <div
      class="flex w-full flex-wrap gap-3 px-2 xl:absolute xl:bottom-0 xl:left-0 xl:flex-nowrap xl:px-6"
    >
      <div
        class="flex w-full flex-col justify-start gap-3 lg:flex-row xl:w-4/6 xl:gap-10"
      >
        <base-input
          placeholder="Nazwa"
          type="text"
          type_input="name"
          :value="inputs_value.name"
          @input-value="input_value"
        ></base-input>
        <base-input
          placeholder="Ilość"
          type="number"
          type_input="amount"
          :value="inputs_value.amount"
          @input-value="input_value"
        ></base-input>
        <base-input
          placeholder="Typ"
          type="text"
          type_input="type"
          :value="inputs_value.type"
          @input-value="input_value"
        ></base-input>
      </div>
      <div class="flex w-full justify-end xl:w-2/6">
        <the-button
          :button_disabled="check_inputs"
          @click.prevent="submit"
        ></the-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

//componets
import BaseInput from "./AddItemComponets/BaseInput.vue";
import Button from "./AddItemComponets/Button.vue";

export default defineComponent({
  components: {
    "base-input": BaseInput,
    "the-button": Button,
  },
  emits: ["submit-shop-list"],
  setup(_, ctx) {
    //values
    const inputs_value = reactive<{
      name: string;
      amount: number | string;
      type: string;
    }>({
      name: "",
      amount: "",
      type: "",
    });

    //functions
    const input_value = (val: {
      type_input: string;
      value: string | number;
    }) => {
      inputs_value[`${val.type_input}`] = val.value;
    };

    const submit = () => {
      ctx.emit("submit-shop-list", inputs_value);
      inputs_value.name = "";
      inputs_value.amount = "";
      inputs_value.type = "";
    };

    //computed
    const check_inputs = computed(() => {
      if (
        inputs_value.name === "" ||
        inputs_value.amount === "" ||
        inputs_value.type === ""
      ) {
        return true;
      }
      return false;
    });

    return { input_value, submit, check_inputs, inputs_value };
  },
});
</script>

<style scoped></style>
