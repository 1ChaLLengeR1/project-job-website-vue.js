export default {
  login(state, payload) {
    state.user = {
      id: payload.id,
      username: payload.username,
      isAuth: payload.isAuth
    };
    state.tokens = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
    };
  },
};
