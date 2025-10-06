<template>
  <div class="w-full p-4">
    <div class="flex w-full justify-center">
      <button
        @click="isVisible = !isVisible"
        class="mb-4 rounded-lg border border-color-yellow bg-color-bg px-6 py-2 font-semibold text-white shadow-sm hover:bg-opacity-90"
      >
        {{
          isVisible
            ? "Ukryj warunki kalendarzowe"
            : "Pokaż warunki kalendarzowe"
        }}
      </button>
    </div>

    <div v-if="isVisible" class="space-y-6">
      <div
        class="rounded-lg border border-color-yellow bg-color-bg p-4 shadow-sm"
      >
        <h3 class="mb-4 text-lg font-semibold text-white">
          Dodaj nowy warunek
        </h3>
        <form @submit.prevent="submitCreateCondition" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-300"
                >Norma godzin:</label
              >
              <input
                v-model="formCreate.norm_hours"
                type="number"
                required
                class="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-color-yellow focus:outline-none"
                placeholder="np. 8"
              />
            </div>
            <div>
              <label class="mb-1 block text-sm font-medium text-gray-300"
                >Przepracowane godziny:</label
              >
              <input
                v-model="formCreate.hourly_rate"
                type="number"
                required
                class="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-color-yellow focus:outline-none"
                placeholder="np. 160"
              />
            </div>
          </div>
          <button
            type="submit"
            class="rounded-lg border border-color-yellow bg-color-yellow px-6 py-2 font-semibold text-gray-900 shadow-sm hover:bg-opacity-90"
          >
            Dodaj warunek
          </button>
        </form>
      </div>

      <!-- Lista warunków -->
      <ul class="w-full space-y-3">
        <li
          v-for="item in apiCalendaryCinditionStore.collection"
          :key="item.id"
          class="rounded-lg border border-color-yellow bg-color-bg p-4 shadow-sm"
        >
          <div class="grid grid-cols-2 gap-3">
            <div>
              <span class="text-sm font-medium text-gray-500"
                >Data rozpoczęcia:</span
              >
              <p class="text-base font-semibold text-white">
                {{ item.start_date }}
              </p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500"
                >Norma godzin:</span
              >
              <p class="text-base font-semibold text-white">
                {{ item.norm_hours }} h
              </p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500"
                >Stawka godzinowa:</span
              >
              <p class="text-base font-semibold text-white">
                {{ item.hourly_rate }} zł
              </p>
            </div>
            <div>
              <span class="text-sm font-medium text-gray-500"
                >Zaktualizowano:</span
              >
              <p class="text-base font-semibold text-white">
                {{ new Date(item.updated_at).toLocaleDateString("pl-PL") }}
              </p>
            </div>
          </div>

          <!-- Przyciski akcji -->
          <div class="mt-4 flex gap-2">
            <button
              @click="openEditModal(item)"
              class="rounded border border-color-yellow bg-transparent px-4 py-1.5 text-sm font-medium text-color-yellow hover:bg-color-yellow hover:text-gray-900"
            >
              Edytuj
            </button>
            <button
              @click="handlerDeleteCondition(item.id)"
              class="rounded border border-red-500 bg-transparent px-4 py-1.5 text-sm font-medium text-red-500 hover:bg-red-500 hover:text-white"
            >
              Usuń
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Modal edycji -->
    <div
      v-if="isEditModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeEditModal"
    >
      <div
        class="w-full max-w-md rounded-lg border border-color-yellow bg-color-bg p-6 shadow-lg"
      >
        <h3 class="mb-4 text-lg font-semibold text-white">Edytuj warunek</h3>
        <form @submit.prevent="submitUpdateCondition" class="space-y-4">
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-300"
              >Norma godzin:</label
            >
            <input
              v-model="formEdit.norm_hours"
              type="number"
              required
              class="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-color-yellow focus:outline-none"
            />
          </div>
          <div>
            <label class="mb-1 block text-sm font-medium text-gray-300"
              >Przepracowane godziny:</label
            >
            <input
              v-model="formEdit.hourly_rate"
              type="number"
              required
              class="w-full rounded border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-color-yellow focus:outline-none"
            />
          </div>
          <div class="flex gap-2">
            <button
              type="submit"
              class="flex-1 rounded-lg border border-color-yellow bg-color-yellow px-6 py-2 font-semibold text-gray-900 shadow-sm hover:bg-opacity-90"
            >
              Zapisz
            </button>
            <button
              type="button"
              @click="closeEditModal"
              class="flex-1 rounded-lg border border-gray-600 bg-transparent px-6 py-2 font-semibold text-white shadow-sm hover:bg-gray-800"
            >
              Anuluj
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
// stores
import { ApiCalendaryCinditionStore } from "@/stores/calendary/condition/apiCalendaryCondition";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

// types
import { PayloadBodyCreateCondition } from "@/types/calendary/types";

export default defineComponent({
  setup() {
    const apiCalendaryCinditionStore = ApiCalendaryCinditionStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const isVisible = ref(false);
    const isEditModalOpen = ref(false);
    const editingConditionId = ref<string>("");

    const formCreate = ref<PayloadBodyCreateCondition>({
      norm_hours: null,
      hourly_rate: null,
    });

    const formEdit = ref<PayloadBodyCreateCondition>({
      norm_hours: null,
      hourly_rate: null,
    });

    onMounted(async () => {
      loadingSpinnerStore.isLoading = true;
      await apiCalendaryCinditionStore.fetchCalendaryCollectionCondition();
      loadingSpinnerStore.isLoading = false;
    });

    const submitCreateCondition = async () => {
      await handlerCreateCondition(formCreate.value);
      formCreate.value = {
        norm_hours: null,
        hourly_rate: null,
      };
    };

    const openEditModal = (item: any) => {
      editingConditionId.value = item.id;
      formEdit.value = {
        norm_hours: parseFloat(item.norm_hours),
        hourly_rate: parseFloat(item.hourly_rate) || null,
      };
      isEditModalOpen.value = true;
    };

    const closeEditModal = () => {
      isEditModalOpen.value = false;
      editingConditionId.value = "";
      formEdit.value = {
        norm_hours: null,
        hourly_rate: null,
      };
    };

    const submitUpdateCondition = async () => {
      await handlerUpdateCondition(editingConditionId.value, formEdit.value);
      closeEditModal();
    };

    const handlerCreateCondition = async (
      payload: PayloadBodyCreateCondition,
    ) => {
      loadingSpinnerStore.isLoading = true;
      await apiCalendaryCinditionStore.postCalendaryCreateCondition(payload);
      loadingSpinnerStore.isLoading = false;
    };

    const handlerDeleteCondition = async (conditionId: string) => {
      loadingSpinnerStore.isLoading = true;
      await apiCalendaryCinditionStore.deleteCalendaryDeleteByIdCondition(
        conditionId,
      );
      loadingSpinnerStore.isLoading = false;
    };

    const handlerUpdateCondition = async (
      conditionId: string,
      payload: PayloadBodyCreateCondition,
    ) => {
      loadingSpinnerStore.isLoading = true;
      await apiCalendaryCinditionStore.patchCalendaryUpdateByIdCondition(
        conditionId,
        payload,
      );
      loadingSpinnerStore.isLoading = false;
    };

    return {
      apiCalendaryCinditionStore,
      isVisible,
      isEditModalOpen,
      formCreate,
      formEdit,
      submitCreateCondition,
      openEditModal,
      closeEditModal,
      submitUpdateCondition,
      handlerDeleteCondition,
    };
  },
});
</script>

<style scoped></style>
