import actions from './actions';
import { setItemLocal } from '../../components/helper';

const initState = {
  todos: JSON.parse(
    localStorage.getItem('todos') ? localStorage.getItem('todos') : '[]',
  ),
  isShowAddModal: false,
};

export default function todoReducer(state = initState, action) {
  switch (action.type) {
    case actions.SET_ADD_MODAL_VISIBLE:
      return {
        ...state,
        isShowAddModal: action.payload,
      };
    case actions.ADD_TODO:
      const updatedTodos = state.todos.concat(action.payload);
      setItemLocal('todos', updatedTodos);
      return {
        ...state,
        todos: updatedTodos,
      };
    case actions.MARK_AS_COMPLETE:
      const updatedTodo = state.todos.map((todo) => {
        if (todo.id === action.todo.id) {
          todo.status = 'completed';
        }
        return todo;
      });
      setItemLocal('todos', updatedTodo);
      return {
        ...state,
        todos: updatedTodo,
      };
    case actions.DELETE_TODO:
      const filteredTodos = state.todos.filter((todo) => todo.id !== action.id);
      setItemLocal('todos', filteredTodos);
      return {
        ...state,
        todos: filteredTodos,
      };
    default:
      return state;
  }
}
