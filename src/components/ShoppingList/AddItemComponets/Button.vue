<template>
  <button
    class="text-syne w-full rounded-3xl bg-color-yellow p-0 px-3 text-center font-syne text-2xl font-bold text-color-bg outline-none disabled:cursor-not-allowed disabled:bg-color-grey xl:w-4/6 xl:rounded-none xl:rounded-t-3xl xl:py-6"
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
