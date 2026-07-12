<template>
  <section class="flex w-full flex-col gap-3">
    <TenantsTable
      :items="tenantsStore.collection"
      :loading="tenantsStore.isLoading"
      :activeFilter="activeFilter"
      @update:activeFilter="handlerFilter"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <TenantForm
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
import { RentalTenantsStore } from "@/stores/rentals/tenants";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import TenantsTable from "@/components/Rentals/Dictionaries/TenantsTable.vue";
import TenantForm from "@/components/Rentals/Dictionaries/forms/TenantForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { Tenant } from "@/types/api/rentals/tenants/types";
import type {
  CreateTenantBody,
  UpdateTenantBody,
} from "@/types/rentals/tenants/types";

export default defineComponent({
  name: "TenantsSection",
  components: { TenantsTable, TenantForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const tenantsStore = RentalTenantsStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<Tenant | null>(null);
    const activeFilter = ref<boolean | null>(null);

    onMounted(async () => {
      await tenantsStore.apiFetchCollection();
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.dictionaries.tenants.form.titleEdit")
        : t("pages.rentals.dictionaries.tenants.form.titleCreate"),
    );

    const handlerFilter = async (value: boolean | null) => {
      activeFilter.value = value;
      await tenantsStore.apiFetchCollection(value ?? undefined);
    };

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: Tenant) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: Tenant) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await tenantsStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (body: CreateTenantBody | UpdateTenantBody) => {
      const isValid = editedItem.value
        ? await tenantsStore.apiUpdate(
            editedItem.value.id,
            body as UpdateTenantBody,
          )
        : await tenantsStore.apiCreate(body as CreateTenantBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      tenantsStore,
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
