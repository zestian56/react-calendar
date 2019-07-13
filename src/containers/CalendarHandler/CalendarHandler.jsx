import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Modal } from "antd";

import ReminderForm from "../../components/ReminderForm/ReminderForm";
import Calendar from "../../components/Calendar/Calendar";
import { calendarActions } from "../../store/calendar";
import {
  addReminder,
  editReminder,
  deleteReminder
} from "../../store/calendar/actions";


export default function CalendarHandler() {
  const { activeDate, reminders } = useSelector(state => state.calendar);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [activeReminder, setActiveReminder] = useState({});
  const dispatch = useDispatch();

  function handleNext() {
    const newDate = moment(activeDate).add(1, "months");
    dispatch(calendarActions.changeActiveDate(newDate));
  }
  function handleBack() {
    const newDate = moment(activeDate).subtract(1, "months");
    dispatch(calendarActions.changeActiveDate(newDate));
  }

  function handleAddReminder(day) {
    setActiveReminder({
      date: day.format("DD-MM-YY"),
      new: true
    });
    setShowReminderModal(true);
  }

  function handleReminderClick(reminder) {
    setActiveReminder(reminder);
    setShowReminderModal(true);
  }

  function handleCancelModal() {
    setShowReminderModal(false);
  }

  function handleReminderFormSubmit(values) {
    const newReminder = {
      ...activeReminder,
      ...values,
      date: values.date.format("DD-MM-YY"),
      hour: values.hour.format("HH:mm:ss")
    };
    const isNew = newReminder.new;
    delete newReminder.new;
    if (isNew) {
      dispatch(addReminder(newReminder));
    } else {
      dispatch(editReminder(newReminder));
    }
    handleCancelModal();
  }

  function handleReminderDelete() {
    dispatch(deleteReminder(activeReminder.id));
    setActiveReminder({});
    handleCancelModal();
  }

  return (
    <>
      <Calendar
        activeDate={activeDate}
        onNextClick={handleNext}
        onBackClick={handleBack}
        reminders={reminders}
        onAddReminder={handleAddReminder}
        onReminderClick={handleReminderClick}
      />
      {showReminderModal && <Modal
        centered
        visible={showReminderModal}
        title={activeReminder.new ? "New Reminder" : "Edit reminder"}
        footer={null}
        onCancel={handleCancelModal}
      >
        <ReminderForm
          reminder={activeReminder}
          onDeleteClick={handleReminderDelete}
          onCancelClick={handleCancelModal}
          onSubmit={handleReminderFormSubmit}
        />
      </Modal>}
    </>
  );
}
