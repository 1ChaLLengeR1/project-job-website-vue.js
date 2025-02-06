import { defineStore } from "pinia";
import { ref } from "vue";
import Cookies from "js-cookie";

// types
import type { AuthBody, Auth } from "@/types/auth/types";
import type { ApiAuth } from "@/types/api/auth/types";

// api
import { automaticallyLogin } from "@/api/auth/fetch";
import { login } from "@/api/auth/post";

export const AuthStore = defineStore("authStore", () => {
  const auth = ref<Auth>({
    id: "",
    username: "",
    access_token: "",
    refresh_token: "",
  });

  const apiLogin = async (userData: AuthBody): Promise<boolean> => {
    if (auth.value.id) {
      return true;
    }
    const response = await login(userData);
    if (response && response.isValid) {
      const responseData = response.data as ApiAuth;
      auth.value = {
        id: responseData.id,
        username: responseData.username,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
      };
      Cookies.set("__job_auth", JSON.stringify(auth.value), {
        expires: 10 / 24,
      });
      return true;
    }
    return false;
  };

  const apiAutomaticallyLogin = async (): Promise<boolean> => {
    const response = await automaticallyLogin(auth.value.id);
    if (response && response.isValid) {
      const responseData = response.data as ApiAuth;
      auth.value = {
        id: responseData.id,
        username: responseData.username,
        access_token: responseData.access_token,
        refresh_token: responseData.refresh_token,
      };
      return true;
    }
    return false;
  };

  const getToken = (): string | null => {
    if (auth.value.access_token) {
      return auth.value.access_token;
    }
    return null;
  };

  const getRefreshToken = (): string | null => {
    if (auth.value.refresh_token) {
      return auth.value.refresh_token;
    }
    return null;
  };

  return { auth, apiLogin, apiAutomaticallyLogin, getToken, getRefreshToken };
});
