<template>
  <div class="w-full sm:w-64">
    <input
      :type="type_input"
      :value="value"
      @input="base_input"
      :placeholder="placeholder"
      class="w-full p-1 sm:p-3 text-center outline-none bg-color-bg text-white"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["input-update"],
  props: {
    value: {
      required: true,
      type: [String, Number],
    },
    type_input: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: [String, Number],
    },
    placeholder: {
      required: false,
      type: String,
    },
    width: {
      required: false,
      type: String,
    },
  },
  setup(props, ctx) {
    const base_input = (e: Event) => {
      ctx.emit("input-update", {
        type: props.type,
        value: (e.target as HTMLInputElement).value,
      });
    };
    return { base_input };
  },
});
</script>

<style scoped></style>
