<template>
  <div class="w-full flex gap-3 bg-color-bg-dark">
    <svg-arrow-down
      :color="svg.arrow.color"
      :height="svg.arrow.height"
      padding="8px"
      bg="#FCA311"
    ></svg-arrow-down>
    <form class="w-full flex justify-center items-center p-1">
      <p
        v-if="!input_values.change"
        class="text-sm sm:text-3xl text-white font-syne font-bold"
      >
        {{ title }}
      </p>
      <div
        v-else
        class="w-full flex flex-col justify-center items-center lg:flex-row gap-3"
      >
        <base-input
          :value="input_values.title"
          type_input="text"
          type="title"
          @input-update="input_update"
        ></base-input>
        <button
          class="w-full sm:w-52 p-1 sm:p-3 bg-color-yellow text-white font-syne"
          @click.prevent="submit_edit"
        >
          Zapisz
        </button>
      </div>
    </form>
    <div class="flex justify-center gap-3">
      <svg-ellipsis
        :color="svg.ellipsi.color"
        :height="svg.ellipsi.height"
        padding="8px"
        bg="#FCA311"
        @click="open_edit"
      ></svg-ellipsis>

      <svg-xmark
        :color="svg.xmark.color"
        :height="svg.xmark.height"
        padding="8px"
        bg="#FCA311"
      ></svg-xmark>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import ConfigVue from "../../JS/ConfigVue";
import { fetchData } from "../../JS/fetchData";
import { useStore } from "vuex";

//componets
import SvgXmark from "./SvgXmark.vue";
import EllipsisSvgVue from "../../CalculatorVat/EllipsisSvg.vue";
import ArrowDownVue from "./ArrowDown.vue";
import BaseInputVue from "./BaseInput.vue";

export default defineComponent({
  components: {
    "svg-xmark": SvgXmark,
    "svg-ellipsis": EllipsisSvgVue,
    "svg-arrow-down": ArrowDownVue,
    "base-input": BaseInputVue,
  },
  props: {
    title: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    //values
    const store = useStore();
    const input_values = reactive({
      title: props.title,
      id: props.id,
      change: false,
    });
    const svg = reactive({
      xmark: {
        color: "red",
        height: "40px",
      },
      ellipsi: {
        color: "blue",
        height: "40px",
      },
      arrow: {
        color: "white",
        height: "40px",
      },
    });

    //functions
    const response_svg = () => {
      if (window.innerWidth <= 640) {
        svg.xmark.height = `20px`;
        svg.ellipsi.height = `20px`;
        svg.arrow.height = `20px`;
      } else {
        svg.xmark.height = `40px`;
        svg.ellipsi.height = `40px`;
        svg.arrow.height = `40px`;
      }
    };

    const submit_edit = async () => {
      const url = `${ConfigVue.url_server}/routers/outstanding_money/names_overdue/edit_name_list`;
      const method = "PUT";
      const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${store.getters["auth/getTokens"].access_token}`,
      };
      const body = {
        id_user: store.getters["auth/getUser"].id,
        username: store.getters["auth/getUser"].username,
        id: input_values.id,
        name: input_values.title,
      };
      const response = await fetchData(url, method, headers, body, "body");
      if(response.error){
        console.log(response)
        return
      }
      store.dispatch("response/get_list_settlement")
      console.log(response);
    };

    const open_edit = () => {
      input_values.change = !input_values.change;
    };

    const input_update = (val: { type: string; value: string }) => {
      input_values[`${val.type}`] = val.value;
    };

    window.addEventListener("resize", response_svg);
    response_svg();
    return { svg, input_values, input_update, submit_edit, open_edit };
  },
});
</script>

<style scoped></style>
