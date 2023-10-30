<template>
  <li
    :class="{ 'bg-red-600': !type }"
    class="w-full relative flex flex-col-reverse gap-3 lg:flex-row bg-green-600 p-1 sm:p-0 rounded-3xl"
  >
    <result-information
      :name="name"
      :amount="amount"
      :model="model"
      @click="click_method"
    ></result-information>
    <buttons-controller
      :id="id"
      :name="name"
      :amount="amount"
      :model="model"
      v-if="show_componets.edit_panel"
      @close-edit-panel="close_edit_panel"
      @submit-edit-form="submit_edit_form"
      @submit-delete="submit_delete"
    ></buttons-controller>
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//componets
import ResultInformation from "./ResultInformation.vue";
import ButtonsController from "./ButtonsController.vue";

export default defineComponent({
  emits: ["submit-edit-form", "submit-delete"],
  props: {
    id: {
      required: true,
      type: String,
    },
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
  setup(props, ctx) {
    //values
    const show_componets = reactive<{ edit_panel: boolean }>({
      edit_panel: false,
    });
    const click_values = reactive<{
      clicks: number;
      timer: any;
      type: boolean;
    }>({
      clicks: 0,
      timer: null,
      type: props.type,
    });

    //functions
    const submit_edit_form = (val: {
      id: string;
      name: string;
      amount: number;
      model: string;
    }) => {
      ctx.emit("submit-edit-form", {
        id: val.id,
        name: val.name,
        amount: val.amount,
        model: val.model,
        type: click_values.type,
      });
    };
    const click_method = () => {
      click_values.clicks++;
      if (click_values.clicks === 1) {
        click_values.timer = setTimeout(() => {
          click_values.type = !click_values.type;
          submit_edit_form({
            id: props.id,
            name: props.name,
            amount: props.amount,
            model: props.model,
          });
          click_values.clicks = 0;
        }, 500);
      } else {
        clearTimeout(click_values.timer);
        show_componets.edit_panel = !show_componets.edit_panel;
        click_values.clicks = 0;
      }
    };
    const close_edit_panel = (val: boolean) => {
      show_componets.edit_panel = val;
    };
    const submit_delete = (id: string) => {
      ctx.emit("submit-delete", id);
    };
    return {
      show_componets,
      click_method,
      click_values,
      close_edit_panel,
      submit_edit_form,
      submit_delete,
    };
  },
});
</script>

<style scoped></style>
