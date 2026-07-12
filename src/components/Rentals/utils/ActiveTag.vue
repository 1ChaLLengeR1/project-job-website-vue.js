<template>
  <Tag
    :value="
      active
        ? t('pages.rentals.dictionaries.common.active')
        : t('pages.rentals.dictionaries.common.inactive')
    "
    :severity="active ? 'success' : 'danger'"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

// components
import Tag from "primevue/tag";

export default defineComponent({
  name: "ActiveTag",
  components: { Tag },
  props: {
    active: {
      required: true,
      type: Boolean,
    },
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
});
</script>

<style scoped></style>
