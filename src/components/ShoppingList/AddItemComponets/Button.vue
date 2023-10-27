<template>
  <button
    class="w-full xl:w-4/6 font-syne font-bold px-3 text-syne text-center py-2 xl:py-6 text-color-bg text-2xl xl:rounded-t-3xl outline-none bg-color-yellow disabled:cursor-not-allowed disabled:bg-color-grey"
    :disabled="button_disabled"
  >
    Dodaj
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    button_disabled: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
