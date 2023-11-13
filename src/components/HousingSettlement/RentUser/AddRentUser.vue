<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <open-edit-panel
      name="Stwórz wynajmującego"
      @open-panel-list="open_panel_list"
    ></open-edit-panel>
    <add-form-user></add-form-user>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import OpenEditPanel from "../../../components/MoneySettlement/OpenPanelList.vue";
import AddFormRenUserVue from "../RentUser/AddFormRenUser.vue";

export default defineComponent({
  components: {
    "open-edit-panel": OpenEditPanel,
    "add-form-user": AddFormRenUserVue,
  },
  setup() {
    //functions
    const open_panel_list = (val: boolean) => {
      console.log(val);
    };
    return { open_panel_list };
  },
});
</script>

<style scoped></style>
