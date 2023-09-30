<template>
  <th
    class="w-20 sm:w-40 lg:w-80 flex justify-center items-center p-3 text-[10px] sm:text-sm bg-color-bg-dark"
    :class="{
      'text-color-yellow': name === 'yoho',
      'text-color-grey': name !== 'yoho',
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
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
