<template>
  <div class="w-full bg-color-bg">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 xl:flex-row">
        <div class="flex w-full items-center gap-1">
          <the-paragraf name="Prąd"></the-paragraf>
          <base-input
            id="electric_current"
            type="number"
            :value="load_basic_values.electric_current || 0"
            placeholder="prąd"
            :rounded_class="false"
            @base-input="base_input"
          ></base-input>
        </div>
        <div class="flex w-full items-center gap-1">
          <the-paragraf name="Woda"></the-paragraf>
          <base-input
            id="water"
            type="number"
            placeholder="woda"
            :value="load_basic_values.water || 0"
            :rounded_class="false"
            @base-input="base_input"
          ></base-input>
        </div>
      </div>
      <div class="flex w-full flex-col gap-3 xl:flex-row">
        <div class="flex w-full items-center gap-1">
          <the-paragraf name="Przesył"></the-paragraf>
          <base-input
            id="transfer"
            type="number"
            placeholder="przesył"
            :value="load_basic_values.transfer || 0"
            :rounded_class="false"
            @base-input="base_input"
          ></base-input>
        </div>
        <div class="flex w-full items-center gap-1">
          <the-paragraf name="Śmieci"></the-paragraf>
          <base-input
            id="trash"
            type="number"
            placeholder="śmieci"
            :value="load_basic_values.trash || 0"
            :rounded_class="false"
            @base-input="base_input"
          ></base-input>
        </div>
      </div>
      <div class="flex w-full flex-col gap-3 xl:flex-row">
        <div class="flex h-full w-full items-center gap-1">
          <the-paragraf name="Internet"></the-paragraf>
          <base-input
            id="internet"
            type="number"
            placeholder="internet"
            :value="load_basic_values.internet || 0"
            :rounded_class="false"
            @base-input="base_input"
          ></base-input>
        </div>
        <add-button
          name="Zapisz"
          :disabled="false"
          :rounded="false"
          @click.prevent="submit"
        ></add-button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from "vue";

//componets
import BaseInput from "../Flats/BaseInput.vue";
import AddButton from "../Flats/AddButton.vue";
import Paragraf from "../BasicEditValues/Paragraf.vue";

interface BasicValues {
  id: string;
  electric_current: number;
  water: number;
  transfer: number;
  trash: number;
  internet: number;
}

export default defineComponent({
  emits: ["edit-values"],
  props: {
    array_basic_values: {
      required: true,
      type: Array<BasicValues>,
    },
  },
  components: {
    "base-input": BaseInput,
    "add-button": AddButton,
    "the-paragraf": Paragraf,
  },
  setup(props, ctx) {
    //values
    const input_values = reactive<BasicValues>({
      id: "",
      electric_current: 0,
      water: 0,
      transfer: 0,
      trash: 0,
      internet: 0,
    });
    //functions
    const submit = () => {
      ctx.emit("edit-values", input_values);
    };

    const base_input = (val: { id: string; value: string }) => {
      input_values[`${val.id}`] = val.value;
    };

    //componets
    const load_basic_values = computed(() => {
      return props.array_basic_values[0] || [];
    });

    //wachers
    watch(load_basic_values, (newVal: BasicValues) => {
      input_values.id = newVal.id;
      input_values.electric_current = newVal.electric_current;
      input_values.water = newVal.water;
      input_values.transfer = newVal.transfer;
      input_values.trash = newVal.trash;
      input_values.internet = newVal.internet;
    });

    return { submit, load_basic_values, input_values, base_input };
  },
});
</script>

<style scoped></style>
