import actions from './actions';

const initState = {
  todos: [],
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_MENU: {
      return {
        ...state,
        currentKey: action.payload,
      };
    }
    default:
      return state;
  }
}
