<template>
  <div class="w-full flex justify-end gap-3">
    <svg-ellipsi
      :height="svg_values"
      bg="#FCA311"
      padding="6px"
      color="blue"
      @open-edit-panel="open_edit_panel"
    ></svg-ellipsi>
    <svg-xmark
      :height="svg_values"
      bg="#FCA311"
      padding="6px"
      color="red"
    ></svg-xmark>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//componets
import SvgXmark from "./SvgXmark.vue";
import EllipsisSvg from "@/components/CalculatorVat/EllipsisSvg.vue";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  emits: ["open-buttons-edit"],
  components: {
    "svg-xmark": SvgXmark,
    "svg-ellipsi": EllipsisSvg,
  },
  setup(props, ctx) {
    //values
    const svg_values = ref<string>("40px");

    //functions
    const open_edit_panel = (val: boolean) => {
      ctx.emit("open-buttons-edit", props.id);
    };

    const response_svg = () => {
      if (window.innerWidth >= 640) {
        svg_values.value = "40px";
      } else {
        svg_values.value = "20px";
      }
    };
    window.addEventListener("resize", response_svg);
    response_svg();
    return { svg_values, open_edit_panel };
  },
});
</script>

<style scoped></style>
