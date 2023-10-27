<template>
  <form class="w-full h-full xl:h-28 relative bg-color-bg rounded-3xl p-2">
    <div
      class="w-full xl:absolute xl:bottom-0 xl:left-0 flex flex-wrap xl:flex-nowrap gap-3 px-2 xl:px-6"
    >
      <div
        class="w-full xl:w-4/6 flex flex-col lg:flex-row justify-start gap-3 xl:gap-10"
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
      <div class="w-full xl:w-2/6 flex justify-end">
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
      amount: number;
      type: string;
    }>({
      name: "",
      amount: 0,
      type: "",
    });

    //functions
    const input_value = (val: {
      type_input: string;
      value: [string, number];
    }) => {
      inputs_value[`${val.type_input}`] = val.value;
    };

    const submit = () => {
      ctx.emit("submit-shop-list", inputs_value);
      inputs_value.name = "";
      inputs_value.amount = 0;
      inputs_value.type = "";
    };

    //computed
    const check_inputs = computed(() => {
      if (
        inputs_value.name === "" ||
        inputs_value.amount === 0 ||
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
