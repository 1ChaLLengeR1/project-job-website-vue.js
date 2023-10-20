<template>
  <div class="w-full h-16 flex bg-color-bg p-2 rounded-tr-3xl">
    <label
      class="w-2/5 flex justify-center items-center text-center text-color-grey text-sm sm:text-lg"
      >{{ name_label }}</label
    >
    <input
      :type="type_input"
      class="w-3/5 outline-none rounded-tr-3xl bg-color-bg-dark px-3 text-color-grey text-center"
      @input="update_number"
    />
  </div>
</template>

<script lang="ts">
export default {
  emits: ["update-number"],
  props: {
    name_label: {
      required: true,
      type: String,
    },
    type_input: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: String,
    },
  },
  setup(props, ctx) {
    //functions
    const update_number = (e: Event) => {
      ctx.emit("update-number", {
        type: props.type,
        number: parseFloat((e.target as HTMLInputElement).value),
      });
    };
    return { update_number };
  },
};
</script>
