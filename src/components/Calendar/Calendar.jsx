import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import { Icon, Button } from "antd";

import {
  getWeekDays,
  getFirstDayOfTheMonth,
  getDaysInMonth,
  getDayOfLastMonthFromLast,
  getDayOfNextMonthFromStart,
  getMonthAndYear,
  getDayInMonth,
  getHourInMilitaryTime
} from "../../utils/date";

import classes from "./Calendar.module.scss";

function findReminderInDay(day, reminders) {
  return reminders.filter(r => {
    return day.isSame(moment(r.date, "DD-MM-YY"));
  });
}

const TOTAL_WEEK_DAYS = 7;

function Calendar(props) {
  const {
    activeDate,
    onNextClick,
    onBackClick,
    reminders,
    onAddReminder,
    onReminderClick
  } = props;

  const remindersInCalendar = [];
  const daysInCalendar = [];
  const firstDayOfTheMonth = getFirstDayOfTheMonth(activeDate);

  function getReminderCol(dayReminders, day, key) {
    return (
      <div
        className={clsx(classes.monthCol, classes.reminderCol)}
        key={`reminder-${day.format("DD-MM")}-${key}`}
      >
        {dayReminders
          .sort(
            (r1, r2) =>
              getHourInMilitaryTime(r1.hour) - getHourInMilitaryTime(r2.hour)
          )
          .map((r, rKey) => (
            <div
              className={clsx(classes.reminder)}
              style={{ backgroundColor: r.color }}
              key={`reminders-${rKey}`}
              onClick={() => onReminderClick(r)}
            >
              {`${r.hour} - ${r.text}`}
            </div>
          ))}
      </div>
    );
  }
  function getDayCol(day, className = "") {
    return (
      <div
        className={clsx(classes.monthCol, className)}
        key={`col-${day.format("DD-MM-YY")}`}
        onClick={() => onAddReminder(day)}
      >
        {day.format("D")}
      </div>
    );
  }

  for (let i = 0; i < firstDayOfTheMonth; i++) {
    const dayInLastMonth = getDayOfLastMonthFromLast(
      activeDate,
      firstDayOfTheMonth - i - 1
    );
    const dayReminders = findReminderInDay(dayInLastMonth, reminders);
    remindersInCalendar.push(getReminderCol(dayReminders, dayInLastMonth, i));
    daysInCalendar.push(getDayCol(dayInLastMonth, classes.notInMonthCol));
  }

  for (let i = 0; i < getDaysInMonth(activeDate); i++) {
    const dayInMonth = getDayInMonth(activeDate, i);
    const dayReminders = findReminderInDay(dayInMonth, reminders);

    remindersInCalendar.push(getReminderCol(dayReminders, dayInMonth, i));
    daysInCalendar.push(getDayCol(dayInMonth));
  }

  if (daysInCalendar.length % TOTAL_WEEK_DAYS !== 0) {
    const numberOfWeeks = Math.ceil(daysInCalendar.length / 7);
    const length = daysInCalendar.length;
    for (let i = 0; i < numberOfWeeks * 7 - length; i++) {
      const dayOfNextMonth = getDayOfNextMonthFromStart(activeDate, i);
      const dayReminders = findReminderInDay(dayOfNextMonth, reminders);
      remindersInCalendar.push(getReminderCol(dayReminders, dayOfNextMonth, i));
      daysInCalendar.push(getDayCol(dayOfNextMonth, classes.notInMonthCol));
    }
  }

  let rows = [];
  let cols = [];
  let reminderCols = [];

  daysInCalendar.forEach((day, i) => {
    if (i % TOTAL_WEEK_DAYS === 0 && i !== 0) {
      rows.push(
        <div className={classes.monthRow} key={`row-${rows.length}`}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{reminderCols} </div>
        </div>
      );
      cols = [];
      reminderCols = [];
      reminderCols.push(remindersInCalendar[i]);
      cols.push(day);
    } else {
      cols.push(day);
      reminderCols.push(remindersInCalendar[i]);
    }
    if (i === daysInCalendar.length - 1) {
      rows.push(
        <div className={classes.monthRow} key={`row-${rows.length}`}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{reminderCols} </div>
        </div>
      );
    }
  });

  return (
    <div className={classes.root}>
      <div className={clsx("row", classes.yearContainer)}>
        <div>
          <Button type="link" size="default" onClick={onBackClick}>
            <Icon type="left" />
          </Button>
          <span className={classes.monthTitle}>
            {getMonthAndYear(activeDate)}
          </span>
          <Button type="link" size="default" onClick={onNextClick}>
            <Icon type="right" />
          </Button>
        </div>
      </div>
      <div className={clsx("row", classes.monthHead)}>
        {getWeekDays().map(weekDay => (
          <div key={weekDay} className={classes.weekdayCol}>
            {weekDay}
          </div>
        ))}
      </div>
      <div className={clsx(classes.monthBody)}>{rows}</div>
    </div>
  );
}

Calendar.propTypes = {
  activeDate: PropTypes.oneOfType([
    PropTypes.instanceOf(moment),
    PropTypes.instanceOf(Date)
  ]),
  onNextClick: PropTypes.func,
  onBackClick: PropTypes.func,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      date: PropTypes.string,
      hour: PropTypes.string,
      color: PropTypes.string,
      city: PropTypes.string,
      text: PropTypes.string
    })
  ),
  onReminderClick: PropTypes.func,
  onAddReminder: PropTypes.func
};

Calendar.defaultProps = {
  activeDate: moment(),
  reminders: [],
  onNextClick: () => {},
  onBackClick: () => {},
  onReminderClick: () => {},
  onAddReminder: () => {}
};

export default Calendar;
