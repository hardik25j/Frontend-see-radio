const initialState = {
  apiLoader: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'API_LOADER_INACTIVE':
      return { ...state, apiLoader: false }
    case 'API_LOADER_ACTIVE':
      return { ...state, apiLoader: true }
    default:
      return state;
  }
}