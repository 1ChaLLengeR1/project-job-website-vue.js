export default {
  get_list_settlement(state) {
    return state.array_settlement;
  },
  get_flats(state) {
    return state.array_flats;
  },
  response_error(state) {
    if (state.error.error) {
      return state.error;
    }
    return false;
  },
};
