import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      array_settlement: [],
      array_flats: [],
      error: {},
    };
  },
  actions: actions,
  mutations: mutations,
  getters: getters,
};
