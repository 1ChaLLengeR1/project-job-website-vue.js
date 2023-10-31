<template>
  <div class="w-full bg-color-bg-dark p-3">
    <form class="flex w-full flex-col gap-3">
      <div class="flex w-full flex-col gap-3 sm:flex-row">
        <div>
          <input
            type="text"
            placeholder="Nazwa Listy"
            v-model="item.name_list"
            class="w-full rounded-t-3xl bg-color-bg p-3 text-white outline-none sm:rounded-[16px_0_0_0]"
          />
        </div>
        <div
          class="flex w-full flex-wrap justify-center gap-3 bg-color-bg px-2 py-7 sm:rounded-tr-3xl xl:flex-nowrap"
        >
          <div class="w-full bg-color-bg p-1">
            <input
              type="text"
              placeholder="Nazwa produktu"
              v-model="item.name"
              class="w-full bg-color-bg-dark p-3 text-white outline-none"
            />
          </div>
          <div class="w-full bg-color-bg p-1">
            <input
              type="number"
              placeholder="Cena produktu"
              v-model="item.amount"
              class="w-full bg-color-bg-dark p-3 text-white outline-none"
            />
          </div>
          <div class="w-full p-1">
            <button
              class="h-full w-full bg-color-yellow p-3 font-syne font-bold sm:rounded-tr-3xl"
              @click.prevent="add_item"
            >
              Dodaj produkt do listy
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <ul
          class="flex h-full w-full flex-wrap justify-center gap-3 bg-color-bg p-2"
          v-if="show_list"
        >
          <li
            class="flex w-40 cursor-pointer flex-col items-center justify-center gap-3 bg-color-bg-dark p-1 text-white"
            v-for="item in array_settlement"
            :key="item.id"
            @click="delete_item(item.id)"
          >
            <p class="w-full bg-color-bg text-center">{{ item.name }}</p>
            <p class="w-full bg-color-bg text-center">{{ item.amount }}zł</p>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <button
          class="w-full rounded-b-3xl bg-color-yellow py-3 font-syne text-3xl font-bold"
          :class="{ 'cursor-not-allowed': check_value_form }"
          :disabled="check_value_form"
          @click.prevent="submit"
        >
          Wyślij Liste
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { fetchData } from "../JS/fetchData";
import ConfigVue from "../JS/ConfigVue";

//componets

export default defineComponent({
  emits: ["response-notification"],
  setup(_, ctx) {
    //values
    const store = useStore();
    const array_settlement = ref<
      { id: number; name: string; amount: number }[]
    >([]);
    const url_server = ref<{ url_server: string }>(ConfigVue);

    const item = reactive<{
      name_list: string;
      name: string;
      amount: number;
    }>({
      name_list: "",
      name: "",
      amount: 0,
    });

    //functions

    const submit = async () => {
      const url = `${url_server.value.url_server}/routers/outstanding_money/names_overdue/create_list`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        name: item.name_list,
        array_object: array_settlement.value,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (response.error) {
        item.name_list = "";
        item.name = "";
        item.amount = 0;
        array_settlement.value = [];
        ctx.emit("response-notification", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        return;
      }
      item.name_list = "";
      item.name = "";
      item.amount = 0;
      array_settlement.value = [];
      ctx.emit("response-notification", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      await store.dispatch("response/get_list_settlement");
    };

    const add_item = () => {
      const obj = {
        id: Math.random(),
        name: item.name,
        amount: item.amount,
      };

      array_settlement.value.push(obj);
      item.name = "";
      item.amount = 0;
    };

    const delete_item = (id: number) => {
      const find_id = array_settlement.value.findIndex(
        (element) => element.id === id,
      );
      array_settlement.value.splice(find_id, 1);
    };

    //computed
    const show_list = computed(() => {
      if (array_settlement.value.length === 0) {
        return false;
      }
      return true;
    });

    const check_value_form = computed(() => {
      if (item.name_list === "") {
        return true;
      }
      return false;
    });

    return {
      add_item,
      item,
      array_settlement,
      show_list,
      delete_item,
      check_value_form,
      submit,
    };
  },
});
</script>

<style scoped></style>
