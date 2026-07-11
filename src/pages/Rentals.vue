<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <h1 class="font-syne text-3xl text-color-grey sm:text-5xl">
      {{ t("pages.rentals.header") }}
    </h1>

    <!-- podnawigacja sekcji wynajmu -->
    <nav class="w-full max-w-7xl overflow-x-auto">
      <ul class="flex w-max min-w-full gap-2 border-b border-color-bg pb-2">
        <li v-for="link in pathsRentals" :key="link.path">
          <router-link
            :to="{ path: link.path }"
            class="block whitespace-nowrap rounded-t-md px-4 py-2 text-lg duration-300 hover:text-white"
            :class="
              isActive(link.path)
                ? 'bg-color-bg font-bold text-color-yellow'
                : 'text-color-grey'
            "
          >
            {{ t(link.title) }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="w-full max-w-7xl">
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

import { pathsRentals } from "@/utils/paths";

export default defineComponent({
  name: "Rentals",
  setup() {
    const { t } = useI18n();
    const route = useRoute();

    const isActive = (path: string): boolean => route.path === path;

    return { t, pathsRentals, isActive };
  },
});
</script>

<style scoped></style>
