<template>
  <div class="mx-auto max-w-7xl p-4">
    <!-- Header -->
    <div class="mb-6 rounded-lg bg-white p-6 shadow">
      <div class="flex items-center justify-between">
        <button
          @click="previousMonth"
          class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          ←
        </button>

        <h2 class="text-2xl font-bold">
          {{ apiCalendaryStore.collection.month_name }}
          {{ apiCalendaryStore.collection.year }}
        </h2>

        <button
          @click="nextMonth"
          class="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
        >
          →
        </button>
      </div>
    </div>
    <div class="mb-6 rounded-lg bg-white p-6 shadow">
      <h3 class="mb-4 text-lg font-bold">Edycja wielu dni po wypłacie</h3>
      <form
        @submit.prevent="handlerUpdateManyDaysSalery"
        class="grid grid-cols-7 gap-4"
      >
        <div>
          <label class="block text-sm font-medium text-gray-700">Wypłata</label>
          <input
            v-model="bulkSalaryFormEdit.salary"
            type="number"
            min="1"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div class="col-span-2 flex items-end">
          <button
            type="submit"
            class="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Aktualizuj dni po wypłacie
          </button>
        </div>
      </form>
    </div>

    <!-- Bulk Edit Panel -->
    <div class="mb-6 rounded-lg bg-white p-6 shadow">
      <h3 class="mb-4 text-lg font-bold">Edycja wielu dni</h3>
      <form @submit.prevent="updateManyDays" class="grid grid-cols-7 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Dzień od</label
          >
          <input
            v-model="bulkEditForm.start_day"
            type="number"
            min="1"
            max="31"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Dzień do</label
          >
          <input
            v-model="bulkEditForm.end_day"
            type="number"
            min="1"
            max="31"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Norma godzin</label
          >
          <input
            v-model="bulkEditForm.norm_hours"
            type="text"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="6.5"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Przepracowane</label
          >
          <input
            v-model="bulkEditForm.hours_worked"
            type="text"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="6.5"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700"
            >Stawka/h</label
          >
          <input
            v-model="bulkEditForm.hourly_rate"
            type="text"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            placeholder="43.6"
            required
          />
        </div>
        <div class="col-span-2 flex items-end">
          <button
            type="submit"
            class="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Aktualizuj dni
          </button>
        </div>
      </form>
    </div>

    <!-- Statistics -->
    <div
      v-if="apiCalendaryStore.collection.statistics"
      class="mb-6 grid grid-cols-3 gap-4"
    >
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Przepracowane godziny</p>
        <p class="text-xl font-bold">
          {{ apiCalendaryStore.collection.statistics.total_hours_worked }}h
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Norma godzin</p>
        <p class="text-xl font-bold">
          {{ apiCalendaryStore.collection.statistics.total_norm_hours }}h
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Zarobek</p>
        <p class="text-xl font-bold">
          {{ apiCalendaryStore.collection.statistics.total_salary.toFixed(2) }}
          zł
        </p>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="rounded-lg bg-white p-6 shadow">
      <!-- Days Header -->
      <div class="mb-4 grid grid-cols-7 gap-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-center font-semibold text-gray-700"
        >
          {{ day }}
        </div>
      </div>

      <!-- Days -->
      <div class="grid grid-cols-7 gap-2">
        <div
          v-for="day in apiCalendaryStore.collection.days"
          :key="day.id"
          @click="openDayModal(day)"
          class="min-h-[120px] cursor-pointer rounded border p-3 hover:border-blue-500"
          :class="{
            'bg-gray-50': isWeekend(day.day_name),
            'border-yellow-300 bg-yellow-50': day.is_holiday,
            'border-l-4 border-green-500': day.hours_worked > 0,
          }"
        >
          <div class="mb-2 flex justify-between">
            <span class="font-bold">{{ day.day_number }}</span>
            <span class="text-xs text-gray-500">{{ day.day_name }}</span>
          </div>

          <div class="space-y-1">
            <div v-if="day.norm_hours > 0" class="text-xs">
              ⏱️ {{ day.hours_worked }}h / {{ day.norm_hours }}h
            </div>

            <div
              v-if="day.daily_salary > 0"
              class="text-xs font-semibold text-green-600"
            >
              💰 {{ day.daily_salary.toFixed(2) }} zł
            </div>

            <div v-if="day.is_holiday" class="text-xs text-yellow-700">
              🎉 Święto
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Stats -->
    <div
      v-if="apiCalendaryStore.collection.statistics"
      class="mt-6 rounded-lg bg-white p-6 shadow"
    >
      <h3 class="mb-4 text-xl font-bold">Statystyki tygodniowe</h3>
      <div class="grid grid-cols-5 gap-4">
        <div
          v-for="week in apiCalendaryStore.collection.statistics.weeks"
          :key="week.week_number"
          class="rounded border p-4"
        >
          <p class="mb-2 font-semibold">Tydzień {{ week.week_number }}</p>
          <p class="text-sm">
            Godziny: {{ week.total_hours }}h / {{ week.total_norm_hours }}h
          </p>
          <p class="text-sm font-semibold text-green-600">
            {{ week.salary.toFixed(2) }} zł
          </p>
        </div>
      </div>
    </div>

    <!-- Edit Day Modal -->
    <div
      v-if="showDayModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      @click.self="closeDayModal"
    >
      <div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-xl font-bold">
            Edycja dnia {{ selectedDay?.day_number }}
            {{ selectedDay?.day_name }}
          </h3>
          <button
            @click="closeDayModal"
            class="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="updateSingleDay" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Norma godzin
            </label>
            <input
              v-model="dayEditForm.norm_hours"
              type="text"
              class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="6.5"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Przepracowane godziny
            </label>
            <input
              v-model="dayEditForm.hours_worked"
              type="text"
              class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="6.5"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Stawka godzinowa
            </label>
            <input
              v-model="dayEditForm.hourly_rate"
              type="text"
              class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
              placeholder="43.6"
              required
            />
          </div>

          <div class="flex gap-2">
            <button
              type="button"
              @click="closeDayModal"
              class="flex-1 rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
            >
              Anuluj
            </button>
            <button
              type="submit"
              class="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Zapisz
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
import { ApiCalendaryStore } from "@/stores/calendary/apiCalendary";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";
import { ApiCalendaryDayStore } from "@/stores/calendary/day/apiCalendaryDay";

// types
import type { OneCalendaryDay } from "@/types/api/calendar/types";

export default defineComponent({
  setup() {
    const apiCalendaryDayStore = ApiCalendaryDayStore();
    const apiCalendaryStore = ApiCalendaryStore();
    const loadingSpinnerStore = LoadingSpinnerStore();

    const weekDays = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

    // Single day edit
    const showDayModal = ref(false);
    const selectedDay = ref<OneCalendaryDay | null>(null);
    const dayEditForm = ref({
      norm_hours: "",
      hours_worked: "",
      hourly_rate: "",
    });

    // Bulk edit
    const bulkEditForm = ref({
      start_day: "",
      end_day: "",
      norm_hours: "",
      hours_worked: "",
      hourly_rate: "",
    });

    const bulkSalaryFormEdit = ref({
      salary: "",
    });

    const isWeekend = (dayName: string): boolean => {
      return dayName === "sobota" || dayName === "niedziela";
    };

    const fetchMonth = async (year: number, month: number) => {
      loadingSpinnerStore.isLoading = true;
      await apiCalendaryStore.fetchCallendaryCollection(year, month);
      loadingSpinnerStore.isLoading = false;
    };

    const previousMonth = () => {
      const currentMonth =
        apiCalendaryStore.collection.month || new Date().getMonth() + 1;
      const currentYear =
        apiCalendaryStore.collection.year || new Date().getFullYear();

      let newMonth = currentMonth - 1;
      let newYear = currentYear;

      if (newMonth < 1) {
        newMonth = 12;
        newYear--;
      }

      fetchMonth(newYear, newMonth);
    };

    const nextMonth = () => {
      const currentMonth =
        apiCalendaryStore.collection.month || new Date().getMonth() + 1;
      const currentYear =
        apiCalendaryStore.collection.year || new Date().getFullYear();

      let newMonth = currentMonth + 1;
      let newYear = currentYear;

      if (newMonth > 12) {
        newMonth = 1;
        newYear++;
      }

      fetchMonth(newYear, newMonth);
    };

    const openDayModal = (day: OneCalendaryDay) => {
      selectedDay.value = day;
      dayEditForm.value = {
        norm_hours: day.norm_hours.toString(),
        hours_worked: day.hours_worked.toString(),
        hourly_rate: day.hourly_rate.toString(),
      };
      showDayModal.value = true;
    };

    const closeDayModal = () => {
      showDayModal.value = false;
      selectedDay.value = null;
    };

    const updateSingleDay = async () => {
      if (!selectedDay.value) return;

      await apiCalendaryDayStore.updateCalendaryDayById(
        selectedDay.value.id,
        dayEditForm.value,
      );

      closeDayModal();

      // Refresh calendar
      const year =
        apiCalendaryStore.collection.year || new Date().getFullYear();
      const month =
        apiCalendaryStore.collection.month || new Date().getMonth() + 1;
      await fetchMonth(year, month);
    };

    const updateManyDays = async () => {
      const year =
        apiCalendaryStore.collection.year || new Date().getFullYear();
      const month =
        apiCalendaryStore.collection.month || new Date().getMonth() + 1;

      await apiCalendaryDayStore.updateCalendaryDaysMany({
        year: year.toString(),
        month: month.toString(),
        ...bulkEditForm.value,
      });

      // Clear form
      bulkEditForm.value = {
        start_day: "",
        end_day: "",
        norm_hours: "",
        hours_worked: "",
        hourly_rate: "",
      };

      // Refresh calendar
      await fetchMonth(year, month);
    };

    const handlerUpdateManyDaysSalery = async () => {
      const year =
        apiCalendaryStore.collection.year || new Date().getFullYear();
      const month =
        apiCalendaryStore.collection.month || new Date().getMonth() + 1;

      await apiCalendaryDayStore.updateCalendaryDaysManySalary({
        year: year.toString(),
        month: month.toString(),
        ...bulkSalaryFormEdit.value,
      });

      bulkSalaryFormEdit.value = {
        salary: "",
      };

      await fetchMonth(year, month);
    };

    onMounted(async () => {
      const now = new Date();
      const year: number = now.getFullYear();
      const month: number = now.getMonth() + 1;
      await fetchMonth(year, month);
    });

    return {
      apiCalendaryStore,
      weekDays,
      showDayModal,
      selectedDay,
      dayEditForm,
      bulkEditForm,
      bulkSalaryFormEdit,
      isWeekend,
      previousMonth,
      nextMonth,
      openDayModal,
      closeDayModal,
      updateSingleDay,
      updateManyDays,
      handlerUpdateManyDaysSalery,
    };
  },
});
</script>
