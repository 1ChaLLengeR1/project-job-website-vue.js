<template>
  <div class="flex w-full items-center gap-2 bg-color-bg-dark sm:w-80">
    <label class="w-56 text-center text-lg text-color-grey">{{ name }}:</label>
    <input
      type="number"
      class="w-full bg-color-bg p-4 text-color-grey placeholder-white outline-none"
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
    const update_number = (e: Event) => {
      ctx.emit(
        "update:number",
        props.type,
        parseFloat((e.target as HTMLInputElement).value),
      );
    };
    return { update_number };
  },
});
</script>

<style scoped></style>
