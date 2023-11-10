export default {
  get_list_settlement(state, payload) {
    state.array_settlement = [];
    for (const key of payload) {
      state.array_settlement.push(key);
    }
  },
  get_list_flats(state, payload) {
    state.array_flats = [];
    for (const key of payload) {
      state.array_flats.push(key);
    }
  },
  error_response(state, payload) {
    state.error = payload;
  },
};
