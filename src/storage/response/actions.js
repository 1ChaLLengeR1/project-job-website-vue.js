import ConfigVue from "../../components/JS/ConfigVue";
import { fetchData } from "../../components/JS/fetchData";

export default {
  async get_list_settlement(ctx) {
    const url = `${ConfigVue.url_server}/routers/outstanding_money/names_overdue/get_list`;
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

  async get_flats(ctx) {
    const url = `${ConfigVue.url_server}/routers/house_settlement_money/flats/flats/get_flats`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetchData(url, method, headers, null, null);
    if (response.error) {
      ctx.commit("error_response", response);
      return;
    }
    ctx.commit("get_list_flats", response);
  },

  async get_renting_user(ctx) {
    const url = `${ConfigVue.url_server}/routers/house_settlement_money/renting_user/renting_user/get_users`;
    const method = "GET";
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetchData(url, method, headers, null, null);
    if (response.error) {
      ctx.commit("error_response", response);
      return;
    }
    ctx.commit("get_renting_users", response);
  },
};
