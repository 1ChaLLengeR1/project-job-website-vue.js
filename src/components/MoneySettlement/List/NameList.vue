<template>
  <div class="w-full flex gap-3 bg-color-bg-dark">
    <div class="p-3">
      <svg-arrow-down
        :color="svg.arrow.color"
        :height="svg.arrow.height"
      ></svg-arrow-down>
    </div>
    <div class="w-full flex justify-center items-center">
      <p class="text-3xl text-white font-syne font-bold">{{ title }}</p>
    </div>
    <div class="flex justify-center items-center gap-3 p-3">
      <svg-ellipsis
        :color="svg.ellipsi.color"
        :height="svg.ellipsi.height"
      ></svg-ellipsis
      ><svg-xmark
        :color="svg.xmark.color"
        :height="svg.xmark.height"
      ></svg-xmark>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import SvgXmark from "./SvgXmark.vue";
import EllipsisSvgVue from "../../CalculatorVat/EllipsisSvg.vue";
import ArrowDownVue from "./ArrowDown.vue";

export default defineComponent({
  components: {
    "svg-xmark": SvgXmark,
    "svg-ellipsis": EllipsisSvgVue,
    "svg-arrow-down": ArrowDownVue,
  },
  props: {
    title: {
      required: true,
      type: String,
    },
  },
  setup() {
    //values
    const svg = reactive({
      xmark: {
        color: "red",
        height: "40px",
      },
      ellipsi: {
        color: "blue",
        height: "40px",
      },
      arrow: {
        color: "black",
        height: "40px",
      },
    });

    //functions
    const response_svg = (value: number) => {
      if (window.innerWidth <= 640) {
        svg.xmark.height = `${value}px`;
        svg.ellipsi.height = `${value}px`;
        svg.arrow.height = `${value}px`;
      } else {
        svg.xmark.height = `40px`;
        svg.ellipsi.height = `40px`;
        svg.arrow.height = `40px`;
      }
    };
    window.addEventListener("resize", response_svg);
    response_svg(30);
    return { svg };
  },
});
</script>

<style scoped></style>
