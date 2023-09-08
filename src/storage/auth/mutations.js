export default {
  login(state, payload) {
    state.user = {
      id: payload.id,
      username: payload.username,
    };
    state.tokens = {
      access_token: payload.access_token,
      refresh_token: payload.refresh_token,
    };
  },
};
