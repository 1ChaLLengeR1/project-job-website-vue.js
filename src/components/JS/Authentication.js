import store from "../../storage/index";

export function Authentication() {
  if (!localStorage.getItem("user")) {
    return;
  }

  if (!localStorage.getItem("tokens")) {
    return;
  }

  const user_localStorage = localStorage.getItem("user");
  const user_object = JSON.parse(user_localStorage);

  const tokens_localStorage = localStorage.getItem("tokens");
  const tokens_object = JSON.parse(tokens_localStorage);

  const user_getters = {
    id: store.getters["auth/getUser"].id,
    username: store.getters["auth/getUser"].username,
    isAuth: store.getters["auth/getUser"].isAuth,
  };

  const tokens_getters = {
    access_token: store.getters["auth/getTokens"].access_token,
    refresh_token: store.getters["auth/getTokens"].refresh_token,
  };

  if (Object.keys(user_object).length === 0) {
    return false;
  }
  if (Object.keys(tokens_object).length === 0) {
    return false;
  }
  if (
    user_getters.id === "" &&
    user_getters.username === "" &&
    user_getters.isAuth === false
  ) {
    return false;
  }
  if (
    tokens_getters.access_token === "" &&
    tokens_getters.refresh_token === ""
  ) {
    return false;
  }

  return true;
}
