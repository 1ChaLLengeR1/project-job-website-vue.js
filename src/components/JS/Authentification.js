import store from "../../storage/index";

export function Authentification() {
  //values
  const user_localStorage = localStorage.getItem("user");
  const user_object = JSON.parse(user_localStorage);

  const tokens_localStorage = localStorage.getItem("tokens");
  const tokens_object = JSON.parse(tokens_localStorage);

  const user_getters = {
    id: store.getters["auth/getUser"].id,
    username: store.getters["auth/getUser"].username,
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
  if (user_getters.id === '' && user_getters.username === '') {
    return false;
  }
  if (
    tokens_getters.access_token === '' &&
    tokens_getters.refresh_token === ''
  ) {
    console.log('brak usera')
    return false;
  }

  return true;
}
