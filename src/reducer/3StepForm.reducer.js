const initialSate = {
  step: 1,
  name: '',
};

export default (state = initialSate, action) => {
  switch (action.type) {
    case 'STEP':
      if (state.step === 3)
        return{ ...state, step: 1 }
      return { ...state, step: state.step + 1 }
    case 'NAME':
      return { ...state, name: action.payload }
    default:
      return state;
  }
}
