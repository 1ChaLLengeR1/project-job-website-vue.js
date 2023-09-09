<template>
  <main
    class="w-full h-[calc(100vh-64px)] flex justify-center items-center px-1"
  >
    <loading-spinner v-if="loading_spinner"></loading-spinner>
    <div class="w-72 flex flex-col gap-5 bg-white rounded-lg px-6 py-5">
      <div class="w-full flex justify-center py-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="80px"
          height="80px"
          fill="#FCA311"
          viewBox="0 0 512 512"
        >
          <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"
          />
        </svg>
      </div>
      <div
        class="w-full h-56 flex flex-col justify-around items-center gap-5 border border-color-yellow rounded-lg"
      >
        <h2 class="text-3xl">Sign In</h2>
        <form class="w-full flex flex-col items-center gap-3 p-1">
          <input
            type="text"
            placeholder="username"
            v-model="inputs_values.username"
            class="bg-transparent p-2 rounded-lg outline-none hover:bg-black focus:text-color-yellow focus:bg-black duration-500"
          />
          <input
            type="password"
            placeholder="password"
            v-model="inputs_values.password"
            class="bg-transparent p-2 rounded-lg outline-none hover:bg-black focus:text-color-yellow focus:bg-black duration-500"
          />
        </form>
      </div>
      <div class="w-full h-5 flex justify-center">
        <p class="mr-0 p-0 text-red-600">{{ error_information }}</p>
      </div>
      <div>
        <button
          @click.prevent="signIn()"
          class="w-full text-2xl py-1 shadow shadow-black text-color-yellow bg-transparent rounded-lg uppercase hover:bg-black duration-500"
        >
          Login
        </button>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { fetchData } from "../components/JS/fetchData";
import { LoadPage } from "../components/JS/LoadPage";
import LoadingSpinnerVue from "../components/utils/LoadingSpinner.vue";
import ConfigVue from "../components/JS/ConfigVue";

export default defineComponent({
  name: "LoginPanel",
  components: {
    "loading-spinner": LoadingSpinnerVue,
  },
  setup() {
    //values
    const store = useStore();
    const router = useRouter();
    const config_vue = ref<{ url_server: string }>(ConfigVue);
    const inputs_values = reactive<{ username: string; password: string }>({
      username: "",
      password: "",
    });
    const loading_spinner = ref<boolean>(false);
    const error_information = ref<string>("");

    //functions
    const signIn = async () => {
      loading_spinner.value = true;

      const url = `${config_vue.value.url_server}/authentication/login`;
      const method = "POST";
      const headers = {
        "Content-Type": "application/json",
      };
      const body = {
        username: inputs_values.username,
        password: inputs_values.password,
      };

      const response = await fetchData(url, method, headers, body, "body");
      if (!response.ok) {
        error_information.value = response.error;
      }
      loading_spinner.value = false;

      setTimeout(() => {
        error_information.value = "";
      }, 4000);

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        })
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.id,
          username: response.username,
        })
      );

      store.commit("auth/login", {
        id: response.id,
        username: response.username,
        access_token: response.access_token || "",
        refresh_token: response.refresh_token || "",
      });
      inputs_values.username = "";
      inputs_values.password = "";
      LoadPage()
    };

    return { signIn, inputs_values, loading_spinner, error_information };
  },
});
</script>
