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
  get_renting_users(state, payload) {
    state.array_renting_user = [];
    for (const key of payload) {
      state.array_renting_user.push(key);
    }
  },
  get_basic_rental_values(state, payload) {
    state.array_basic_rental_values = [];
    for (const key of payload) {
      state.array_basic_rental_values.push(key);
    }
  },
  error_response(state, payload) {
    state.error = payload;
  },
};
