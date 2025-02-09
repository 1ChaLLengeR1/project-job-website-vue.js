<template>
  <main
    class="flex min-h-[calc(100vh-64px)] w-full flex-col items-center gap-5 p-2"
  >
    <confirm-box
      v-if="show_confirm"
      :info="values_confirm_box.info"
      :url="values_confirm_box.url"
      :method="values_confirm_box.method"
      :headers="values_confirm_box.headers"
      :body="values_confirm_box.body"
      :method_fetch="values_confirm_box.method_fetch"
      :store_paramms="values_confirm_box.store_paramms"
      @show-confirm-box="show_confirm_box"
    ></confirm-box>
    <Title :name="t('pages.moneySettlement.header')" />
    <CreateListVue />
    <ListSettlementVue @confirm-box="confirm_box" />
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { savePage } from "@/composable/navigation";

// stores
import { LogStore } from "@/stores/log/log";

//componets
import Title from "../components/MoneySettlement/Title.vue";
import CreateListVue from "../components/MoneySettlement/CreateList.vue";
import ListSettlementVue from "../components/MoneySettlement/ListSettlement.vue";
import ConfirmBox from "@/components/utils/ConfirmBox.vue";
import { paths } from "@/utils/paths";

export default defineComponent({
  components: {
    Title,
    CreateListVue,
    ListSettlementVue,
    ConfirmBox,
  },
  setup() {
    const { t } = useI18n();
    const logStore = LogStore();
    const notification = reactive<{
      id: number;
      description: string;
      type: string;
    }>({
      id: 0,
      description: "",
      type: "",
    });
    const show_confirm = ref<boolean>(false);
    const values_confirm_box = reactive({
      info: "",
      url: "",
      method: "",
      headers: {},
      body: {},
      method_fetch: "",
      store_paramms: {},
    });

    const show_confirm_box = (val: boolean) => {
      show_confirm.value = val;
      values_confirm_box.info = "";
      values_confirm_box.url = "";
      values_confirm_box.method = "";
      values_confirm_box.headers = {};
      values_confirm_box.body = {};
      values_confirm_box.method_fetch = "";
      values_confirm_box.store_paramms = {};
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
      show_confirm.value = true;
      values_confirm_box.info = val.info;
      values_confirm_box.url = val.url;
      values_confirm_box.method = val.method;
      values_confirm_box.headers = val.headers;
      values_confirm_box.body = val.body;
      values_confirm_box.method_fetch = val.method_fetch;
      values_confirm_box.store_paramms = val.store_paramms;
    };

    (async () => {
      await logStore.apiCreateLog("Lista_Zaległych");
    })();
    savePage(paths.moneySettlement);

    return {
      notification,
      show_confirm,
      values_confirm_box,
      show_confirm_box,
      confirm_box,
      t,
    };
  },
});
</script>
