<template>
  <form class="w-full flex flex-col sm:flex-row gap-1">
    <input
      type="text"
      placeholder="nazwa"
      v-model="input_values.name"
      class="w-full outline-none p-1 bg-color-bg-dark text-white"
    />
    <input
      type="number"
      placeholder="ilość"
      v-model="input_values.amount"
      class="w-full outline-none p-1 bg-color-bg-dark text-white"
    />
    <input
      type="text"
      placeholder="model"
      v-model="input_values.model"
      class="w-full outline-none p-1 bg-color-bg-dark text-white"
    />
    <button
      class="w-full outline-none p-1 bg-blue-700 text-white"
      @click.prevent="submit_edit"
    >
      Zapisz
    </button>
  </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import BaseInput from "../../MoneySettlement/List/BaseInput.vue";

export default defineComponent({
  components: {
    "base-input": BaseInput,
  },
  emits: ["submit-edit-form"],
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
    model: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    //values
    const input_values = reactive<{
      id: string;
      name: string;
      amount: number;
      model: string;
    }>({
      id: props.id,
      name: props.name,
      amount: props.amount,
      model: props.model,
    });

    //functions
    const submit_edit = () => {
      ctx.emit("submit-edit-form", input_values);
    };
    return { submit_edit, input_values };
  },
});
</script>

<style scoped></style>
