import React from 'react';
import { AppStyles } from './App.style';
import TodoList from './components/TodoList';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { GlobalStyles } from './App.style';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppStyles>
        <TodoList />
      </AppStyles>
    </Provider>
  );
}

export default App;
