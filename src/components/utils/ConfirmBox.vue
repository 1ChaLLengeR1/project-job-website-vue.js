<template>
  <div
    class="w-full h-full fixed top-0 left-0 flex justify-center items-center z-50 backdrop-blur-md bg-white/30 p-3"
  >
    <div
      class="w-[40rem] h-64 flex flex-col justify-center bg-color-bg rounded-3xl p-3 gap-3"
    >
      <div class="w-full h-full flex justify-center items-center">
        <p class="text-3xl font-syne font-bold text-color-yellow">{{info}}</p>
      </div>
      <form class="w-full h-full flex items-end justify-end gap-3">
        <button
          class="w-28 p-1 font-syne font-bold bg-green-700"
          @click.prevent="submit_yes"
        >
          Tak
        </button>
        <button
          class="w-28 p-1 font-syne font-bold bg-red-700"
          @click.prevent="submit_no"
        >
          Nie
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ConfigVue from "../JS/ConfigVue";
import { fetchData } from "../JS/fetchData";
import { useStore } from "vuex";
import type { PropType } from "vue";

interface ObjectStore {
  url: String;
  type: Boolean;
}

export default defineComponent({
  emits: ["show-confirm-box", "response-error"],
  props: {
    info:{
      required:true,
      type:String
    },
    url: {
      required: true,
      type: String,
    },
    method: {
      required: true,
      type: String,
    },
    headers: {
      required: true,
      type: Object,
    },
    body: {
      required: true,
      type: Object,
    },
    method_fetch: {
      required: true,
      type: String,
    },
    store_paramms: {
      required: true,
      type: Object as PropType<ObjectStore>,
    },
  },
  setup(props, ctx) {
    //values
    const store = useStore();
    //functions
    const submit_no = () => {
      ctx.emit("show-confirm-box", false);
    };
    const submit_yes = async () => {
      const url = `${ConfigVue.url_server}${props.url}`;
      const method = props.method;
      const headers = props.headers;
      const body = props.body;
      const method_fetch = props.method_fetch;
      const store_params = {
        type: props.store_paramms.type,
        url: props.store_paramms.url,
      };
      const response = await fetchData(
        url,
        method,
        headers,
        body,
        method_fetch
      );
      if (response.error) {
        ctx.emit("response-error", {
          id: Math.random(),
          description: response.error,
          type: "error",
        });
        ctx.emit("show-confirm-box", false);
        return;
      }
      ctx.emit("response-error", {
        id: Math.random(),
        description: response.detail,
        type: "success",
      });
      ctx.emit("show-confirm-box", false);
      if (store_params.type === true) {
        await store.dispatch(`${store_params.url}`);
      }
    };
    return { submit_no, submit_yes };
  },
});
</script>

<style scoped></style>
