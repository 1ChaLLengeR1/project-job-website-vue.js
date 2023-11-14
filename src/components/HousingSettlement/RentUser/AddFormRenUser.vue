<template>
  <div class="w-full">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 xl:flex-row">
        <base-input
          type="text"
          id="name"
          :value="input_values.name"
          placeholder="Nazwa wynajmującego"
          :rounded_class="true"
          @base-input="base_input"
        ></base-input>
        <base-input
          type="number"
          :value="input_values.quantity_users"
          id="quantity_users"
          placeholder="Ilość wynajmujących osób"
          :rounded_class="false"
          @base-input="base_input"
        ></base-input>
        <select-input
          :value="input_values.id_flats"
          :array_flats="array_flats"
          @select-input="select_input"
        ></select-input>
        <add-button
          name="Dodaj wynajmującego"
          :disabled="checkInputs"
          :rounded="true"
          @click.prevent="add_user"
        ></add-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";

//componets
import BaseInput from "../Flats/BaseInput.vue";
import AddButton from "../Flats/AddButton.vue";
import SelectInput from "./SelectInput.vue";

interface Flats {
  id: String;
  house_name: String;
  professional_house_name: String;
  price: Number;
}

export default defineComponent({
  props: {
    array_flats: {
      required: true,
      type: Array<Flats>,
    },
  },
  emits: ["add-user"],
  components: {
    "base-input": BaseInput,
    "add-button": AddButton,
    "select-input": SelectInput,
  },
  setup(_, ctx) {
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
    const select_input = (val: { id: string; value: string }) => {
      input_values.id_flats = val.value;
    };

    const add_user = () => {
      ctx.emit("add-user", input_values);
      input_values.name = "";
      input_values.quantity_users = "";
      input_values.id_flats = "";
    };

    const checkInputs = computed(() => {
      if (
        input_values.name === "" ||
        input_values.quantity_users === "" ||
        input_values.id_flats === ""
      ) {
        return true;
      }
      return false;
    });

    return { input_values, base_input, add_user, select_input, checkInputs };
  },
});
</script>

<style scoped></style>
