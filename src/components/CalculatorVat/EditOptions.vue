<template>
  <div
    class="absolute left-0 top-1 flex w-full flex-col gap-3 rounded-b-3xl rounded-t-3xl bg-color-yellow p-1"
  >
    <div class="flex w-full justify-end px-2 py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="50px"
        viewBox="0 0 384 512"
        class="cursor-pointer"
        @click="close_edit_panel"
      >
        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
        />
      </svg>
    </div>
    <div class="flex w-full flex-wrap justify-center gap-3">
      <edit-input
        name="vat"
        :number="keys_calculator.vat"
        type="vat"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="podatek dochodwy"
        :number="keys_calculator.income_tax"
        type="income_tax"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="paczkomat"
        :number="keys_calculator.inpost_parcel_locker"
        type="inpost_parcel_locker"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="kurier"
        :number="keys_calculator.inpost_courier"
        type="inpost_courier"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="dpd"
        :number="keys_calculator.dpd"
        type="dpd"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="allegro matt"
        :number="keys_calculator.allegro_matt"
        type="allegro_matt"
        @update:number="update_number"
      ></edit-input>
      <edit-input
        name="bez samrta"
        :number="keys_calculator.without_smart"
        type="without_smart"
        @update:number="update_number"
      ></edit-input>
    </div>
    <div class="w-full">
      <button
        class="w-full rounded-b-3xl bg-color-bg p-3 text-lg text-white"
        @click.prevent="submit"
      >
        Zapisz
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { fetchData } from "../JS/fetchData";
import { useStore } from "vuex";
import ConfigVue from "../JS/ConfigVue";

//componets
import InputEdit from "./InputEdit.vue";

export default defineComponent({
  emits: ["close-edit-panel", "response-message"],
  components: {
    "edit-input": InputEdit,
  },
  setup(_, ctx) {
    //values
    const config_vue = ref<{ url_server: string }>(ConfigVue);
    const store = useStore();
    const keys_calculator = reactive({
      id: "",
      income_tax: 0,
      inpost_courier: 0,
      vat: 0,
      dpd: 0,
      without_smart: 0,
      inpost_parcel_locker: 0,
      inpost_cash_of_delivery_courier: 0,
      allegro_matt: 0,
    });

    //functions

    const load_keys_calculator = async () => {
      const url = `${config_vue.value.url_server}/routes/patryk_routers/calculator_work/calculator_earning/keys_calculator_values`;

      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetchData(url, method, headers, null, null);
      if (response.error) {
        ctx.emit("response-message", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }

      keys_calculator.income_tax = response.income_tax;
      keys_calculator.inpost_courier = response.inpost_courier;
      keys_calculator.vat = response.vat;
      keys_calculator.dpd = response.dpd;
      keys_calculator.without_smart = response.without_smart;
      keys_calculator.inpost_parcel_locker = response.inpost_parcel_locker;
      keys_calculator.id = response.id;
      keys_calculator.inpost_cash_of_delivery_courier =
        response.inpost_cash_of_delivery_courier;
      keys_calculator.allegro_matt = response.allegro_matt;
    };
    load_keys_calculator();

    const submit = async () => {
      const url = `${config_vue.value.url_server}/routes/patryk_routers/calculator_work/calculator_earning/keys_calculator_edit`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: keys_calculator.id,
        income_tax: keys_calculator.income_tax,
        vat: keys_calculator.vat,
        inpost_parcel_locker: keys_calculator.inpost_parcel_locker,
        inpost_courier: keys_calculator.inpost_courier,
        inpost_cash_of_delivery_courier:
          keys_calculator.inpost_cash_of_delivery_courier,
        dpd: keys_calculator.dpd,
        allegro_matt: keys_calculator.allegro_matt,
        without_smart: keys_calculator.without_smart,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        ctx.emit("response-message", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }
      ctx.emit("response-message", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      load_keys_calculator();
    };

    const update_number = (val: { number: number; type: string }) => {
      keys_calculator[`${val.type}`] = val.number;
    };

    const close_edit_panel = () => {
      ctx.emit("close-edit-panel", false);
    };
    return {
      close_edit_panel,
      keys_calculator,
      submit,
      update_number,
    };
  },
});
</script>

<style scoped></style>
