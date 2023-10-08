export default {
  get_list_settlement(state, payload) {
    state.array_settlement = [];
    for (const key of payload) {
      state.array_settlement.push(key);
    }
  },
  error_response(state, payload) {
    state.error = payload;
  },
};
