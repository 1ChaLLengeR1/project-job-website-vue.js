<template>
  <div class="flex justify-end gap-3">
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
      @click="delete_item"
    ></svg-xmark>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

//componets
import SvgXmark from "../../MoneySettlement/List/SvgXmark.vue";
import EllipsisSvg from "../../CalculatorVat/EllipsisSvg.vue";

export default defineComponent({
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  emits: ["open-buttons-edit", "confirm-box"],
  components: {
    "svg-xmark": SvgXmark,
    "svg-ellipsi": EllipsisSvg,
  },
  setup(props, ctx) {
    //values
    const store = useStore();
    const svg_values = ref<string>("40px");

    //functions
    const open_edit_panel = (val: boolean) => {
      console.log(val);
      // ctx.emit("open-buttons-edit", props.id);
    };

    const delete_item = () => {
      ctx.emit("confirm-box", props.id);
    };

    const response_svg = () => {
      if (window.innerWidth >= 640) {
        svg_values.value = "40px";
      } else {
        svg_values.value = "15px";
      }
    };
    window.addEventListener("resize", response_svg);
    response_svg();
    return { svg_values, open_edit_panel, delete_item };
  },
});
</script>

<style scoped></style>
