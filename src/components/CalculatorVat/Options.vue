<template>
  <div class="w-96 sm:w-[70rem] bg-color-bg-dark rounded-3xl p-2 flex">
    <div class="w-full flex flex-col justify-between gap-3">
      <div
        class="w-full flex justify-end bg-color-yellow py-5 px-2 rounded-t-3xl relative"
      >
        <ellipsis-svg @open-edit-panel="open_panel"></ellipsis-svg>
        <edit-options
          @close-edit-panel="open_panel"
          @response-message="response_message"
          v-if="panel_edit"
        ></edit-options>
      </div>
      <div class="w-full flex flex-wrap sm:flex-nowrap gap-3">
        <input
          type="number"
          placeholder="Cena sprzedaży (zł)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
          v-model="input_values.gross_sales"
        />
        <input
          type="number"
          placeholder="Cena zakupu (zł)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
          v-model="input_values.gross_purchase"
        />
        <input
          type="number"
          placeholder="Prowizja (%)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
          v-model="input_values.provision"
        />
        <input
          type="number"
          placeholder="Wyróżnienie (%)"
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
          v-model="input_values.distinction"
        />
      </div>
      <div class="w-full">
        <select
          class="w-full p-4 outline-none bg-color-bg placeholder-white text-color-grey"
          v-model="input_values.referrer"
        >
          <option
            v-for="(item, index) in select_value"
            :key="index"
            :value="item.value"
          >
            {{ item.text }}
          </option>
        </select>
      </div>
      <div class="w-full">
        <button
          class="w-full py-3 bg-color-yellow rounded-b-3xl text-3xl font-bold me-auto"
          @click="submit"
        >
          Oblicz
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
//componets
import EllipsisSvgVue from "../CalculatorVat/EllipsisSvg.vue";
import EditOptionsVue from "./EditOptions.vue";

export default defineComponent({
  emits: ["calculator-options", "response-message"],
  components: {
    "ellipsis-svg": EllipsisSvgVue,
    "edit-options": EditOptionsVue,
  },
  setup(_, ctx) {
    //values
    const input_values = reactive<{
      gross_sales: number;
      gross_purchase: number;
      provision: number;
      distinction: number;
      referrer: string;
    }>({
      gross_sales: null,
      gross_purchase: null,
      provision: null,
      distinction: null,
      referrer: "nothing",
    });

    const panel_edit = ref<boolean>(false);

    const select_value = ref<{ text: string; value: string }[]>([
      { text: "Wybierz", value: "nothing" },
      { text: "Inpost-Paczkomat", value: "inpost_parcel_locker" },
      {
        text: "Inpost-Kurier",
        value: "inpost_courier",
      },
      {
        text: "Inpost-Kurier-Pobranie",
        value: "inpost_cash_of_delivery_courier",
      },
      {
        text: "DPD",
        value: "dpd",
      },
      {
        text: "Allegro-Matt",
        value: "allegro_matt",
      },
      {
        text: "Bez-Smarta",
        value: "without_smart",
      },
    ]);

    //functions
    const open_panel = (val: boolean) => {
      panel_edit.value = val;
    };

    const response_message = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      ctx.emit("response-message", val);
    };

    const submit = () => {
      const obj = {
        referrer: input_values.referrer,
        gross_sales: input_values.gross_sales,
        gross_purchase: input_values.gross_purchase,
        provision: input_values.provision,
        distinction: input_values.distinction,
      };

      if (obj.gross_sales === null) {
        obj.gross_sales = 0;
      }

      if (obj.gross_purchase === null) {
        obj.gross_purchase = 0;
      }

      if (obj.provision === null) {
        obj.provision = 0;
      }

      if (obj.distinction === null) {
        obj.distinction = 0;
      }

      ctx.emit("calculator-options", obj);
    };
    return {
      input_values,
      select_value,
      panel_edit,
      submit,
      open_panel,
      response_message,
    };
  },
});
</script>

<style scoped></style>
