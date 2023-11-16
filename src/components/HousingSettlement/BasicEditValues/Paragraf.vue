<template>
  <p class="flex w-28 items-center justify-center bg-color-bg-dark p-3">
    {{ name }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      require: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
