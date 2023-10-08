<template>
  <div class="w-full sm:w-4/6 flex flex-col gap-3">
    <ul class="w-full flex flex-col gap-3">
      <li
        v-for="item in get_list_settlement"
        :key="item.id_name"
        class="w-full flex flex-col gap-3"
      >
        <name-list :title="item.name_overdue" :id="item.id_name"></name-list>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { SavePage } from "../JS/SavePage";
//componets
import NameList from "./List/NameList.vue";

export default defineComponent({
  components: {
    "name-list": NameList,
  },
  setup() {
    //values
    const store = useStore();

    //functions
    SavePage("moneysettlement");

    //computed
    const get_list_settlement = computed(() => {
      return store.getters["response/get_list_settlement"];
    });

    return { get_list_settlement };
  },
});
</script>

<style scoped></style>
