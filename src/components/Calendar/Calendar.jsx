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
  getDayInMonth
} from "../../utils/date";

import classes from "./Calendar.module.scss";

function findReminderInDay(day, reminders) {
  return reminders.filter(r => {
    return day.isSame(moment(r.date, "DD-MM-YY"));
  });
}

const TOTAL_WEEK_DAYS = 7;

function Calendar(props) {
  const { activeDate, onNextClick, onBackClick, reminders } = props;

  const lastMonthDays = [];
  const daysInMonth = [];
  const remindersInCalendar = [];
  const nextMonthDays = [];
  const firstDayOfTheMonth = getFirstDayOfTheMonth(activeDate);

  function getReminderCol(dayReminders) {
    return (
      <div className={clsx(classes.monthCol, classes.reminderCol)} >
        {dayReminders.map((r, rKey) => (
          <div
            className={clsx(classes.reminder)}
            style={{ backgroundColor: r.color }}
            key={`reminders-${rKey}`}
          >
            {r.text}
          </div>
        ))}
      </div>
    );
  }

  for (let i = 0; i < firstDayOfTheMonth; i++) {
    const dayInLastMonth = getDayOfLastMonthFromLast(
      activeDate,
      firstDayOfTheMonth - i - 1
    );
    const dayReminders = findReminderInDay(dayInLastMonth, reminders);
    remindersInCalendar.push(getReminderCol(dayReminders));

    lastMonthDays.push(
      <div
        className={clsx(classes.monthCol, classes.notInMonthCol)}
        key={`last-month-${i}`}
      >
        {dayInLastMonth.format("DD")}
      </div>
    );
  }

  for (let i = 0; i < getDaysInMonth(activeDate); i++) {
    const dayInMonth = getDayInMonth(activeDate, i);
    const dayReminders = findReminderInDay(dayInMonth, reminders);
    remindersInCalendar.push(getReminderCol(dayReminders));

    daysInMonth.push(
      <div className={clsx(classes.monthCol)} key={`current-month-${i}`}>
        {dayInMonth.format("D")}
      </div>
    );
  }
  let totalDays = [...lastMonthDays, ...daysInMonth];

  if (totalDays.length % TOTAL_WEEK_DAYS !== 0) {
    const numberOfWeeks = Math.ceil(totalDays.length / 7);
    for (let i = 0; i < numberOfWeeks * 7 - totalDays.length; i++) {
      const dayOfNextMonth = getDayOfNextMonthFromStart(activeDate, i);
      const dayReminders = findReminderInDay(dayOfNextMonth, reminders);

      remindersInCalendar.push(getReminderCol(dayReminders));
      nextMonthDays.push(
        <div
          className={clsx(classes.monthCol, classes.notInMonthCol)}
          key={`next-month-${i}`}
        >
          {dayOfNextMonth.format("D")}
        </div>
      );
    }
    totalDays = [...totalDays, ...nextMonthDays];
  }

  let rows = [];
  let cols = [];
  let reminderCols = []

  totalDays.forEach((day, i) => {
    if (i % TOTAL_WEEK_DAYS === 0 && i !== 0) {
      rows.push(
        <div className={classes.monthRow} key={`row-${rows.length}`}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{reminderCols} </div>
        </div>
      );
      cols = [];
      reminderCols = [];
      reminderCols.push(remindersInCalendar[i])
      cols.push(day);
    } else {
      cols.push(day);
      reminderCols.push(remindersInCalendar[i])
    }
    if (i === totalDays.length - 1) {
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
  onBackClick: PropTypes.func
};

Calendar.defaultProps = {
  activeDate: moment(),
  onNextClick: () => {},
  onBackClick: () => {}
};

export default Calendar;
