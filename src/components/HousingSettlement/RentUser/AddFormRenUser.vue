<template>
  <div class="w-full">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 xl:flex-row">
        <base-input
          type="text"
          id="name"
          placeholder="Nazwa wynajmującego"
          :rounded_class="true"
          @base-input="base_input"
        ></base-input>
        <base-input
          type="number"
          id="quantity_users"
          placeholder="Ilość wynajmujących osób"
          :rounded_class="false"
          @base-input="base_input"
        ></base-input>
        <add-button
          name="Dodaj wynajmującego"
          :disabled="false"
          :rounded="true"
        ></add-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import BaseInput from "../Flats/BaseInput.vue";
import AddButton from "../Flats/AddButton.vue";

export default defineComponent({
  components: {
    "base-input": BaseInput,
    "add-button": AddButton,
  },
  setup() {
    //values
    const input_values = reactive<{
      name: string;
      quantity_users: string | number;
      id_flats: string;
    }>({
      name: "",
      quantity_users: "",
      id_flats: "",
    });

    //functions
    const base_input = (val: { id: string; value: string }) => {
      input_values[`${val.id}`] = val.value;
    };
    return { input_values, base_input };
  },
});
</script>

<style scoped></style>
