import React from 'react';
import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import { startCase } from 'lodash';
import moment from 'moment';
import { store } from '../redux/store';
import actions from '../redux/Todo/actions';
import { generateRandomId } from '../components/helper';
import PropTypes from 'prop-types';
import Todo from '../components/Todo';

const { Option } = Select;

function AddTodo({ isShowAddModal }) {
  const types = ['success', 'error', 'warning'];
  function handleCancel() {
    store.dispatch({ type: actions.SET_ADD_MODAL_VISIBLE, payload: false });
  }
  function handleConfirm(values) {
    store.dispatch({
      type: actions.ADD_TODO,
      payload: { ...values, status: 'started', id: generateRandomId() },
    });
    store.dispatch({ type: actions.SET_ADD_MODAL_VISIBLE, payload: false });
  }
  const disabledDate = (current) =>
    current && current < moment().startOf('day');
  return (
    <Modal
      title={<div>Add</div>}
      visible={isShowAddModal}
      width={500}
      footer={[
        <Button form="add-todo" key="submit" type="primary" htmlType="submit">
          Add
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
      ]}
      destroyOnClose={true}
    >
      <Form
        id="add-todo"
        onFinish={handleConfirm}
        colon={false}
        layout={'vertical'}
        hideRequiredMark={true}
        name={'add-todo'}
      >
        <Form.Item
          label={<>Title</>}
          name={'title'}
          validateTrigger={'onBlur'}
          rules={[
            {
              required: true,
              message: "Title can't be blank",
              whitespace: true,
            },
          ]}
        >
          <Input placeholder={'Enter the title'} autoComplete={'off'} />
        </Form.Item>
        <Form.Item
          label={<div>Message</div>}
          name="message"
          validateTrigger={'onBlur'}
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Message can't be blank",
            },
          ]}
        >
          <Input.TextArea
            placeholder={'Enter the message'}
            autoComplete={'off'}
          />
        </Form.Item>
        <Form.Item
          label={<div>Type</div>}
          name="type"
          validateTrigger={'onBlur'}
          rules={[
            {
              required: true,
              whitespace: true,
              message: 'Please select type!',
            },
          ]}
        >
          <Select placeholder={'Select the type'} autoComplete={'off'}>
            {types.map((type) => (
              <Option key={type}>{startCase(type)}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={<div>Time</div>}
          name="time"
          validateTrigger={'onBlur'}
          rules={[
            {
              required: true,
              message: "Time can't be blank",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                let userDate = moment(value);
                let currentDate = moment();
                if (
                  userDate.diff(currentDate, 'day') < 0 &&
                  userDate.diff(currentDate, 'minutes') <= 30
                ) {
                  return Promise.reject(
                    'Time should be greater the 30 mins to the current time',
                  );
                }
                return Promise.resolve('');
              },
            }),
          ]}
        >
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm"
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
Todo.defaultProps = {
  isShowAddModal: false,
};

Todo.propTypes = {
  isShowAddModal: PropTypes.bool.isRequired,
};
export default AddTodo;
