<template>
  <div class="w-full flex justify-end gap-3">
    <svg-ellipsis
      height="20px"
      color="blue"
      padding="2px"
      bg="#FCA311"
    ></svg-ellipsis>
    <svg-xmark height="20px" color="red" padding="2px" bg="#FCA311"></svg-xmark>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import SvgXmarkVue from "../../MoneySettlement/List/SvgXmark.vue";
import EllipsisSvgVue from "../../CalculatorVat/EllipsisSvg.vue";

export default defineComponent({
  components: {
    "svg-xmark": SvgXmarkVue,
    "svg-ellipsis": EllipsisSvgVue,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
