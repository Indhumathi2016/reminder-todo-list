import React, { useState } from 'react';
import { Checkbox, Modal } from 'antd';
import PropTypes from 'prop-types';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { TodoCard } from '../App.style';
import actions from '../redux/Todo/actions';
import { store } from '../redux/store';

function Todo({ todo, index }) {
  const [days, setDays] = useState(0),
    [hours, setHours] = useState(0),
    [minutes, setMinutes] = useState(0),
    [seconds, setSeconds] = useState(0);
  const countDownDate = moment(todo.time),
    isCompleted = todo.status === 'completed';
  const timer = setInterval(function () {
    // Get today's date and time
    const now = moment();
    // Find the distance between now and the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // If the count down is finished, clear the interval
    if (distance < 0) {
      clearInterval(timer);
    }
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }, 1000);

  function padStart(time) {
    return String(time).padStart(2, '0');
  }
  function getBackground() {
    if (isCompleted) {
      return '#52c41a';
    } else if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      return '#f5222d';
    } else if (days <= 0 && hours <= 0) {
      return '#faad14';
    }
    return '#ffffff';
  }
  function onChangeStatus(value) {
    store.dispatch({
      type: actions.MARK_AS_COMPLETE,
      payload: true,
      todo: todo,
    });
  }
  function onDelete() {
    Modal.confirm({
      title: 'Delete',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: (close) => {
        store.dispatch({ type: actions.DELETE_TODO, id: todo.id });
        close();
      },
    });
  }
  return (
    <TodoCard
      key={index}
      background={getBackground}
      title={
        <>
          <Checkbox
            onChange={onChangeStatus}
            disabled={isCompleted}
            checked={isCompleted}
          />
          <div>{todo.title}</div>
          <DeleteOutlined
            onClick={onDelete}
            style={{ pointerEvents: isCompleted }}
          />
        </>
      }
    >
      <div>
        <div>{todo.message}</div>
        {days >= 0 ? (
          <div className={'time-remain'}>
            Time Remaining:{' '}
            <span>
              {' '}
              {`${days}d ${padStart(hours)}h ${padStart(minutes)}m ${padStart(
                seconds,
              )}s`}
            </span>
          </div>
        ) : (
          <div>Time exceeds</div>
        )}
      </div>
    </TodoCard>
  );
}
Todo.defaultProps = {
  todo: {},
  index: 0,
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
export default Todo;
