<template>
  <div class="w-full sm:w-4/6 flex flex-col gap-3">
    <ul class="w-full flex flex-col gap-3">
      <li
        v-for="item in get_list_settlement"
        :key="item.id_name"
        class="w-full flex flex-col gap-3"
      >
        <name-list
          :title="item.name_overdue"
          :id="item.id_name"
          @response-error="response_error"
          @open-list="open_list"
          @confirm-box="confirm_box"
        ></name-list>
        <items-list
          v-if="item.id_name === show_list.id"
          :array="item.array_items"
          :price="item.full_price"
          :id_name="item.id_name"
          @response-error="response_error"
          @confirm-box="confirm_box"
        ></items-list>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";
import { SavePage } from "../JS/SavePage";
import ItemsListVue from "./List/ItemsList.vue";
//componets
import NameList from "./List/NameList.vue";

export default defineComponent({
  components: {
    "name-list": NameList,
    "items-list": ItemsListVue,
  },
  emits: ["response-error", "confirm-box"],
  setup(_, ctx) {
    //values
    const store = useStore();
    const show_list = reactive<{ id: string }>({
      id: "",
    });

    //functions
    SavePage("moneysettlement");
    const response_error = (val: {
      id: number;
      description: string;
      type: string;
    }) => {
      ctx.emit("response-error", val);
    };

    const open_list = (value: string) => {
      if (show_list.id === value) {
        show_list.id = "";
        return;
      }
      show_list.id = value;
    };

    const confirm_box = (val: {
      info: string;
      url: string;
      method: string;
      headers: object;
      body: object;
      method_fetch: string;
      store_paramms: object;
    }) => {
      ctx.emit("confirm-box", val);
    };

    //computed
    const get_list_settlement = computed(() => {
      return store.getters["response/get_list_settlement"];
    });

    return {
      get_list_settlement,
      response_error,
      show_list,
      open_list,
      confirm_box,
    };
  },
});
</script>

<style scoped></style>
