import store from "../../storage/index";
import { fetchData } from "../JS/fetchData.js";
import ConfigVue from "../JS/ConfigVue.js";

export async function AddLog(description: string) {
  const user = store.getters["auth/getUser"];
  const url = `${ConfigVue.url_server}/routers/log_routers/logs/add_log`;
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  const body = {
    username: user.username,
    description: description,
  };

  const response = await fetchData(url, method, headers, body, "body");

  if (response.error) {
    return {
      error: response.error,
    };
  }
  return response
}
