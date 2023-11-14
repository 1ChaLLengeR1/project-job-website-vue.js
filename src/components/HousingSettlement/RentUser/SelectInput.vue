<template>
  <select
    class="w-full bg-color-bg-dark p-3 text-white outline-none"
    name="users"
    id="user"
    @input="select_input"
    :value="value"
  >
    <option value="">Wybierz pokój</option>
    <option v-for="item in array_flats" :key="item.id" :value="item.id">
      {{ item.house_name }}
    </option>
  </select>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Flats {
  id: String;
  house_name: String;
  professional_house_name: String;
  price: Number;
}

export default defineComponent({
  emits: ["select-input"],
  props: {
    id: {
      required: false,
      type: String,
    },
    value: {
      required: true,
      type: String,
    },
    array_flats: {
      required: true,
      type: Array<Flats>,
    },
  },
  setup(props, ctx) {
    //values

    //functions
    const select_input = (e: Event) => {
      ctx.emit("select-input", {
        id: props.id,
        value: (e.target as HTMLSelectElement).value,
      });
    };

    return { select_input };
  },
});
</script>

<style scoped></style>
