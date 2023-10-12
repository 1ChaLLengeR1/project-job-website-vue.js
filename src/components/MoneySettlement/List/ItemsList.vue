<template>
  <ul class="w-full flex flex-col 2xl:items-center gap-3 p-2 bg-color-bg-dark">
    <add-item :id_name="id_name" @response-error="response_error"></add-item>
    <sum-price :price="price"></sum-price>
    <li
      v-for="item in array"
      :key="item.id"
      class="flex gap-3 items-center justify-center sm:flex-row-reverse flex-wrap 2xl:flex-nowrap shadow-[0_0_3px_0] 2xl:shadow-none shadow-color-yellow p-1"
    >
      <buttons-edit
        :id="item.id"
        @open-buttons-edit="open_buttons_edit"
      ></buttons-edit>
      <inputs-edit
        :name="item.name"
        :amount="item.amount"
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
  emits: ["response-error"],
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

    const response_error = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      ctx.emit("response-error", val);
    };
    return { response_error, show_input_edit, open_buttons_edit };
  },
});
</script>

<style scoped></style>
