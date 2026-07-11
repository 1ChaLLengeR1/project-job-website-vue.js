<template>
  <section class="flex w-full flex-col gap-3">
    <TenanciesTable
      :items="tenanciesStore.collection"
      :apartments="apartmentsStore.collection"
      :tenants="tenantsStore.collection"
      :loading="tenanciesStore.isLoading"
      :apartmentFilter="apartmentFilter"
      :tenantFilter="tenantFilter"
      :activeOn="activeOn"
      @update:apartmentFilter="handlerApartmentFilter"
      @update:tenantFilter="handlerTenantFilter"
      @update:activeOn="handlerActiveOn"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <TenancyForm
        :initial="editedItem"
        :apartments="apartmentsStore.collection"
        :tenants="tenantsStore.collection"
        @submit="handlerSubmit"
        @cancel="dialogVisible = false"
      />
    </FormDialog>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { formatDateApi } from "@/utils/formats";

// stores
import { RentalTenanciesStore } from "@/stores/rentals/tenancies";
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { RentalTenantsStore } from "@/stores/rentals/tenants";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import TenanciesTable from "@/components/Rentals/Dictionaries/TenanciesTable.vue";
import TenancyForm from "@/components/Rentals/Dictionaries/forms/TenancyForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Tenancy } from "@/types/api/rentals/tenancies/types";
import type {
  CreateTenancyBody,
  UpdateTenancyBody,
} from "@/types/rentals/tenancies/types";

export default defineComponent({
  name: "TenanciesSection",
  components: { TenanciesTable, TenancyForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const tenanciesStore = RentalTenanciesStore();
    const apartmentsStore = RentalApartmentsStore();
    const tenantsStore = RentalTenantsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Tenancy | null>(null);
    const apartmentFilter = ref<string | null>(null);
    const tenantFilter = ref<string | null>(null);
    // domyślnie tylko najmy trwające dziś — historia po wyczyszczeniu daty
    const activeOn = ref<Date | null>(new Date());

    const fetchCollection = async () => {
      await tenanciesStore.apiFetchCollection({
        apartment_id: apartmentFilter.value ?? undefined,
        tenant_id: tenantFilter.value ?? undefined,
        active_on: activeOn.value ? formatDateApi(activeOn.value) : undefined,
      });
    };

    onMounted(async () => {
      await fetchCollection();
      if (apartmentsStore.collection.length === 0) {
        await apartmentsStore.apiFetchCollection();
      }
      if (tenantsStore.collection.length === 0) {
        await tenantsStore.apiFetchCollection();
      }
    });

    const handlerApartmentFilter = async (value: string | null) => {
      apartmentFilter.value = value;
      await fetchCollection();
    };

    const handlerTenantFilter = async (value: string | null) => {
      tenantFilter.value = value;
      await fetchCollection();
    };

    const handlerActiveOn = async (value: Date | null) => {
      activeOn.value = value;
      await fetchCollection();
    };

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.tenancies.form.titleEdit")
        : t("pages.rentals.dictionaries.tenancies.form.titleCreate"),
    );

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Tenancy) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Tenancy) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await tenanciesStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateTenancyBody | UpdateTenancyBody,
    ) => {
      const isValid = editedItem.value
        ? await tenanciesStore.apiUpdate(
            editedItem.value.id,
            body as UpdateTenancyBody,
          )
        : await tenanciesStore.apiCreate(body as CreateTenancyBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      tenanciesStore,
      apartmentsStore,
      tenantsStore,
      dialogVisible,
      editedItem,
      apartmentFilter,
      tenantFilter,
      activeOn,
      dialogHeader,
      handlerApartmentFilter,
      handlerTenantFilter,
      handlerActiveOn,
      handlerAdd,
      handlerEdit,
      handlerDelete,
      handlerSubmit,
    };
  },
});
</script>

<style scoped></style>
