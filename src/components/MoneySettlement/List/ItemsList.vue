<template>
  <ul class="flex w-full flex-col gap-3 bg-color-bg-dark p-2 2xl:items-center">
    <add-item :id_name="id_name" @response-error="response_error"></add-item>
    <sum-price :price="price"></sum-price>
    <li
      v-for="item in array"
      :key="item.id"
      class="flex flex-wrap items-center justify-center gap-3 p-1 shadow-[0_0_3px_0] shadow-color-yellow sm:flex-row-reverse 2xl:flex-nowrap 2xl:shadow-none"
    >
      <buttons-edit
        :id="item.id"
        @open-buttons-edit="open_buttons_edit"
        @confirm-box="confirm_box"
      ></buttons-edit>
      <inputs-edit
        :id="item.id"
        :name="item.name"
        :amount="item.amount"
        @response-error="response_error"
        v-if="show_input_edit === item.id"
      ></inputs-edit>
      <item-paragraf
        v-else
        :name="item.name"
        :amount="item.amount"
        :date="item.date"
      ></item-paragraf>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
//componets
import ItemParagraf from "./ItemParagraf.vue";
import SumPrive from "./SumPrive.vue";
import AddItem from "./AddItem.vue";
import ButtonsEdit from "./ButtonsEdit.vue";
import InputEdit from "../List/InputsEdit.vue";

//interface
interface obj {
  id: string;
  amount: number;
  name: string;
  date: string;
}

export default defineComponent({
  components: {
    "item-paragraf": ItemParagraf,
    "sum-price": SumPrive,
    "add-item": AddItem,
    "buttons-edit": ButtonsEdit,
    "inputs-edit": InputEdit,
  },
  props: {
    array: {
      required: true,
      type: Array<obj>,
    },
    price: {
      required: true,
      type: Number,
    },
    id_name: {
      required: true,
      type: String,
    },
  },
  emits: ["response-error", "confirm-box"],
  setup(_, ctx) {
    //values
    const show_input_edit = ref<string>("");

    //functions
    const open_buttons_edit = (val: string) => {
      if (show_input_edit.value == val) {
        show_input_edit.value = "";
        return;
      }
      show_input_edit.value = val;
    };

    const confirm_box = (val: {
      info: string;
      url: string;
      method: string;
      headers: object;
      body: object;
      method_fetch: string;
      store_paramms: object;
    }) => {
      ctx.emit("confirm-box", val);
    };

    const response_error = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      ctx.emit("response-error", val);
    };
    return { response_error, show_input_edit, open_buttons_edit, confirm_box };
  },
});
</script>

<style scoped></style>
