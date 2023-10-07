<template>
  <div class="w-full bg-color-bg-dark p-3">
    <form class="w-full flex flex-col gap-3">
      <div class="w-full flex flex-col sm:flex-row gap-3">
        <div>
          <input
            type="text"
            placeholder="Nazwa Listy"
            v-model="item.name_list"
            class="w-full outline-none bg-color-bg text-white rounded-t-3xl sm:rounded-[16px_0_0_0] p-3"
          />
        </div>
        <div
          class="w-full flex justify-center flex-wrap xl:flex-nowrap gap-3 py-7 px-2 bg-color-bg sm:rounded-tr-3xl"
        >
          <div class="w-full bg-color-bg p-1">
            <input
              type="text"
              placeholder="Nazwa produktu"
              v-model="item.name"
              class="w-full p-3 outline-none bg-color-bg-dark text-white"
            />
          </div>
          <div class="w-full bg-color-bg p-1">
            <input
              type="number"
              placeholder="Cena produktu"
              v-model="item.amount"
              class="w-full p-3 outline-none bg-color-bg-dark text-white"
            />
          </div>
          <div class="w-full p-1">
            <button
              class="w-full h-full bg-color-yellow sm:rounded-tr-3xl p-3 font-bold font-syne"
              @click.prevent="add_item"
            >
              Dodaj produkt do listy
            </button>
          </div>
        </div>
      </div>
      <div class="w-full">
        <ul
          class="w-full h-full flex justify-center gap-3 flex-wrap bg-color-bg p-2"
          v-if="show_list"
        >
          <li
            class="w-40 flex flex-col gap-3 items-center bg-color-bg-dark p-1 text-white cursor-pointer"
            v-for="item in array_settlement"
            :key="item.id"
            @click="delete_item(item.id)"
          >
            <p class="w-full text-center bg-color-bg">{{ item.name }}</p>
            <p class="w-full text-center bg-color-bg">{{ item.amount }}zł</p>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <button
          class="w-full py-3 font-syne font-bold text-3xl bg-color-yellow rounded-b-3xl"
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
        console.log(response);
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
        (element) => element.id === id
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
