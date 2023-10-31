<template>
  <div class="relative w-full rounded-3xl bg-color-bg-dark p-3 xl:w-3/6">
    <img
      src="../../images/dystrybutor.png"
      alt="image_distributor"
      class="absolute right-[-5.5rem] top-[-0.1rem] -z-0 hidden h-5/6 xl:block"
    />
    <div
      class="to-#121D35 flex w-full flex-col items-center gap-3 rounded-3xl bg-gradient-to-b from-yellow-600 from-10% to-90% p-2"
    >
      <h1 class="py-4 font-syne text-xl font-bold sm:text-3xl">
        Koszt Przjechania Trasy
      </h1>
      <form class="flex w-full flex-col gap-9">
        <input-fuel
          type_input="number"
          name_label="Średnia spalania"
          type="combustion"
          @update-number="update_number"
        ></input-fuel>
        <input-fuel
          type_input="number"
          name_label="Cena paliwa"
          type="fuel"
          @update-number="update_number"
        ></input-fuel>
        <input-fuel
          type_input="number"
          name_label="Długość trasy"
          type="way"
          @update-number="update_number"
        ></input-fuel>
        <input-fuel
          type_input="number"
          name_label="Dodatkowy koszt"
          type="remaining_values"
          @update-number="update_number"
        ></input-fuel>
        <button-fuel @click.prevent="submit"></button-fuel>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

//commponets
import InputFuelVue from "./InputFuel.vue";
import ButtonFuelVue from "./ButtonFuel.vue";

export default defineComponent({
  emits: ["calculator-values"],
  components: {
    "input-fuel": InputFuelVue,
    "button-fuel": ButtonFuelVue,
  },
  setup(_, ctx) {
    //values
    const input_values = reactive<{
      way: number;
      fuel: number;
      combustion: number;
      remaining_values: number;
    }>({
      way: 0,
      fuel: 0,
      combustion: 0,
      remaining_values: 0,
    });

    //functions
    const update_number = (val: { type: string; number: number }) => {
      input_values[`${val.type}`] = val.number;
    };

    const submit = () => {
      ctx.emit("calculator-values", input_values);
    };
    return { input_values, update_number, submit };
  },
});
</script>

<style scoped></style>
