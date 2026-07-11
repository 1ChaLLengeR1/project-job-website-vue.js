<template>
  <div class="flex w-full flex-col gap-4">
    <h3 class="font-syne text-2xl text-color-yellow">
      {{ t("pages.rentals.billing.calculation.title") }}
    </h3>

    <p v-if="!calculation" class="text-color-grey">
      {{ t("pages.rentals.billing.calculation.empty") }}
    </p>

    <template v-else>
      <!-- podsumowanie prądu -->
      <div class="flex flex-wrap gap-4">
        <span class="rounded-md bg-color-bg px-3 py-2 text-color-grey">
          {{
            t("pages.rentals.billing.calculation.electricityRate", {
              rate: calculation.electricity_rate,
            })
          }}
        </span>
        <span class="rounded-md bg-color-bg px-3 py-2 text-color-grey">
          {{
            t("pages.rentals.billing.calculation.electricityTotal", {
              total: round(calculation.electricity_total_consumption),
            })
          }}
        </span>
      </div>

      <!-- ostrzeżenia z backendu -->
      <div
          v-if="calculation.warnings.length > 0"
          class="flex flex-col gap-1 rounded-lg border border-yellow-600 p-3"
      >
        <h4 class="font-bold text-color-yellow">
          {{ t("pages.rentals.billing.calculation.warnings") }}
        </h4>
        <ul class="list-inside list-disc text-sm text-color-grey">
          <li v-for="(warning, index) in calculation.warnings" :key="index">
            {{ warning }}
          </li>
        </ul>
      </div>

      <!-- błąd licznika głównego -->
      <div
          v-if="calculation.main_meter_error"
          class="flex flex-col gap-2 rounded-lg bg-color-bg p-3"
      >
        <h4 class="font-syne text-xl text-color-yellow">
          {{ t("pages.rentals.billing.calculation.mainMeterError.title") }}
        </h4>
        <div class="flex flex-wrap gap-4 text-sm text-color-grey">
          <span>
            {{
              t(
                  "pages.rentals.billing.calculation.mainMeterError.mainDifference",
              )
            }}:
            <b>{{ round(calculation.main_meter_error.main_difference) }}</b>
          </span>
          <span>
            {{
              t(
                  "pages.rentals.billing.calculation.mainMeterError.apartmentsTotal",
              )
            }}:
            <b>{{ round(calculation.main_meter_error.apartments_total) }}</b>
          </span>
          <span>
            {{ t("pages.rentals.billing.calculation.mainMeterError.error") }}:
            <b class="text-color-yellow">{{
                round(calculation.main_meter_error.error)
              }}</b>
          </span>
        </div>
        <div
            v-if="calculation.main_meter_error.proposals.length > 0"
            class="flex flex-col gap-1"
        >
          <span class="text-sm font-bold text-color-grey">
            {{
              t("pages.rentals.billing.calculation.mainMeterError.proposals")
            }}
          </span>
          <ul class="list-inside list-disc text-sm text-color-grey">
            <li
                v-for="proposal in calculation.main_meter_error.proposals"
                :key="proposal.meter_id"
            >
              {{ meterLabel(proposal.meter_id) }}:
              <b>{{ round(proposal.proposed_correction) }}</b>
            </li>
          </ul>
        </div>
      </div>


      <!-- zużycia liczników -->
      <div class="w-full overflow-x-auto">
        <DataTable
            :value="calculation.consumptions"
            showGridlines
            :header="t('pages.rentals.billing.calculation.consumptions.title')"
        >
          <Column
              :header="
              t('pages.rentals.billing.calculation.consumptions.columns.meter')
            "
          >
            <template #body="slotProps">
              <span class="text-color-yellow">{{
                  meterLabel(slotProps.data.meter_id)
                }}</span>
            </template>
          </Column>
          <Column
              :header="
              t(
                'pages.rentals.billing.calculation.consumptions.columns.mediaType',
              )
            "
          >
            <template #body="slotProps">
              <span>{{
                  t(
                      `pages.rentals.dictionaries.meters.mediaType.${slotProps.data.media_type}`,
                  )
                }}</span>
            </template>
          </Column>
          <Column
              :header="
              t(
                'pages.rentals.billing.calculation.consumptions.columns.rawDifference',
              )
            "
          >
            <template #body="slotProps">
              <span>{{ round(slotProps.data.raw_difference) }}</span>
            </template>
          </Column>
          <Column
              :header="
              t(
                'pages.rentals.billing.calculation.consumptions.columns.errorCorrection',
              )
            "
          >
            <template #body="slotProps">
              <span>{{ round(slotProps.data.error_correction) }}</span>
            </template>
          </Column>
          <Column
              :header="
              t(
                'pages.rentals.billing.calculation.consumptions.columns.consumption',
              )
            "
          >
            <template #body="slotProps">
              <span class="font-bold">{{
                  round(slotProps.data.consumption)
                }}</span>
            </template>
          </Column>
        </DataTable>
      </div>

      <!-- rozliczenia mieszkań -->
      <h4 class="font-syne text-xl text-color-yellow">
        {{ t("pages.rentals.billing.calculation.settlements.title") }}
      </h4>
      <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
        <div
            v-for="entry in calculation.settlements"
            :key="entry.apartment_id"
            class="flex flex-col gap-2 rounded-lg bg-color-bg p-3"
        >
          <div class="flex items-center justify-between">
            <span class="font-syne text-lg text-color-yellow">
              {{ entry.apartment_name }}
            </span>
            <span class="font-bold text-white">
              {{ t("pages.rentals.billing.calculation.settlements.total") }}:
              {{ round(entry.settlement.total_amount) }} zł
            </span>
          </div>
          <div class="flex flex-wrap gap-3 text-sm text-color-grey">
            <span>
              {{ t("pages.rentals.billing.calculation.settlements.rent") }}:
              <b>{{ round(entry.settlement.rent_amount) }} zł</b>
            </span>
            <span>
              {{
                t("pages.rentals.billing.calculation.settlements.electricity")
              }}:
              <b>
                {{ round(entry.settlement.electricity_consumption) }} kWh /
                {{ round(entry.settlement.electricity_cost) }} zł
              </b>
            </span>
            <span>
              {{ t("pages.rentals.billing.calculation.settlements.water") }}:
              <b>
                {{ round(entry.settlement.water_consumption) }} m³ /
                {{ round(entry.settlement.water_cost) }} zł
              </b>
            </span>
            <span>
              {{ t("pages.rentals.billing.calculation.settlements.media") }}:
              <b>{{ round(entry.settlement.total_media_amount) }} zł</b>
            </span>
          </div>
          <div
              v-if="entry.settlement.items.length > 0"
              class="flex flex-col gap-1"
          >
            <span class="text-sm font-bold text-color-grey">
              {{ t("pages.rentals.billing.calculation.settlements.items") }}
            </span>
            <ul class="flex flex-col gap-1 text-sm text-color-grey">
              <li
                  v-for="(item, index) in entry.settlement.items"
                  :key="index"
                  class="flex justify-between"
              >
                <span>{{ item.name }}</span>
                <span>{{ round(item.amount) }} zł</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- podział rodzinny -->
      <template v-if="calculation.beneficiaries.length > 0">
        <h4 class="font-syne text-xl text-color-yellow">
          {{ t("pages.rentals.billing.calculation.beneficiaries.title") }}
        </h4>
        <div class="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div
              v-for="beneficiary in calculation.beneficiaries"
              :key="beneficiary.beneficiary_id"
              class="flex flex-col gap-2 rounded-lg bg-color-bg p-3"
          >
            <div class="flex items-center justify-between">
              <span class="font-syne text-lg text-color-yellow">
                {{ beneficiary.beneficiary_name }}
              </span>
              <span class="font-bold text-white">
                {{
                  t("pages.rentals.billing.calculation.beneficiaries.total")
                }}: {{ round(beneficiary.total_amount) }} zł
              </span>
            </div>
            <ul class="flex flex-col gap-1 text-sm text-color-grey">
              <li
                  v-for="(item, index) in beneficiary.items"
                  :key="index"
                  class="flex justify-between"
              >
                <span>{{ item.description }}</span>
                <span>{{ round(item.amount) }} zł</span>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import type {PropType} from "vue";
import {useI18n} from "vue-i18n";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";

// types
import type {PeriodCalculation} from "@/types/api/rentals/periods/types";
import type {Meter} from "@/types/api/rentals/meters/types";
import type {Apartment} from "@/types/api/rentals/apartments/types";

export default defineComponent({
  name: "CalculationView",
  components: {DataTable, Column},
  props: {
    calculation: {
      required: false,
      type: Object as PropType<PeriodCalculation | null>,
      default: null,
    },
    meters: {
      required: true,
      type: Array as PropType<Meter[]>,
    },
    apartments: {
      required: true,
      type: Array as PropType<Apartment[]>,
    },
  },
  setup(props) {
    const {t} = useI18n();

    const meterLabel = (meterId: string): string => {
      const meter = props.meters.find((item) => item.id === meterId);
      if (!meter) {
        return meterId;
      }
      const apartment = props.apartments.find(
          (item) => item.id === meter.apartment_id,
      );
      const place = apartment
          ? apartment.name
          : t("pages.rentals.dictionaries.meters.mainMeter");
      const media = t(
          `pages.rentals.dictionaries.meters.mediaType.${meter.media_type}`,
      );
      return `${meter.name ?? media} — ${place}`;
    };

    const round = (value: number): string => value.toFixed(2);

    return {t, meterLabel, round};
  },
});
</script>

<style scoped></style>
