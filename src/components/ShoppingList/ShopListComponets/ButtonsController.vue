<template>
  <div
    class="w-full absolute top-0 left-0 z-10 flex flex-col-reverse sm:flex-row gap-3 bg-color-bg"
  >
    <form-edit-inputs
      :id="id"
      :name="name"
      :amount="amount"
      :model="model"
      @submit-edit-form="submit_edit_form"
    ></form-edit-inputs>
    <svg-component
      @close-edit-panel="close_edit_panel"
      @submit-delete="submit_delete"
    ></svg-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

//componets
import SvgComponent from "./SvgComponent.vue";
import FormEditInputs from "./FormEditInputs.vue";

export default defineComponent({
  components: {
    "svg-component": SvgComponent,
    "form-edit-inputs": FormEditInputs,
  },
  emits: ["close-edit-panel", "submit-edit-form", "submit-delete"],
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
  },
  setup(props, ctx) {
    //functions
    const close_edit_panel = () => {
      ctx.emit("close-edit-panel", false);
    };
    const submit_edit_form = (val: {
      id: string;
      name: string;
      amount: number;
      model: string;
    }) => {
      ctx.emit("submit-edit-form", val);
    };
    const submit_delete = () => {
      ctx.emit("submit-delete", props.id);
    };
    return { close_edit_panel, submit_edit_form, submit_delete };
  },
});
</script>

<style scoped></style>
