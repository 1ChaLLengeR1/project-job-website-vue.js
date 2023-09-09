import router from "../../router/index";
import store from "../../storage/index";
import ConfigVue from "../JS/ConfigVue";
import { fetchData } from "../JS/fetchData";
import { LoadPage } from "./LoadPage";

export async function AutomaticallyLogin() {
  const user = JSON.parse(localStorage.getItem("user"));
  const tokens = JSON.parse(localStorage.getItem("tokens"));
  const url = `${ConfigVue.url_server}/authentication/automatically-login`;
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    id: user.id,
    refresh_token: tokens.refresh_token,
  };

  const response = await fetchData(url, method, headers, body, "body");
  if (response.error) {
    router.push({ name: "loginpanel" });
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify({
      id: response.id,
      username: response.username,
    })
  );

  localStorage.setItem(
    "tokens",
    JSON.stringify({
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    })
  );

  store.commit("auth/login", {
    id: response.id,
    username: response.username,
    access_token: response.access_token || "",
    refresh_token: response.refresh_token || "",
  });

  LoadPage()
}
