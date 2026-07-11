<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <h1 class="font-syne text-3xl text-color-grey sm:text-5xl">
      {{ t("pages.rentals.family.header") }}
    </h1>
    <Tabs value="beneficiaries" scrollable class="w-full max-w-7xl">
      <TabList>
        <Tab value="beneficiaries">
          {{ t("pages.rentals.family.tabs.beneficiaries") }}
        </Tab>
        <Tab value="rules">
          {{ t("pages.rentals.family.tabs.rules") }}
        </Tab>
        <Tab value="settlements">
          {{ t("pages.rentals.family.tabs.settlements") }}
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel value="beneficiaries">
          <BeneficiariesSection />
        </TabPanel>
        <TabPanel value="rules">
          <AllocationRulesSection />
        </TabPanel>
        <TabPanel value="settlements">
          <BeneficiarySettlementsSection />
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
import BeneficiariesSection from "@/components/Rentals/Family/sections/BeneficiariesSection.vue";
import AllocationRulesSection from "@/components/Rentals/Family/sections/AllocationRulesSection.vue";
import BeneficiarySettlementsSection from "@/components/Rentals/Family/sections/BeneficiarySettlementsSection.vue";

export default defineComponent({
  name: "RentalFamily",
  components: {
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    BeneficiariesSection,
    AllocationRulesSection,
    BeneficiarySettlementsSection,
  },
  setup() {
    const { t } = useI18n();

    savePage(paths.rentalFamily);

    return { t };
  },
});
</script>

<style scoped></style>
