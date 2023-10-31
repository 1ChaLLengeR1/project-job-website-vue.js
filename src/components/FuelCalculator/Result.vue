<template>
  <div
    class="flex w-full flex-col items-center justify-center gap-3 rounded-3xl bg-color-bg-dark p-2 sm:gap-5 lg:h-32 xl:w-3/6"
  >
    <h1 class="font-syne text-xl uppercase text-color-yellow lg:text-[60px]">
      kalkulator paliw
    </h1>
    <p
      v-if="pattern !== '' && result !== 0"
      class="text-center text-sm text-color-yellow-light lg:text-2xl"
    >
      {{ pattern }} =
      <span class="text-color-grey"> {{ resultC }}zł</span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";

export default defineComponent({
  props: {
    pattern: {
      required: true,
      type: String,
    },
    result: {
      required: true,
      type: Number,
    },
  },
  setup(props) {
    //computed
    const resultC = computed(() => {
      return props.result.toFixed(2);
    });
    return { resultC };
  },
});
</script>

<style scoped></style>
