<template>
  <div class="w-full sm:w-4/6 flex flex-col gap-3">
    <ul class="w-full flex flex-col">
      <li class="w-full flex flex-col gap-3">
        <name-list title="Ja"></name-list>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfigVue from "../JS/ConfigVue";
import { fetchData } from "../JS/fetchData";
import { SavePage } from "../JS/SavePage";
//componets
import NameList from "./List/NameList.vue";

export default defineComponent({
  components: {
    "name-list": NameList,
  },
  setup() {
    SavePage("moneysettlement");
    return {};
  },
});
</script>

<style scoped></style>
