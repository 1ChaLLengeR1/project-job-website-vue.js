<template>
  <div class="mx-auto max-w-7xl p-4">
    <div class="mb-6 rounded-lg bg-white p-6 shadow">
      <form @submit.prevent="hanlderCreateCalendary" class="space-y-4">
        <div class="flex items-end gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700"
              >Podaj Rok</label
            >
            <input
              v-model="calendarCreateYear"
              type="number"
              class="mt-1 w-fit rounded border border-gray-300 px-3 py-2"
              placeholder="2000"
              required
            />
          </div>

          <button
            type="submit"
            class="h-fit w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto sm:px-6"
          >
            Stwórz Kalendarz
          </button>
        </div>
      </form>
    </div>

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

    <div class="mb-6 rounded-lg bg-white p-4 shadow sm:p-6">
      <h3 class="mb-4 text-base font-bold sm:text-lg">
        Edycja wielu dni po wypłacie
      </h3>
      <form
        @submit.prevent="handlerUpdateManyDaysSalery"
        class="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-4"
      >
        <div class="flex-1 sm:max-w-xs">
          <label class="block text-sm font-medium text-gray-700">Wypłata</label>
          <input
            v-model="bulkSalaryFormEdit.salary"
            type="number"
            min="1"
            class="mt-1 w-full rounded border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div class="w-full sm:w-auto sm:max-w-md sm:flex-1">
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
    <div class="mb-6 rounded-lg bg-white p-4 shadow sm:p-6">
      <h3 class="mb-4 text-base font-bold sm:text-lg">Edycja wielu dni</h3>
      <form @submit.prevent="updateManyDays" class="space-y-4">
        <!-- Zakres dni -->
        <div class="grid grid-cols-2 gap-3 sm:gap-4">
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
        </div>

        <!-- Godziny i stawka -->
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
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
        </div>

        <!-- Przycisk -->
        <div class="pt-2">
          <button
            type="submit"
            class="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto sm:px-6"
          >
            Aktualizuj dni
          </button>
        </div>
      </form>
    </div>

    <!-- Statistics -->
    <div
      v-if="apiCalendaryStore.collection.statistics"
      class="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
    >
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Przepracowane godziny</p>
        <p class="text-2xl font-bold sm:text-xl">
          {{ apiCalendaryStore.collection.statistics.total_hours_worked }}h
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Norma godzin</p>
        <p class="text-2xl font-bold sm:text-xl">
          {{ apiCalendaryStore.collection.statistics.total_norm_hours }}h
        </p>
      </div>
      <div class="rounded-lg bg-white p-4 shadow">
        <p class="text-sm text-gray-600">Zarobek</p>
        <p class="text-2xl font-bold sm:text-xl">
          {{ apiCalendaryStore.collection.statistics.total_salary.toFixed(2) }}
          zł
        </p>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="rounded-lg bg-white p-3 shadow sm:p-6">
      <!-- Days Header -->
      <div class="mb-2 grid grid-cols-7 gap-1 sm:mb-4 sm:gap-2">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-center text-xs font-semibold text-gray-700 sm:text-sm"
        >
          <!-- Pełna nazwa na desktop, skrót na mobile -->
          <span class="hidden sm:inline">{{ day }}</span>
          <span class="sm:hidden">{{ day.substring(0, 3) }}</span>
        </div>
      </div>
      <!-- Days -->
      <div class="grid grid-cols-7 gap-1 sm:gap-2">
        <div
          v-for="day in apiCalendaryStore.collection.days"
          :key="day.id"
          @click="openDayModal(day)"
          class="min-h-[80px] cursor-pointer rounded border p-1.5 hover:border-blue-500 sm:min-h-[120px] sm:p-3"
          :class="{
            'bg-gray-50': isWeekend(day.day_name),
            'border-yellow-300 bg-yellow-50': day.is_holiday,
            'border-l-4 border-green-500': day.hours_worked > 0,
          }"
        >
          <div class="mb-1 flex justify-between sm:mb-2">
            <span class="text-sm font-bold sm:text-base">{{
              day.day_number
            }}</span>
            <span class="hidden text-xs text-gray-500 sm:inline">{{
              day.day_name
            }}</span>
          </div>
          <div class="space-y-0.5 sm:space-y-1">
            <div v-if="day.norm_hours > 0" class="text-[10px] sm:text-xs">
              <span class="hidden sm:inline">⏱️ </span
              >{{ day.hours_worked }}h<span class="hidden sm:inline">
                / {{ day.norm_hours }}h</span
              >
            </div>
            <div
              v-if="day.daily_salary > 0"
              class="text-[10px] font-semibold text-green-600 sm:text-xs"
            >
              <span class="hidden sm:inline">💰 </span
              >{{ day.daily_salary.toFixed(2)
              }}<span class="hidden sm:inline"> zł</span>
            </div>
            <div
              v-if="day.is_holiday"
              class="text-[10px] text-yellow-700 sm:text-xs"
            >
              🎉<span class="hidden sm:inline"> Święto</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Weekly Stats -->
    <div
      v-if="apiCalendaryStore.collection.statistics"
      class="mt-6 rounded-lg bg-white p-4 shadow sm:p-6"
    >
      <h3 class="mb-4 text-lg font-bold sm:text-xl">Statystyki tygodniowe</h3>
      <div
        class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        <div
          v-for="week in apiCalendaryStore.collection.statistics.weeks"
          :key="week.week_number"
          class="rounded border p-3 sm:p-4"
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

    <!-- Annual Stats -->
    <div class="mt-6 rounded-lg bg-white p-6 shadow">
      <h3 class="mb-4 text-xl font-bold">
        Statystyki roczne {{ apiCalendaryStore.statistics.year }}
      </h3>

      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <!-- Przepracowane godziny -->
        <div
          class="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Przepracowane godziny</p>
          <p class="text-2xl font-bold text-blue-600">
            {{ apiCalendaryStore.statistics.total_hours_worked }}h
          </p>
          <p class="text-xs text-gray-500">
            z {{ apiCalendaryStore.statistics.total_norm_hours }}h normy
          </p>
        </div>

        <!-- Różnica godzin -->
        <div
          v-if="apiCalendaryStore.statistics.hours_difference"
          class="rounded-lg border p-4"
          :class="
            apiCalendaryStore.statistics.hours_difference >= 0
              ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
              : 'border-red-200 bg-gradient-to-br from-red-50 to-white'
          "
        >
          <p class="mb-1 text-sm text-gray-600">Różnica godzin</p>
          <p
            class="text-2xl font-bold"
            :class="
              apiCalendaryStore.statistics.hours_difference >= 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            {{ apiCalendaryStore.statistics.hours_difference > 0 ? "+" : "" }}
            {{ apiCalendaryStore.statistics.hours_difference }}h
          </p>
          <p class="text-xs text-gray-500">
            {{
              apiCalendaryStore.statistics.hours_difference >= 0
                ? "nadgodziny"
                : "niedobór"
            }}
          </p>
        </div>

        <!-- Całkowite zarobki -->
        <div
          class="rounded-lg border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Całkowite zarobki</p>
          <p class="text-2xl font-bold text-emerald-600">
            {{ apiCalendaryStore.statistics.total_earnings?.toFixed(2) }}
            zł
          </p>
          <p class="text-xs text-gray-500">za cały rok</p>
        </div>

        <!-- Średnie zarobki dzienne -->
        <div
          class="rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Średnie zarobki dzienne</p>
          <p class="text-2xl font-bold text-purple-600">
            {{
              apiCalendaryStore.statistics.average_daily_earnings?.toFixed(2)
            }}
            zł
          </p>
          <p class="text-xs text-gray-500">za dzień roboczy</p>
        </div>

        <!-- Dni robocze -->
        <div
          class="rounded-lg border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Dni robocze</p>
          <p class="text-2xl font-bold text-gray-700">
            {{ apiCalendaryStore.statistics.working_days_count }}
          </p>
          <p class="text-xs text-gray-500">
            z
            {{ apiCalendaryStore.statistics.total_days_in_year }} dni w roku
          </p>
        </div>

        <!-- Święta -->
        <div
          class="rounded-lg border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Dni świąteczne</p>
          <p class="text-2xl font-bold text-orange-600">
            {{ apiCalendaryStore.statistics.total_holidays }}
          </p>
          <p class="text-xs text-gray-500">wolne od pracy</p>
        </div>

        <!-- Średnia godzin dziennie -->
        <div
          class="rounded-lg border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-4"
        >
          <p class="mb-1 text-sm text-gray-600">Średnia godzin dziennie</p>
          <p class="text-2xl font-bold text-indigo-600">
            {{
              apiCalendaryStore.statistics.average_hours_per_working_day?.toFixed(
                2,
              )
            }}h
          </p>
          <p class="text-xs text-gray-500">na dzień roboczy</p>
        </div>

        <!-- Efektywność pracy -->
        <div
          v-if="apiCalendaryStore.statistics.work_efficiency_percentage"
          class="rounded-lg border p-4"
          :class="
            apiCalendaryStore.statistics.work_efficiency_percentage >= 100
              ? 'border-green-200 bg-gradient-to-br from-green-50 to-white'
              : 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-white'
          "
        >
          <p class="mb-1 text-sm text-gray-600">Efektywność pracy</p>
          <p
            v-if="apiCalendaryStore.statistics.work_efficiency_percentage"
            class="text-2xl font-bold"
            :class="
              apiCalendaryStore.statistics.work_efficiency_percentage >= 100
                ? 'text-green-600'
                : 'text-yellow-600'
            "
          >
            {{
              apiCalendaryStore.statistics.work_efficiency_percentage?.toFixed(
                1,
              )
            }}%
          </p>
          <p class="text-xs text-gray-500">
            {{
              apiCalendaryStore.statistics.work_efficiency_percentage >= 100
                ? "powyżej normy"
                : "poniżej normy"
            }}
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

    const calendarCreateYear = ref<number | null>(null);

    const hanlderCreateCalendary = async () => {
      if (calendarCreateYear.value === null) {
        return;
      }
      const body = {
        year: parseInt(calendarCreateYear.value.toString()),
      };
      await apiCalendaryStore.postCalendaryCreated(body);
      calendarCreateYear.value = null;
    };

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
      await apiCalendaryStore.fetchCallendaryCollectionStatistics(year);
    });

    return {
      apiCalendaryStore,
      weekDays,
      showDayModal,
      selectedDay,
      dayEditForm,
      bulkEditForm,
      bulkSalaryFormEdit,
      calendarCreateYear,
      isWeekend,
      previousMonth,
      nextMonth,
      openDayModal,
      closeDayModal,
      updateSingleDay,
      updateManyDays,
      handlerUpdateManyDaysSalery,
      hanlderCreateCalendary,
    };
  },
});
</script>
