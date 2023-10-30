<template>
  <ul class="w-full flex flex-col gap-3 p-3 bg-color-bg rounded-3xl">
    <item-list
      v-for="item in array_shop_list"
      :key="item.id"
      :id="item.id"
      :name="item.name"
      :amount="item.amount"
      :model="item.model"
      :type="item.type"
      @submit-edit-form="submit_edit_form"
      @submit-delete="submit_delete"
    ></item-list>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import ItemListVue from "./ShopListComponets/ItemList.vue";

interface arrayObject {
  id: string;
  name: string;
  amount: number;
  model: string;
  type: boolean;
}

export default defineComponent({
  components: {
    "item-list": ItemListVue,
  },
  emits: ["submit-edit-form", "submit-delete"],
  props: {
    array_shop_list: {
      required: true,
      type: Array<arrayObject>,
    },
  },
  setup(_, ctx) {
    const submit_edit_form = (val: {
      id: string;
      name: string;
      amount: number;
      model: string;
      type:boolean
    }) => {
      ctx.emit("submit-edit-form", val);
    };
    const submit_delete = (id: string) => {
      ctx.emit("submit-delete", id);
    };
    return { submit_edit_form, submit_delete };
  },
});
</script>

<style scoped></style>
