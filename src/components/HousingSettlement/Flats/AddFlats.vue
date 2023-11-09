<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <open-panel-list
      name="Stwórz pokój"
      @open-panel-list="open_panel_list"
    ></open-panel-list>
    <add-flats-form v-show="show_list" @add-flats="add_flats"></add-flats-form>
    <list-flats
      v-show="show_list"
      :array_list_flats="array_list_flats"
      @confirm-box="confirm_box"
    ></list-flats>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//componets
import OpenPanelListVue from "../../MoneySettlement/OpenPanelList.vue";
import AddFlatsFormVue from "./AddFlatsForm.vue";
import ListFlatsVue from "./ListFlats.vue";

export default defineComponent({
  emits: ["add-flats", "confirm-box"],
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
    "open-panel-list": OpenPanelListVue,
    "add-flats-form": AddFlatsFormVue,
    "list-flats": ListFlatsVue,
  },
  setup(_, ctx) {
    //value
    const show_list = ref<boolean>(false);

    //finctions
    const open_panel_list = (val: boolean) => {
      show_list.value = val;
    };

    const add_flats = (val: {
      house_name: string;
      professional_house_name: string;
      price: number;
    }) => {
      ctx.emit("add-flats", val);
    };

    const confirm_box = (val: string) => {
      ctx.emit("confirm-box", val);
    };
    return { open_panel_list, add_flats, show_list, confirm_box };
  },
});
</script>

<style scoped></style>
