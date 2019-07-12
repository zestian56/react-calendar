import React from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";

import Calendar from "../../components/Calendar/Calendar";
import { calendarActions } from "../../store/calendar";

export default function CalendarHandler() {
  const { activeDate } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  function handleNext(){
    const newDate = moment(activeDate).add(1,"months")
    dispatch(calendarActions.changeActiveDate(newDate));
  }
  function handleBack(){
    const newDate = moment(activeDate).subtract(1, "months")
    dispatch(calendarActions.changeActiveDate(newDate));
  }

  return <Calendar activeDate={activeDate} onNextClick={handleNext} onBackClick={handleBack} />;
}
