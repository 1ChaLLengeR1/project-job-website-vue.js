export default {
  get_list_settlement(state) {
    return state.array_settlement;
  },
  response_error(state) {
    if (state.error.error) {
      return state.error;
    }
    return false
    
  },
};
