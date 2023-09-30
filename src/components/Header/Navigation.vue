<template>
  <header class="w-full h-16 relative z-10 flex justify-between p-2">
    <div class="flex justify-center items-center gap-1">
      <open-button-navigation
        @button-information="openSliderBar"
        buttonName="Menu Patryk"
      ></open-button-navigation>
    </div>
    <div class="flex justify-center items-center gap-1">
      <open-button-navigation
        buttonName="Menu Artur"
        @button-information="openSliderBar"
      ></open-button-navigation>
    </div>
  </header>
</template>

<script lang="ts">
//compontes
import OpenButtonNavigation from "./OpenButtonNavigation.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  components: {
    "open-button-navigation": OpenButtonNavigation,
  },
  emits: ["open-sliderbar"],
  setup(_, ctx) {
    //values

    //functions
    const openSliderBar = (val: { id: String; value: boolean }) => {
      ctx.emit("open-sliderbar", { id: val.id, value: val.value });
    };

    return { openSliderBar };
  },
});
</script>

<style scoped></style>
