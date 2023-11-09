<template>
  <button
    class="h-full w-full rounded-none rounded-b-3xl bg-color-yellow p-3 font-syne font-bold disabled:bg-color-grey xl:rounded-none xl:rounded-tr-3xl"
    :disabled="disabled"
  >
    {{ name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
    disabled: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
