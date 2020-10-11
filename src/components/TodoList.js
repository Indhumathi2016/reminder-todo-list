import React from 'react';
import { Button, Col, Row } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NoRecord } from '../App.style';
import actions from '../redux/Todo/actions';
import { store } from '../redux/store';
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';

function TodoList() {
  const { todos, isShowAddModal } = useSelector((state) => state.Todo);
  function onAdd() {
    store.dispatch({ type: actions.SET_ADD_MODAL_VISIBLE, payload: true });
  }
  return (
    <>
      <div className={'button'}>
        <Button type="primary" onClick={onAdd}>
          + Add
        </Button>
      </div>
      {todos.length ? (
        <Row gutter={[20, 20]}>
          {todos.map((todo, index) => (
            <Col span={6}>
              <Todo todo={todo} index={index} />
            </Col>
          ))}
        </Row>
      ) : (
        <NoRecord>
          <div>No records found!</div>
        </NoRecord>
      )}
      <AddTodo isShowAddModal={isShowAddModal} />
    </>
  );
}
TodoList.defaultProps = {
  todos: [],
  isShowAddModal: 0,
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  isShowAddModal: PropTypes.bool.isRequired,
};
export default TodoList;
