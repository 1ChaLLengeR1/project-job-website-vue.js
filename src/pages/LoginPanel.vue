<template>
  <main
    class="flex h-screen w-full items-center justify-center bg-[url('../images/loginPanel/background.webp')] px-1"
  >
    <loading-spinner v-if="loading_spinner"></loading-spinner>
    <div
      class="flex w-96 flex-col items-center gap-5 rounded-[8px_0_8px_0] bg-color-bg px-2 py-5 sm:shadow-[21px_21px_4px_0_rgba(0,0,0,0.25)]"
    >
      <div class="w-full py-10 text-center">
        <h2 class="font-syne text-2xl text-white">Sign into Your Accont</h2>
      </div>
      <form class="flex w-60 flex-col items-center justify-center gap-2">
        <div class="relative mb-5 flex w-full justify-center">
          <svg-user></svg-user>
          <input
            type="text"
            placeholder="Email ID"
            class="w-full rounded-lg bg-color-yellow py-3 pl-14 pr-1 text-xl outline-none"
            v-model="inputs_values.username"
          />
        </div>
        <div class="relative mb-6 mt-5 flex w-full justify-center">
          <svg-password></svg-password>
          <input
            :type="input_type"
            placeholder="Password"
            class="w-full rounded-lg bg-color-yellow py-3 pl-14 pr-9 text-xl outline-none"
            v-model="inputs_values.password"
          />
          <svg-eye
            :type="input_type"
            @show-password="change_password"
          ></svg-eye>
        </div>
        <div
          v-if="error_information.show"
          class="flex w-full items-center gap-3 rounded-lg bg-[#192D57] p-2 shadow-[0_7px_2px_0_rgba(0,0,0,0.25)]"
        >
          <div class="rounded-[8px_8px_0_8px] bg-color-bg px-2">
            <p class="text-lg font-bold text-[#192D57]">
              {{ error_information.status }}
            </p>
          </div>
          <div>
            <p class="text-xs text-white">
              {{ error_information.description }}
            </p>
          </div>
        </div>
        <div class="w-full">
          <button
            @click.prevent="signIn"
            class="mb-14 mt-20 w-full rounded-xl bg-color-yellow p-3 font-syne text-3xl font-bold"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { fetchData } from "../components/JS/fetchData";
import { LoadPage } from "../components/JS/LoadPage";
import ConfigVue from "../components/JS/ConfigVue";
// componets
import LoadingSpinnerVue from "../components/utils/LoadingSpinner.vue";
import SvgEyeVue from "../components/LoginPanel/SvgEye.vue";
import SvgPasswordVue from "../components/LoginPanel/SvgPassword.vue";
import SvgUserVue from "../components/LoginPanel/SvgUser.vue";

export default defineComponent({
  name: "LoginPanel",
  components: {
    "loading-spinner": LoadingSpinnerVue,
    "svg-eye": SvgEyeVue,
    "svg-password": SvgPasswordVue,
    "svg-user": SvgUserVue,
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
    const error_information = reactive<{
      status: string;
      description: string;
      show: boolean;
    }>({
      status: "",
      description: "",
      show: false,
    });
    const input_type = ref<string>("password");

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

      let isAuth = true;
      const response = await fetchData(url, method, headers, body, "body");

      if (response.error) {
        error_information.description = response.error;
        error_information.status = "Error";
        error_information.show = true;
        isAuth = false;
      }

      loading_spinner.value = false;

      setTimeout(() => {
        error_information.description = "";
        error_information.status = "";
        error_information.show = false;
      }, 4000);

      localStorage.setItem(
        "tokens",
        JSON.stringify({
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        }),
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.id,
          username: response.username,
          isAuth: isAuth,
        }),
      );

      store.commit("auth/login", {
        id: response.id,
        username: response.username,
        isAuth: isAuth,
        access_token: response.access_token || "",
        refresh_token: response.refresh_token || "",
      });
      inputs_values.username = "";
      inputs_values.password = "";
      LoadPage();
    };

    const change_password = (value: string) => {
      input_type.value = value;
    };

    return {
      signIn,
      inputs_values,
      loading_spinner,
      error_information,
      input_type,
      change_password,
    };
  },
});
</script>
