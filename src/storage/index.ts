import { createStore } from "vuex";
import auth from "./auth/index.js";
import response from "./response/index.js";

const store = createStore({
  modules: {
    auth: auth,
    response: response,
  },
});

export default store;
