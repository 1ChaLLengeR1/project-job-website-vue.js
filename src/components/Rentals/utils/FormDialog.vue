<template>
  <Dialog
    :visible="visible"
    :header="header"
    modal
    :style="{ width: '90vw', maxWidth: '32rem' }"
    @update:visible="handlerVisible"
  >
    <slot />
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// components
import Dialog from "primevue/dialog";

export default defineComponent({
  name: "FormDialog",
  components: { Dialog },
  props: {
    visible: {
      required: true,
      type: Boolean,
    },
    header: {
      required: true,
      type: String,
    },
  },
  emits: ["update:visible"],
  setup(_, ctx) {
    const handlerVisible = (value: boolean) => {
      ctx.emit("update:visible", value);
    };
    return { handlerVisible };
  },
});
</script>

<style scoped></style>
