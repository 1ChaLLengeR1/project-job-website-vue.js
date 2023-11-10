<template>
  <input
    :type="type"
    :placeholder="placeholder"
    :value="value"
    @input="base_input"
    :class="{
      'rounded-t-3xl xl:rounded-none xl:rounded-tl-3xl': rounded_class,
    }"
    class="w-full bg-color-bg-dark p-3 text-white outline-none"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["base-input"],
  props: {
    id: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
    placeholder: {
      required: true,
      type: String,
    },
    value: {
      required: true,
      type: [String, Number],
    },
    rounded_class: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, ctx) {
    //functions
    const base_input = (e: Event) => {
      ctx.emit("base-input", {
        id: props.id,
        value: (e.target as HTMLInputElement).value,
      });
    };
    return { base_input };
  },
});
</script>

<style scoped></style>
