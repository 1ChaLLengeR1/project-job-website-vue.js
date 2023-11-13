import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      array_settlement: [],
      array_flats: [],
      array_renting_user: [],
      error: {},
    };
  },
  actions: actions,
  mutations: mutations,
  getters: getters,
};
