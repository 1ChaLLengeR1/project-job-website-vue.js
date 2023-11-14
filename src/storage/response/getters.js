export default {
  get_list_settlement(state) {
    return state.array_settlement;
  },
  get_flats(state) {
    return state.array_flats;
  },
  get_renting_users(state) {
    return state.array_renting_user;
  },
  response_error(state) {
    if (state.error.error) {
      return state.error;
    }
    return false;
  },
};
