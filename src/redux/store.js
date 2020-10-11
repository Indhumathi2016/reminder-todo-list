import { createStore, combineReducers } from 'redux';
import reducers from './reducers';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();


const appReducer = combineReducers({
  ...reducers,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
);

export { store, history };
