<template>
  <main class="w-full h-[calc(100vh-64px)] flex flex-col items-center gap-5 p-2">
    <the-title name="List Zaległych"></the-title>
    <create-list></create-list>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SavePage } from "../components/JS/SavePage";

//componets
import Title from "../components/MoneySettlement/Title.vue";
import CreateListVue from "../components/MoneySettlement/CreateList.vue";

export default defineComponent({
  components: {
    "the-title": Title,
    "create-list": CreateListVue,
  },
  setup() {
    SavePage("moneysettlement");
    return {};
  },
});
</script>
