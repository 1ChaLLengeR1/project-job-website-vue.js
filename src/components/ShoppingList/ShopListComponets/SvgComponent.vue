<template>
  <div class="w-full sm:w-max flex justify-end items-center gap-3 p-1">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      class="w-[30px] h-[30px] cursor-pointer"
      fill="red"
      @click="submit_delete"
    >
      <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
      <path
        d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
      />
    </svg>
    <div class="bg-color-yellow" @click="close_edit_panel">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        class="w-[30px] h-[30px] cursor-pointer p-1"
        fill="white"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
        />
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["close-edit-panel", "submit-delete"],
  setup(_, ctx) {
    const close_edit_panel = () => {
      ctx.emit("close-edit-panel", false);
    };
    const submit_delete = () =>{
      ctx.emit('submit-delete')
    }
    return { close_edit_panel
    , submit_delete };
  },
});
</script>

<style scoped></style>
