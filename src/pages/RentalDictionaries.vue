<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <h1 class="font-syne text-3xl text-color-grey sm:text-5xl">
      {{ t("pages.rentals.dictionaries.header") }}
    </h1>
    <Tabs value="apartments" scrollable class="w-full max-w-7xl">
      <TabList>
        <Tab value="apartments">
          {{ t("pages.rentals.dictionaries.tabs.apartments") }}
        </Tab>
        <Tab value="tenants">
          {{ t("pages.rentals.dictionaries.tabs.tenants") }}
        </Tab>
        <Tab value="tenancies">
          {{ t("pages.rentals.dictionaries.tabs.tenancies") }}
        </Tab>
        <Tab value="costTypes">
          {{ t("pages.rentals.dictionaries.tabs.costTypes") }}
        </Tab>
        <Tab value="apartmentCosts">
          {{ t("pages.rentals.dictionaries.tabs.apartmentCosts") }}
        </Tab>
        <Tab value="meters">
          {{ t("pages.rentals.dictionaries.tabs.meters") }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="apartments">
          <ApartmentsSection />
        </TabPanel>
        <TabPanel value="tenants">
          <TenantsSection />
        </TabPanel>
        <TabPanel value="tenancies">
          <TenanciesSection />
        </TabPanel>
        <TabPanel value="costTypes">
          <CostTypesSection />
        </TabPanel>
        <TabPanel value="apartmentCosts">
          <ApartmentCostsSection />
        </TabPanel>
        <TabPanel value="meters">
          <MetersSection />
        </TabPanel>
      </TabPanels>
    </Tabs>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";

import { savePage } from "@/composable/navigation";
import { paths } from "@/utils/paths";

// components
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import ApartmentsSection from "@/components/Rentals/Dictionaries/sections/ApartmentsSection.vue";
import TenantsSection from "@/components/Rentals/Dictionaries/sections/TenantsSection.vue";
import TenanciesSection from "@/components/Rentals/Dictionaries/sections/TenanciesSection.vue";
import CostTypesSection from "@/components/Rentals/Dictionaries/sections/CostTypesSection.vue";
import ApartmentCostsSection from "@/components/Rentals/Dictionaries/sections/ApartmentCostsSection.vue";
import MetersSection from "@/components/Rentals/Dictionaries/sections/MetersSection.vue";

export default defineComponent({
  name: "RentalDictionaries",
  components: {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ApartmentsSection,
    TenantsSection,
    TenanciesSection,
    CostTypesSection,
    ApartmentCostsSection,
    MetersSection,
  },
  setup() {
    const { t } = useI18n();

    savePage(paths.rentalDictionaries);

    return { t };
  },
});
</script>

<style scoped></style>
