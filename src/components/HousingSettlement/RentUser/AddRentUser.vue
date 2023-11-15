<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <open-edit-panel
      name="Stwórz wynajmującego"
      @open-panel-list="open_panel_list"
    ></open-edit-panel>
    <add-form-user
      v-show="show_panel"
      @add-user="add_user"
      :array_flats="load_flats"
    ></add-form-user>
    <list-rent
      v-show="show_panel"
      @confirm-box="confirm_box"
      @edit-user="edit_user"
    ></list-rent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide, computed } from "vue";

//componets
import OpenEditPanel from "../../../components/MoneySettlement/OpenPanelList.vue";
import AddFormRenUserVue from "../RentUser/AddFormRenUser.vue";
import ListRentVue from "../RentUser/List/ListRent.vue";

export default defineComponent({
  emits: ["add-user", "confirm-box", "edit-user"],
  props: {
    load_flats: {
      required: true,
      type: Array<{
        id: String;
        house_name: String;
        price: Number;
        professional_house_name: String;
      }>,
    },
    load_rent_users: {
      required: true,
      type: Array<{
        id: String;
        name: String;
        quantity_users: Number;
        name_flats: String;
        id_flats: String;
      }>,
    },
  },
  components: {
    "open-edit-panel": OpenEditPanel,
    "add-form-user": AddFormRenUserVue,
    "list-rent": ListRentVue,
  },
  setup(props, ctx) {
    //values
    const show_panel = ref<boolean>(false);

    //functions
    const open_panel_list = (val: boolean) => {
      show_panel.value = val;
    };
    const add_user = (val: {
      name: string;
      quantity_users: string | number;
      id_flats: string;
    }) => {
      ctx.emit("add-user", val);
    };

    const edit_user = (val: {
      id: String;
      name: String;
      quantity_users: Number;
      id_flats: String;
    }) => {
      ctx.emit("edit-user", val);
    };

    const confirm_box = (val: string) => {
      ctx.emit("confirm-box", val);
    };

    const load_rent_users = computed(() => {
      return props.load_rent_users;
    });

    const load_flats = computed(() => {
      return props.load_flats;
    });

    provide("load_rent_users", load_rent_users);
    provide("load_flats", load_flats);

    return { open_panel_list, show_panel, add_user, confirm_box, edit_user };
  },
});
</script>

<style scoped></style>
