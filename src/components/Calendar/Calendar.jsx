import React, { useState } from "react";
import moment from "moment";
import clsx from "clsx";

import classes from "./Calendar.module.scss";
import {
  getWeekDays,
  getFirstDayOfTheMonth,
  getDaysInMonth,
  getDayOfLastMonthFromLast,
  getDayOfNextMonthFromStart
} from "../../utils/date";

const TOTAL_GRID_SLOTS = 35;

export default function Calendar() {
  const [dateObject, setDateObject] = useState(moment());

  const lastMonthDays = [];
  const daysInMonth = [];
  const nextMonthDays = [];

  for (let i = 0; i < getFirstDayOfTheMonth(dateObject); i++) {
    lastMonthDays.push(
      <div className={clsx(classes.monthCol, classes.notInMonthCol)} key={i}>
        {getDayOfLastMonthFromLast(dateObject, i)}
      </div>
    );
  }
  for (let i = 1; i < getDaysInMonth(dateObject); i++) {
    daysInMonth.push(
      <div className={clsx(classes.monthCol)} key={i} monthColBg>
        {i}
      </div>
    );
  }
  let totalDays = [...lastMonthDays, ...daysInMonth];

  if (totalDays.length < TOTAL_GRID_SLOTS) {
    for (let i = 0; i < TOTAL_GRID_SLOTS - totalDays.length; i++) {
      nextMonthDays.push(
        <div className={clsx(classes.monthCol, classes.notInMonthCol)}>
          {getDayOfNextMonthFromStart(dateObject, i)}
        </div>
      );
    }
    totalDays = [...totalDays, ...nextMonthDays];
  }

  let rows = [];
  let cols = [];

  totalDays.forEach((day, i) => {
    if (i % 7 === 0 && i !== totalDays.length - 1 && i !== 0) {
      rows.push(
        <div className={classes.monthRow}>
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
        <div className={classes.monthRow}>
          <div className={classes.monthRowBg}> {cols}</div>
          <div className={classes.monthRowContent}>{cols} </div>
        </div>
      );
    }
  });

  return (
    <div className={classes.root}>
      <div className={clsx("row", classes.yearContainer)}>
        <div>{dateObject.format("MMMM YYYY")}</div>
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
