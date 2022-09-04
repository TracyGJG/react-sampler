function INCREMENT(state) {
  return { ...state, count: state.count + 1 };
}

function DECREMENT(state) {
  return { ...state, count: state.count - 1 };
}

function USER_INPUT(state, action) {
  return { ...state, userInput: action.payload };
}

function TOGGLE_COLOR(state) {
  return { ...state, color: !state.color };
}

const actionTypes = {
  INCREMENT,
  DECREMENT,
  USER_INPUT,
  TOGGLE_COLOR
};

export const reducerActions = Object.keys(actionTypes).reduce(
  (actions, actionType) => ({ ...actions, [actionType]: actionType }),
  {}
);

export const reducer = (state, action) => {
  return actionTypes[action.type]?.(state, action) ?? state;
};
