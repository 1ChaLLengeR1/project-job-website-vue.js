<template>
  <section class="flex w-full flex-col gap-3">
    <AllocationRulesTable
      :items="rulesStore.collection"
      :beneficiaries="beneficiariesStore.collection"
      :apartments="apartmentsStore.collection"
      :costTypes="costTypesStore.collection"
      :loading="rulesStore.isLoading"
      @add="handlerAdd"
      @edit="handlerEdit"
      @delete="handlerDelete"
    />
    <FormDialog v-model:visible="dialogVisible" :header="dialogHeader">
      <AllocationRuleForm
        :initial="editedItem"
        :beneficiaries="beneficiariesStore.collection"
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
import { RentalAllocationRulesStore } from "@/stores/rentals/allocationRules";
import { RentalBeneficiariesStore } from "@/stores/rentals/beneficiaries";
import { RentalApartmentsStore } from "@/stores/rentals/apartments";
import { RentalCostTypesStore } from "@/stores/rentals/costTypes";
import { ConfirmBoxStore } from "@/stores/modals/confirmBox";

// components
import AllocationRulesTable from "@/components/Rentals/Family/AllocationRulesTable.vue";
import AllocationRuleForm from "@/components/Rentals/Family/forms/AllocationRuleForm.vue";
import FormDialog from "@/components/Rentals/utils/FormDialog.vue";

// types
import type { AllocationRule } from "@/types/api/rentals/allocationRules/types";
import type {
  CreateAllocationRuleBody,
  UpdateAllocationRuleBody,
} from "@/types/rentals/allocationRules/types";

export default defineComponent({
  name: "AllocationRulesSection",
  components: { AllocationRulesTable, AllocationRuleForm, FormDialog },
  setup() {
    const { t } = useI18n();
    const rulesStore = RentalAllocationRulesStore();
    const beneficiariesStore = RentalBeneficiariesStore();
    const apartmentsStore = RentalApartmentsStore();
    const costTypesStore = RentalCostTypesStore();
    const confirmBoxStore = ConfirmBoxStore();

    const dialogVisible = ref<boolean>(false);
    const editedItem = ref<AllocationRule | null>(null);

    onMounted(async () => {
      await rulesStore.apiFetchCollection();
      if (beneficiariesStore.collection.length === 0) {
        await beneficiariesStore.apiFetchCollection();
      }
      if (apartmentsStore.collection.length === 0) {
        await apartmentsStore.apiFetchCollection();
      }
      if (costTypesStore.collection.length === 0) {
        await costTypesStore.apiFetchCollection();
      }
    });

    const dialogHeader = computed(() =>
      editedItem.value
        ? t("pages.rentals.family.rules.form.titleEdit")
        : t("pages.rentals.family.rules.form.titleCreate"),
    );

    const handlerAdd = () => {
      editedItem.value = null;
      dialogVisible.value = true;
    };

    const handlerEdit = (item: AllocationRule) => {
      editedItem.value = item;
      dialogVisible.value = true;
    };

    const handlerDelete = (item: AllocationRule) => {
      confirmBoxStore.isActice = true;
      confirmBoxStore.setCallback(async () => {
        await rulesStore.apiDelete(item.id);
      });
    };

    const handlerSubmit = async (
      body: CreateAllocationRuleBody | UpdateAllocationRuleBody,
    ) => {
      const isValid = editedItem.value
        ? await rulesStore.apiUpdate(
            editedItem.value.id,
            body as UpdateAllocationRuleBody,
          )
        : await rulesStore.apiCreate(body as CreateAllocationRuleBody);
      if (isValid) {
        dialogVisible.value = false;
      }
    };

    return {
      t,
      rulesStore,
      beneficiariesStore,
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
