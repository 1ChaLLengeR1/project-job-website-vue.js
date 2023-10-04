<template>
  <div class="w-full sm:w-80 flex items-center gap-2 bg-color-bg-dark">
    <label class="w-56 text-color-grey text-lg text-center">{{ name }}:</label>
    <input
      type="number"
      class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
      :value="number"
      @input="update_number"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  emits: ["update:number"],
  props: {
    name: {
      required: true,
      type: String,
    },
    number: {
      required: true,
      type: Number,
    },
    type: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    //functions
    const update_number = (e: Event) => {
      ctx.emit("update:number", {
        type: props.type,
        number: parseFloat((e.target as HTMLInputElement).value) || 0,
      });
    };
    return { update_number };
  },
});
</script>

<style scoped></style>
