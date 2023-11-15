<template>
  <ul>
    <li
      class="flex w-full flex-col-reverse gap-1 bg-color-bg-dark p-1 shadow-[0_0_3px_0] shadow-color-yellow xl:flex-row xl:shadow-none"
      v-for="item in load_rent_users"
      :key="item.id"
    >
      <paragraf-item
        v-if="item.id !== show_edit_input"
        :name="item.name"
        :name_flats="item.name_flats"
        :quantity_users="item.quantity_users"
      ></paragraf-item>
      <edit-form-panel
        v-if="item.id === show_edit_input"
        :id="item.id"
        :name="item.name"
        :quantity_users="item.quantity_users"
        :name_flats="item.name_flats"
        :id_flats="item.id_flats"
        @edit_user="edit_user"
      ></edit-form-panel>
      <button-edits
        :id="item.id"
        @confirm-box="confirm_box"
        @open-buttons-edit="open_buttons_edit"
      ></button-edits>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref } from "vue";

//componets
import ParagrafItemsVue from "../../RentUser/List/ParagrafItem.vue";
import ButtonsEditVue from "../../Flats/ButtonsEdit.vue";
import EditFormPanel from "../List/EditFormPanel.vue";

interface RentUser {
  id: string;
  name: string;
  quantity_users: number;
  name_flats: string;
  id_flats: string;
}
export default defineComponent({
  emits: ["confirm-box", "edit-user"],
  components: {
    "paragraf-item": ParagrafItemsVue,
    "button-edits": ButtonsEditVue,
    "edit-form-panel": EditFormPanel,
  },
  setup(_, ctx) {
    //values
    const rent_users = inject<RentUser[]>("load_rent_users");
    const show_edit_input = ref<string>("");

    //functions
    const confirm_box = (val: string) => {
      ctx.emit("confirm-box", val);
    };

    const open_buttons_edit = (val: string) => {
      if (show_edit_input.value === val) {
        show_edit_input.value = "";
        return;
      }
      show_edit_input.value = val;
    };

    const edit_user = (val: {
      id: String;
      name: String;
      quantity_users: Number;
      id_flats: String;
    }) => {
      ctx.emit("edit-user", val);
    };

    //computed
    const load_rent_users = computed(() => {
      return rent_users.value;
    });
    return {
      load_rent_users,
      confirm_box,
      open_buttons_edit,
      show_edit_input,
      edit_user,
    };
  },
});
</script>

<style scoped></style>
