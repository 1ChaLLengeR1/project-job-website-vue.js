<template>
  <section class="flex w-full flex-col gap-3">
    <ApartmentsTable
      :items="apartmentsStore.collection"
      :loading="apartmentsStore.isLoading"
      :activeFilter="activeFilter"
      @update:activeFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <ApartmentForm
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
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import ApartmentsTable from "@/components/Rentals/Dictionaries/ApartmentsTable.vue";
import ApartmentForm from "@/components/Rentals/Dictionaries/forms/ApartmentForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Apartment } from "@/types/api/rentals/apartments/types";
import type {
  CreateApartmentBody,
  UpdateApartmentBody,
} from "@/types/rentals/apartments/types";

export default defineComponent({
  name: "ApartmentsSection",
  components: { ApartmentsTable, ApartmentForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const apartmentsStore = RentalApartmentsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Apartment | null>(null);
    const activeFilter = ref<boolean | null>(null);

    onMounted(async () => {
      await apartmentsStore.apiFetchCollection();
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.apartments.form.titleEdit")
        : t("pages.rentals.dictionaries.apartments.form.titleCreate"),
    );

    const handlerFilter = async (value: boolean | null) => {
      activeFilter.value = value;
      await apartmentsStore.apiFetchCollection(value ?? undefined);
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Apartment) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Apartment) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await apartmentsStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateApartmentBody | UpdateApartmentBody,
    ) => {
      const isValid = editedItem.value
        ? await apartmentsStore.apiUpdate(
            editedItem.value.id,
            body as UpdateApartmentBody,
          )
        : await apartmentsStore.apiCreate(body as CreateApartmentBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
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
