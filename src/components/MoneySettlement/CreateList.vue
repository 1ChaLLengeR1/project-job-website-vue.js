<template>
  <div class="flex w-full flex-col gap-3 sm:w-4/6">
    <open-panel-list @open-panel-list="open_panel_list"></open-panel-list>
    <create-list
      v-if="show_list"
      @response-notification="response_notification"
    ></create-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

//commponets
import OpenPanelList from "./OpenPanelList.vue";
import CreateList from "../MoneySettlement/AddPanelList.vue";

export default defineComponent({
  emits: ["response-notification"],
  components: {
    "open-panel-list": OpenPanelList,
    "create-list": CreateList,
  },
  setup(_, ctx) {
    //value
    const show_list = ref<boolean>(false);

    //finctions
    const open_panel_list = (val: boolean) => {
      show_list.value = val;
    };

    const response_notification = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      ctx.emit("response-notification", val);
    };
    return { open_panel_list, show_list, response_notification };
  },
});
</script>

<style scoped></style>
