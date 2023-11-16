<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <open-panel-list
      name="Podstawowe wartości rozliczeniowe"
      @open-panel-list="open_panel_list"
    ></open-panel-list>
    <edit-form
      :array_basic_values="load_basic_rental_values"
      @edit-values="edit_values"
      v-show="show_form"
    ></edit-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";

//componets
import OpenPanelList from "../../MoneySettlement/OpenPanelList.vue";
import EditFormVue from "./EditForm.vue";

export default defineComponent({
  emits: ["edit-values"],
  components: {
    "open-panel-list": OpenPanelList,
    "edit-form": EditFormVue,
  },
  setup(_, ctx) {
    //values
    const store = useStore();
    const show_form = ref<Boolean>(false);
    //functions
    const open_panel_list = (val: boolean) => {
      show_form.value = val;
    };
    const edit_values = (val: {
      id: string;
      electric_current: number;
      water: number;
      trash: number;
      internet: number;
      transfer: number;
    }) => {
      ctx.emit("edit-values", val);
    };
    //computed
    const load_basic_rental_values = computed(() => {
      return store.getters["response/get_basic_rental_values"];
    });
    return {
      open_panel_list,
      show_form,
      load_basic_rental_values,
      edit_values,
    };
  },
});
</script>

<style scoped></style>
