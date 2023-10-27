<template>
  <input
    :placeholder="placeholder"
    :type="type"
    :value="value"
    @input="value_input"
    class="w-full px-3 font-syne font-bold text-center py-2 xl:py-6 text-color-yellow placeholder-color-yellow text-2xl xl:rounded-t-3xl outline-none bg-color-bg-dark"
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
    value:{
      required: true,
      type:[String, Number]
    }
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
