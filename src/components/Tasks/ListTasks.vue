<template>
  <main class="flex w-full justify-center">
    <DataTable :value="apiTaskStore.collectionTasks" showGridlines>
      <template #header>
        <div class="flex w-full justify-between">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xl font-bold text-white">
              {{
                t("pages.tasks.table.quantity", {
                  quantity: apiTaskStore.collectionTasks.length,
                })
              }}
            </span>
          </div>
          <div class="flex w-fit gap-3">
            <Button
              :label="
                urlShowList
                  ? t('pages.tasks.button.showNotActive')
                  : t('pages.tasks.button.showActive')
              "
              severity="success"
              text
              @click="handlerNotActiveCollection"
            />
          </div>
        </div>
      </template>
      <Column field="description" :header="t('pages.tasks.table.description')">
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            slotProps.data.description
          }}</span>
        </template>
      </Column>
      <Column field="time" :header="t('pages.tasks.table.time')">
        <template #body="slotProps">
          <span class="text-color-yellow">{{
            t("pages.tasks.table.timeValue", {
              time: slotProps.data.time,
            })
          }}</span>
        </template>
      </Column>
      <Column field="active" :header="t('pages.tasks.table.status')">
        <template #body="slotProps">
          <Tag
            :value="slotProps.data.active"
            :severity="getStatus(slotProps.data.active)"
          />
        </template>
      </Column>
      <Column field="options" :header="t('pages.tasks.table.options')">
        <template #body="slotProps">
          <div class="flex w-fit gap-3">
            <Button
              :label="
                slotProps.data.active
                  ? t('pages.tasks.button.deactive')
                  : t('pages.tasks.button.active')
              "
              :severity="slotProps.data.active ? 'danger' : 'success'"
              text
              @click="
                handlerActiveTask(slotProps.data.id, slotProps.data.active)
              "
            />
          </div>
        </template>
      </Column>
      <Column
        field=""
        :header="t('pages.tasks.table.datetime')"
        class="flex flex-col gap-3"
      >
        <template #body="slotProps">
          <span class="text-green-500"
            >{{
              t("pages.tasks.table.createdAt", {
                created_at: formatDate(slotProps.data.created_at),
              })
            }}
          </span>
          <span class="text-blue-500">{{
            t("pages.tasks.table.updatedAt", {
              updated_at: formatDate(slotProps.data.updated_at),
            })
          }}</span>
        </template>
      </Column>
    </DataTable>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { formatDate } from "@/utils/formats";

// stores
import { ApiTaskStore } from "@/stores/tasks/apiTasks";
import { LoadingSpinnerStore } from "@/stores/modals/spinner";

// components
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import Button from "primevue/button";
import Tag from "primevue/tag";

export default defineComponent({
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
    Tag,
  },
  setup() {
    const { t } = useI18n();
    const apiTaskStore = ApiTaskStore();
    const loadingSpinnerStore = LoadingSpinnerStore();
    const urlShowList = ref<boolean>(true);
    const router = useRouter();
    const route = useRoute();

    const getStatus = (status: boolean): "success" | "danger" | undefined => {
      switch (status) {
        case true:
          return "success";

        case false:
          return "danger";

        default:
          return undefined;
      }
    };

    const handlerActiveTask = async (taskId: string, active: boolean) => {
      const body = {
        active: !active,
      };
      loadingSpinnerStore.isLoading = true;
      await apiTaskStore.apiUpdateActiveTaskF(taskId, body, urlShowList.value);
      loadingSpinnerStore.isLoading = false;
    };

    const handlerNotActiveCollection = async () => {
      loadingSpinnerStore.isLoading = true;
      urlShowList.value = !urlShowList.value;
      await router.push({
        query: {
          ...route.query,
          active: String(urlShowList.value),
        },
      });
      await apiTaskStore.apiGetTasks(true, urlShowList.value);
      loadingSpinnerStore.isLoading = false;
    };

    (async function runActions() {
      loadingSpinnerStore.isLoading = true;

      const activeParam = route.query.active;
      const isActive = activeParam !== "false";

      urlShowList.value = isActive;

      await apiTaskStore.apiGetTasks(false, isActive);

      loadingSpinnerStore.isLoading = false;
    })();

    return {
      urlShowList,
      apiTaskStore,
      t,
      formatDate,
      getStatus,
      handlerActiveTask,
      handlerNotActiveCollection,
    };
  },
});
</script>

<style scoped>
:deep(.p-datatable) {
  background-color: transparent;
  --p-datatable-header-background: transparent;
  --p-datatable-row-background: transparent;
  width: 100%;
}

:deep(.p-datatable .p-datatable-wrapper) {
  width: 100%;
}

:deep(.p-datatable-table) {
  width: 100%;
}

:deep(.p-datatable .p-datatable-thead > tr > th) {
  background-color: transparent !important;
  color: white;
}

:deep(.p-datatable .p-datatable-tbody > tr > td) {
  background-color: transparent;
}
</style>
