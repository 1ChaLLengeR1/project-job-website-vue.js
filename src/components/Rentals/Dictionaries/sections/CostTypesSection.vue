<template>
  <section class="flex w-full flex-col gap-3">
    <CostTypesTable
      :items="costTypesStore.collection"
      :loading="costTypesStore.isLoading"
      :activeFilter="activeFilter"
      @update:activeFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <CostTypeForm
        :initial="editedItem"
        @submit="handlerSubmit"
        @cancel="dialogVisible = false"
      />
    </FormDialog>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

// stores
import { RentalCostTypesStore } from "@/stores/rentals/costTypes";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import CostTypesTable from "@/components/Rentals/Dictionaries/CostTypesTable.vue";
import CostTypeForm from "@/components/Rentals/Dictionaries/forms/CostTypeForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { CostType } from "@/types/api/rentals/costTypes/types";
import type {
  CreateCostTypeBody,
  UpdateCostTypeBody,
} from "@/types/rentals/costTypes/types";

export default defineComponent({
  name: "CostTypesSection",
  components: { CostTypesTable, CostTypeForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const costTypesStore = RentalCostTypesStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<CostType | null>(null);
    const activeFilter = ref<boolean | null>(null);

    onMounted(async () => {
      await costTypesStore.apiFetchCollection();
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.costTypes.form.titleEdit")
        : t("pages.rentals.dictionaries.costTypes.form.titleCreate"),
    );

    const handlerFilter = async (value: boolean | null) => {
      activeFilter.value = value;
      await costTypesStore.apiFetchCollection(value ?? undefined);
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: CostType) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: CostType) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await costTypesStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateCostTypeBody | UpdateCostTypeBody,
    ) => {
      const isValid = editedItem.value
        ? await costTypesStore.apiUpdate(
            editedItem.value.id,
            body as UpdateCostTypeBody,
          )
        : await costTypesStore.apiCreate(body as CreateCostTypeBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      costTypesStore,
      dialogVisible,
      editedItem,
      activeFilter,
      dialogHeader,
      handlerFilter,
      handlerAdd,
      handlerEdit,
      handlerDelete,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
