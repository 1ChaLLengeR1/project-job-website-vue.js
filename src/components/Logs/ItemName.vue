<template>
  <th
    class="w-20  sm:w-40 lg:w-80 p-2 text-sm sm:text-xl bg-color-bg-dark text-color-yellow"
    :class="{
      'rounded-tl-lg': rounded === 'left',
      'rounded-tr-lg': rounded === 'right',
      'rounded-none': rounded === 'none',
    }"
  >
    {{ name }}
  </th>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
    rounded: {
      required: true,
      type: String,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
