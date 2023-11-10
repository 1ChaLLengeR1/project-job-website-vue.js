<template>
  <ul class="flex w-full flex-col bg-color-bg-dark">
    <li
      class="flex w-full flex-col-reverse gap-1 bg-color-bg-dark p-1 shadow-[0_0_3px_0] shadow-color-yellow xl:flex-row xl:shadow-none"
      v-for="item in array_list_flats"
      :key="item.id"
    >
      <paragraf-items
        v-if="item.id !== show_edit_input"
        :house_name="item.house_name"
        :professional_house_name="item.professional_house_name"
        :price="item.price"
      ></paragraf-items>
      <form-edit
        v-if="item.id === show_edit_input"
        :id="item.id"
        :house_name="item.house_name"
        :professional_house_name="item.professional_house_name"
        :price="item.price"
        @edit-flats="edit_flats"
      ></form-edit>
      <buttons-edit
        :id="item.id"
        @confirm-box="confirm_box"
        @open-buttons-edit="open_buttons_edits"
      ></buttons-edit>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//componets
import ParagrafItems from "./ParagrafItems.vue";
import ButtonsEdit from "./ButtonsEdit.vue";
import FormEdit from "./FormEdit.vue";

export default defineComponent({
  emits: ["confirm-box", "edit-flats"],
  props: {
    array_list_flats: {
      required: true,
      type: Array<{
        id: string;
        house_name: string;
        professional_house_name: string;
        price: number;
      }>,
    },
  },
  components: {
    "paragraf-items": ParagrafItems,
    "buttons-edit": ButtonsEdit,
    "form-edit": FormEdit,
  },
  setup(_, ctx) {
    //values
    const show_edit_input = ref<string>("");
    //functions
    const confirm_box = (val: string) => {
      ctx.emit("confirm-box", val);
    };

    const open_buttons_edits = (val: string) => {
      if (show_edit_input.value === val) {
        show_edit_input.value = "";
        return;
      }
      show_edit_input.value = val;
    };

    const edit_flats = (val: {
      id: string;
      house_name: string;
      professional_house_name: string;
      price: number;
    }) => {
      ctx.emit("edit-flats", val);
    };
    return { confirm_box, open_buttons_edits, show_edit_input, edit_flats };
  },
});
</script>

<style scoped></style>
