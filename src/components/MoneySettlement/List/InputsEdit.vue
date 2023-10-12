<template>
  <div class="w-full">
    <form class="w-full flex gap-3 justify-center">
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
        class="w-full sm:w-64 p-1 sm:p-3 bg-color-yellow font-syne font-bold"
        @click.prevent="submit"
      >
        Zapisz
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
//componets
import BaseInput from "./BaseInput.vue";

export default defineComponent({
  components: {
    "base-input": BaseInput,
  },
  props: {
    name: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    //values
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

    const submit = () => {
      console.log(inputs_value.amount, inputs_value.name);
    };

    return { inputs_value, input_update, submit };
  },
});
</script>

<style scoped></style>
