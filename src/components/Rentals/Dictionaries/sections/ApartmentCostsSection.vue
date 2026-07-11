<template>
  <section class="flex w-full flex-col gap-3">
    <ApartmentCostsTable
      :items="apartmentCostsStore.collection"
      :apartments="apartmentsStore.collection"
      :costTypes="costTypesStore.collection"
      :loading="apartmentCostsStore.isLoading"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <ApartmentCostForm
        :initial="editedItem"
        :apartments="apartmentsStore.collection"
        :costTypes="costTypesStore.collection"
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
import { RentalApartmentCostsStore } from "@/stores/rentals/apartmentCosts";
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { RentalCostTypesStore } from "@/stores/rentals/costTypes";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import ApartmentCostsTable from "@/components/Rentals/Dictionaries/ApartmentCostsTable.vue";
import ApartmentCostForm from "@/components/Rentals/Dictionaries/forms/ApartmentCostForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { ApartmentCost } from "@/types/api/rentals/apartmentCosts/types";
import type {
  CreateApartmentCostBody,
  UpdateApartmentCostBody,
} from "@/types/rentals/apartmentCosts/types";

export default defineComponent({
  name: "ApartmentCostsSection",
  components: { ApartmentCostsTable, ApartmentCostForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const apartmentCostsStore = RentalApartmentCostsStore();
    const apartmentsStore = RentalApartmentsStore();
    const costTypesStore = RentalCostTypesStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<ApartmentCost | null>(null);

    onMounted(async () => {
      await apartmentCostsStore.apiFetchCollection();
      if (apartmentsStore.collection.length === 0) {
        await apartmentsStore.apiFetchCollection();
      }
      if (costTypesStore.collection.length === 0) {
        await costTypesStore.apiFetchCollection();
      }
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.apartmentCosts.form.titleEdit")
        : t("pages.rentals.dictionaries.apartmentCosts.form.titleCreate"),
    );

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: ApartmentCost) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: ApartmentCost) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await apartmentCostsStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateApartmentCostBody | UpdateApartmentCostBody,
    ) => {
      const isValid = editedItem.value
        ? await apartmentCostsStore.apiUpdate(
            editedItem.value.id,
            body as UpdateApartmentCostBody,
          )
        : await apartmentCostsStore.apiCreate(body as CreateApartmentCostBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      apartmentCostsStore,
      apartmentsStore,
      costTypesStore,
      dialogVisible,
      editedItem,
      dialogHeader,
      handlerAdd,
      handlerEdit,
      handlerDelete,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
