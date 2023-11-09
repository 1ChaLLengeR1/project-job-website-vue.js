<template>
  <div class="w-full bg-color-bg-dark p-2">
    <form class="flex w-full flex-col gap-3 bg-color-bg p-1 xl:flex-row">
      <base-input
        id="house_name"
        type="text"
        placeholder="nazwa mieszkania"
        :value="input_values.house_name"
        :rounded_class="true"
        @base-input="base_input"
      ></base-input>
      <base-input
        id="professional_house_name"
        type="text"
        placeholder="profesjonalna nazwa mieszkania"
        :value="input_values.professional_house_name"
        :rounded_class="false"
        @base-input="base_input"
      ></base-input>
      <base-input
        id="price"
        type="number"
        placeholder="cena za mieszkanie"
        :value="input_values.price"
        :rounded_class="false"
        @base-input="base_input"
      ></base-input>
      <add-button
        name="Dodaj mieszkanie"
        @click.prevent="add_flats"
        :disabled="checkInputs"
      ></add-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from "vue";

//componets
import BaseInput from "./BaseInput.vue";
import AddButton from "./AddButton.vue";

export default defineComponent({
  emits: ["add-flats"],
  components: {
    "base-input": BaseInput,
    "add-button": AddButton,
  },
  setup(_, ctx) {
    //values
    const input_values = reactive<{
      house_name: string;
      professional_house_name: string;
      price: string;
    }>({
      house_name: "",
      professional_house_name: "",
      price: "",
    });

    //functions
    const base_input = (val: { id: string; value: string }) => {
      input_values[`${val.id}`] = val.value;
    };

    const add_flats = () => {
      ctx.emit("add-flats", input_values);
      input_values.house_name = "";
      input_values.professional_house_name = "";
      input_values.price = "";
    };

    //computed
    const checkInputs = computed(() => {
      if (
        input_values.house_name === "" ||
        input_values.professional_house_name === "" ||
        input_values.price === ""
      ) {
        return true;
      }
      return false;
    });

    return { input_values, add_flats, base_input, checkInputs };
  },
});
</script>

<style scoped></style>
