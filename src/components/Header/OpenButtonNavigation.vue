<template>
  <button
    type="button"
    @click="openNavigation(buttonName)"
    class="w-32 sm:w-40 p-1 rounded-sm text-lg text-white bg-color-yellow duration-500 hover:scale-105"
  >
    {{ buttonName }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    buttonName: {
      required: true,
      type: String,
    },
  },
  emits: ["button-information"],
  setup(_, ctx) {
    const openNavigation = (name: String) => {
      if (name === "Menu Patryk") {
        ctx.emit("button-information", { id: "patryk", value: true });
      }else{
        ctx.emit("button-information", { id: "artek", value: true });
      }
    };
    return { openNavigation };
  },
});
</script>

<style scoped></style>
