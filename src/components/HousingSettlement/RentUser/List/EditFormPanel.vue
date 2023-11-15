<template>
  <div class="flex w-full bg-color-bg">
    <form class="flex w-full flex-col gap-1 p-1 xl:flex-row">
      <base-input
        id="name"
        :rounded_class="false"
        placeholder="Nazwa wynajmującego"
        type="text"
        :value="name"
        @base-input="base_input"
      ></base-input>
      <select-input
        id="id_flats"
        :value="id_flats"
        :array_flats="load_flats"
        @select-input="base_input"
      ></select-input>
      <base-input
        id="quantity_users"
        :rounded_class="false"
        placeholder="Ilość osób"
        type="number"
        :value="quantity_users"
        @base-input="base_input"
      ></base-input>
      <add-button
        name="zapisz"
        :rounded="false"
        :disabled="false"
        @click.prevent="submit_edit"
      ></add-button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, reactive } from "vue";

//componets
import BaseInputVue from "../../Flats/BaseInput.vue";
import SelectInputVue from "../SelectInput.vue";
import AddButtonVue from "../../Flats/AddButton.vue";

interface Flats {
  id: String;
  house_name: String;
  professional_house_name: String;
  price: Number;
}

export default defineComponent({
  emits: ["edit_user"],
  props: {
    id: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
    quantity_users: {
      required: true,
      type: Number,
    },
    id_flats: {
      required: true,
      type: String,
    },
    name_flats: {
      required: true,
      type: String,
    },
  },
  components: {
    "base-input": BaseInputVue,
    "select-input": SelectInputVue,
    "add-button": AddButtonVue,
  },
  setup(props, ctx) {
    //values
    const flats = inject<Flats[]>("load_flats");
    const input_user = reactive<{
      id: String;
      name: String;
      quantity_users: Number;
      id_flats: String;
    }>({
      id: props.id,
      name: props.name,
      quantity_users: props.quantity_users,
      id_flats: props.id_flats,
    });

    //functions
    const submit_edit = () => {
      ctx.emit("edit_user", input_user);
    };

    const base_input = (val: { id: String; value: String }) => {
      input_user[`${val.id}`] = val.value;
    };

    //computed
    const load_flats = computed(() => {
      return flats.value;
    });

    return { submit_edit, load_flats, base_input };
  },
});
</script>

<style scoped></style>
