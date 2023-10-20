<template>
  <div
    class="w-full xl:w-3/6 lg:h-32 flex flex-col gap-3 sm:gap-5 items-center justify-center bg-color-bg-dark rounded-3xl p-2"
  >
    <h1 class="font-syne text-xl lg:text-[60px] uppercase text-color-yellow">
      kalkulator paliw
    </h1>
    <p
      v-if="pattern !== '' && result !== 0"
      class="text-color-yellow-light text-center text-sm lg:text-2xl"
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
