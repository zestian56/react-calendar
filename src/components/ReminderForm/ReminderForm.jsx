import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import classes from "./ReminderForm.module.scss";
import { Form, Input, Button, DatePicker, TimePicker, Select } from "antd";
import { CirclePicker } from "react-color";
import moment from "moment";

const cities = [
  {
    value: "cali",
    label: "Cali"
  },
  {
    value: "jamundi",
    label: "Jamundi"
  }
];

function ReminderForm(props) {
  const {
    reminder,
    onCancelClick,
    onDeleteClick,
    onSubmit,
    form: { getFieldDecorator, validateFieldsAndScroll }
  } = props;

  function handleSubmit(e) {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        onSubmit({ ...values, new: reminder.new });
      }
    });
  }
  return (
    <Form className={classes.root} onSubmit={handleSubmit}>
      <div className={classes.formSection}>
        <Form.Item>
          {getFieldDecorator("date", {
            initialValue: reminder.date
              ? moment(reminder.date, "DD-MM-YY")
              : undefined,
            rules: [{ required: true, message: "Please input a date!" }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("hour", {
            initialValue: reminder.hour
              ? moment(reminder.hour, "HH:mm:ss")
              : undefined,
            rules: [{ required: true, message: "Please input an hour!" }]
          })(<TimePicker />)}
        </Form.Item>
      </div>
      <Form.Item>
        {getFieldDecorator("text", {
          initialValue: reminder.text || "",
          rules: [{ required: true, message: "Please input your Password!" }]
        })(<Input type="text" placeholder="Description" />)}
      </Form.Item>
      <div className={classes.formSection}>
        <Form.Item className={classes.select}>
          {getFieldDecorator("city", {
            initialValue: reminder.city || undefined,
            rules: [{ required: true, message: "Please select a City!" }]
          })(
            <Select placeholder="Select a city">
              {cities.map(city => (
                <Select.Option value={city.value} key={city.value}>
                  {city.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <div className={classes.weatherContainer}> </div>
      </div>
      <div className={clsx(classes.formSection, classes.colorContainer)}>
        <div className={classes.select}> Select a color :</div>

        <Form.Item>
          {getFieldDecorator("color", {
            initialValue: reminder.color || "#f44336",
            getValueFromEvent: color => color.hex,
            valuePropName: "color",
            rules: [{ required: true, message: "Please select a City!" }]
          })(
            <CirclePicker
              className={classes.color}
              colors={[
                "#f44336",
                "#e91e63",
                "#9c27b0",
                "#673ab7",
                "#3f51b5",
                "#2196f3",
                "#DBDF00",
                "#A4DD00",
                "#68CCCA",
                "#73D8FF",
                "#AEA1FF",
                "#FDA1FF"
              ]}
            />
          )}
        </Form.Item>
      </div>
      <div className={classes.formFooter}>
        <div>
          {!reminder.new && (
            <Button type="danger" onClick={onDeleteClick}>
              Delete
            </Button>
          )}
        </div>
        <div>
          <Button className={classes.cancelButton} onClick={onCancelClick}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}

ReminderForm.propTypes = {
  reminder: PropTypes.any,
  onSubmit: PropTypes.func.isRequired
};
ReminderForm.defaultProps = {
  reminder: {}
};

export default Form.create({ name: "reminder-form" })(ReminderForm);
