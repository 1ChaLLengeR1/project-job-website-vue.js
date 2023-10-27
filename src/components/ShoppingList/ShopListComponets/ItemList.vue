<template>
  <li
    :class="{ 'bg-green-600': type }"
    class="w-full flex flex-col-reverse gap-3 lg:flex-row bg-red-600 p-1 sm:p-0"
  >
    <result-information
      :name="name"
      :amount="amount"
      :model="model"
      @click="click_method"
    ></result-information>
    <buttons-controller v-if="show_componets.edit_panel"></buttons-controller>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import ResultInformation from "./ResultInformation.vue";
import ButtonsController from "./ButtonsController.vue";

export default defineComponent({
  props: {
    name: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
    model: {
      required: true,
      type: String,
    },
    type: {
      required: true,
      type: Boolean,
      default: false,
    },
  },
  components: {
    "result-information": ResultInformation,
    "buttons-controller": ButtonsController,
  },
  setup() {
    //values
    const show_componets = reactive({
      edit_panel: false,
      clicks: 0,
      timer: null,
    });

    //functions
    const click_method = () => {
      show_componets.clicks++;
      if (show_componets.clicks === 1) {
        show_componets.timer = setTimeout(() => {
          console.log("zaznaczono");
          show_componets.clicks = 0;
        }, 500);
      } else {
        clearTimeout(show_componets.timer);
        show_componets.edit_panel = !show_componets.edit_panel;
        show_componets.clicks = 0;
      }
    };
    return { show_componets, click_method };
  },
});
</script>

<style scoped></style>
