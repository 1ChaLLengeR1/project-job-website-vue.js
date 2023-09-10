import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

export default {
  namespaced: true,
  state() {
    return {
      user: {
        id: "",
        username: "",
        isAuth: false
      },
      tokens: {
        access_token: "",
        refresh_token: "",
      },
    };
  },
  actions:actions,
  mutations:mutations,
  getters:getters
};
