<template>
  <div class="flex w-full bg-color-bg">
    <form class="flex w-full flex-col gap-1 p-1 xl:flex-row">
      <base_input
        id="house_name"
        type="text"
        placeholder="nazwa mieszkania"
        :value="input_values.house_name"
        :rounded_class="false"
        @base-input="base_input"
      ></base_input>
      <base_input
        id="professional_house_name"
        type="text"
        placeholder="profesjonalna nazwa mieszkania"
        :value="input_values.professional_house_name"
        :rounded_class="false"
        @base-input="base_input"
      ></base_input>
      <base_input
        id="price"
        type="number"
        placeholder="cena"
        :value="input_values.price"
        :rounded_class="false"
        @base-input="base_input"
      ></base_input>
      <edit_button
        @click.prevent="edit_flat"
        name="Zapisz"
        :disabled="false"
        :rounded="false"
      ></edit_button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import BaseInput from "./BaseInput.vue";
import EditButton from "./AddButton.vue";

export default defineComponent({
  components: {
    base_input: BaseInput,
    edit_button: EditButton,
  },
  emits: ["edit-flats"],
  props: {
    id: {
      required: true,
      type: String,
    },
    house_name: {
      required: true,
      type: String,
    },
    professional_house_name: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: [Number, String],
    },
  },
  setup(props, ctx) {
    const input_values = reactive<{
      house_name: string;
      professional_house_name: string;
      price: string | number;
    }>({
      house_name: props.house_name,
      professional_house_name: props.professional_house_name,
      price: props.price,
    });

    //functions
    const base_input = (val: { id: string; value: string }) => {
      input_values[`${val.id}`] = val.value;
    };

    const edit_flat = () => {
      ctx.emit("edit-flats", {
        id: props.id,
        house_name: input_values.house_name,
        professional_house_name: input_values.professional_house_name,
        price: +input_values.price,
      });
    };
    return { input_values, base_input, edit_flat };
  },
});
</script>

<style scoped></style>
