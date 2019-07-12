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
  getMonthAndYear
} from "../../utils/date";

import classes from "./Calendar.module.scss";

const TOTAL_WEEK_DAYS = 7;

function Calendar(props) {
  const { activeDate, onNextClick, onBackClick } = props;
  const lastMonthDays = [];
  const daysInMonth = [];
  const nextMonthDays = [];
  const firstDayOfTheMonth = getFirstDayOfTheMonth(activeDate);

  for (let i = 0; i < firstDayOfTheMonth; i++) {
    lastMonthDays.push(
      <div
        className={clsx(classes.monthCol, classes.notInMonthCol)}
        key={`last-month-${i}`}
      >
        {getDayOfLastMonthFromLast(activeDate, firstDayOfTheMonth - i - 1)}
      </div>
    );
  }

  for (let i = 1; i <= getDaysInMonth(activeDate); i++) {
    daysInMonth.push(
      <div className={clsx(classes.monthCol)} key={`current-month-${i}`}>
        {i}
      </div>
    );
  }
  let totalDays = [...lastMonthDays, ...daysInMonth];

  if (totalDays.length % TOTAL_WEEK_DAYS !== 0) {
    const numberOfWeeks = Math.ceil(totalDays.length / 7);
    for (let i = 0; i < numberOfWeeks * 7 - totalDays.length; i++) {
      nextMonthDays.push(
        <div
          className={clsx(classes.monthCol, classes.notInMonthCol)}
          key={`next-month-${i}`}
        >
          {getDayOfNextMonthFromStart(activeDate, i)}
        </div>
      );
    }
    totalDays = [...totalDays, ...nextMonthDays];
  }

  let rows = [];
  let cols = [];

  totalDays.forEach((day, i) => {
    if (i % TOTAL_WEEK_DAYS === 0 && i !== totalDays.length - 1 && i !== 0) {
      rows.push(
        <div className={classes.monthRow} key={`row-${rows.length}`}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{cols} </div>
        </div>
      );
      cols = [];
      cols.push(day);
    } else {
      cols.push(day);
    }
    if (i === totalDays.length - 1) {
      rows.push(
        <div className={classes.monthRow} key={`row-${rows.length}`}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{cols} </div>
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
