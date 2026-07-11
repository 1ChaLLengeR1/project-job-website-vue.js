<template>
  <section class="flex w-full flex-col gap-3">
    <MetersTable
      :items="metersStore.collection"
      :apartments="apartmentsStore.collection"
      :loading="metersStore.isLoading"
      :activeFilter="activeFilter"
      @update:activeFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <MeterForm
        :initial="editedItem"
        :apartments="apartmentsStore.collection"
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
import { RentalMetersStore } from "@/stores/rentals/meters";
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import MetersTable from "@/components/Rentals/Dictionaries/MetersTable.vue";
import MeterForm from "@/components/Rentals/Dictionaries/forms/MeterForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Meter } from "@/types/api/rentals/meters/types";
import type {
  CreateMeterBody,
  UpdateMeterBody,
} from "@/types/rentals/meters/types";

export default defineComponent({
  name: "MetersSection",
  components: { MetersTable, MeterForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const metersStore = RentalMetersStore();
    const apartmentsStore = RentalApartmentsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Meter | null>(null);
    const activeFilter = ref<boolean | null>(null);

    onMounted(async () => {
      await metersStore.apiFetchCollection();
      if (apartmentsStore.collection.length === 0) {
        await apartmentsStore.apiFetchCollection();
      }
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.meters.form.titleEdit")
        : t("pages.rentals.dictionaries.meters.form.titleCreate"),
    );

    const handlerFilter = async (value: boolean | null) => {
      activeFilter.value = value;
      await metersStore.apiFetchCollection(
        value === null ? {} : { is_active: value },
      );
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Meter) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Meter) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await metersStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (body: CreateMeterBody | UpdateMeterBody) => {
      const isValid = editedItem.value
        ? await metersStore.apiUpdate(
            editedItem.value.id,
            body as UpdateMeterBody,
          )
        : await metersStore.apiCreate(body as CreateMeterBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      metersStore,
      apartmentsStore,
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
