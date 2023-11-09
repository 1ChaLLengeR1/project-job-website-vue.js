<template>
  <ul class="flex w-full flex-col bg-color-bg-dark">
    <li
      class="flex w-full flex-col-reverse gap-1 bg-color-bg-dark p-1 shadow-[0_0_3px_0] shadow-color-yellow xl:flex-row xl:shadow-none"
      v-for="item in array_list_flats"
      :key="item.id"
    >
      <paragraf-items
        :house_name="item.house_name"
        :professional_house_name="item.professional_house_name"
        :price="item.price"
      ></paragraf-items>
      <buttons-edit :id="item.id" @confirm-box="confirm_box"></buttons-edit>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import ParagrafItems from "./ParagrafItems.vue";
import ButtonsEdit from "./ButtonsEdit.vue";

export default defineComponent({
  emits: ["confirm-box"],
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
  },
  setup(_, ctx) {
    //functions
    const confirm_box = (val: string) => {
      ctx.emit("confirm-box", val);
    };
    return { confirm_box };
  },
});
</script>

<style scoped></style>
