import React from 'react';
import {AppStyles} from "./App.style";
import TodoList from './components/TodoList';
import {store} from "./redux/store";
import {Provider} from "react-redux";

function App() {
  return (
      <Provider store={store}>
    <AppStyles>
        <TodoList />
    </AppStyles>
      </Provider>
  );
}

export default App;
