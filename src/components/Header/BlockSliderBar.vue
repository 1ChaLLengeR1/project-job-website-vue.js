<template>
  <div
    class="w-52 h-full flex flex-col gap-2 p-1 absolute top-0"
    :class="{ 'right-0': site }"
    @click="closeSliderBar"
  >
    <div
      class="w-full flex justify-start items-center"
      :class="{ 'justify-end': site }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 384 512"
        fill="#FCA311"
        class="cursor-pointer bg-black rounded-3xl p-1 duration-300 hover:scale-110"
        @click="closeSliderBar"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <ul class="w-full flex flex-col gap-1 mr-0">
      <li
        @click="closeSliderBar"
        v-for="(link, index) in arrayList"
        :key="index"
      >
        <router-link
          class="w-full flex justify-center items-center text-color-yellow py-3 bg-color-bg border border-black text-lg duration-300 hover:border-white hover:text-white"
          :to="{ name: `${link.name_router}` }"
          >{{ link.title }}</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BlockSliderBar",
  props: {
    site: {
      required: true,
      type: Boolean,
    },
    arrayList: {
      required: true,
      type: Array,
    },
  },
  emits: ["close-silderBar"],
  setup(_, ctx) {
    //functions
    const closeSliderBar = () => {
      ctx.emit("close-silderBar", { id: "", value: false });
    };
    return { closeSliderBar };
  },
});
</script>

<style scoped></style>
