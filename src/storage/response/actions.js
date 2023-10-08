import ConfigVue from "../../components/JS/ConfigVue";
import { fetchData } from "../../components/JS/fetchData";

export default {
  async get_list_settlement(ctx) {
    const url_server = ConfigVue.url_server;
    const url = `${url_server}/routers/outstanding_money/names_overdue/get_list`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetchData(url, method, headers, null, null);
    if (response.error) {
      ctx.commit("error_response", response);
      return;
    }
    ctx.commit("get_list_settlement", response);
  },
};
