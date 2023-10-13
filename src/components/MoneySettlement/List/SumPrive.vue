<template>
  <li class="w-full text-center p-3 text-color-yellow text-xl">
    <p>
      <span class="text-white">Cała suma: </span>{{ price.toFixed(2) }}
      <span class="text-white">zł</span>
    </p>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    price: {
      required: true,
      type: Number,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
