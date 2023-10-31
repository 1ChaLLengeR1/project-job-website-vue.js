<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="value"
    @input="value_input"
    class="w-full rounded-3xl bg-color-bg-dark p-1 px-3 text-center font-syne text-xl font-bold text-color-yellow placeholder-color-yellow outline-none xl:rounded-none xl:rounded-t-3xl xl:py-6"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["input-value"],
  props: {
    placeholder: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    type_input: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: [String, Number],
    },
  },
  setup(props, ctx) {
    //function
    const value_input = (e: Event) => {
      ctx.emit("input-value", {
        type_input: props.type_input,
        value: (e.target as HTMLInputElement).value,
      });
    };
    return { value_input };
  },
});
</script>

<style scoped></style>
