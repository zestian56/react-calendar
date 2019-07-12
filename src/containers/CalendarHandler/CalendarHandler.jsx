import React from "react";
import { useSelector,useDispatch } from "react-redux";
import moment from "moment";

import Calendar from "../../components/Calendar/Calendar";
import { calendarActions } from "../../store/calendar";

const reminders = [
  {
    id: 0,
    date: "18-07-19",
    hour: "5:30:00",
    color: "red",
    city: "NY",
    text: "Recordar bailar"
  },
  {
    id: 1,
    date: "18-07-19",
    hour: "8:30:00",
    color: "blue",
    city: "NY",
    text: "Recordar bailar"
  }, {
    id: 2,
    date: "18-07-19",
    hour: "5:35:00",
    color: "yellow",
    city: "NY",
    text: "Recordar bailar"
  },{
    id: 11,
    date: "18-07-19",
    hour: "10:35:00",
    color: "yellow",
    city: "NY",
    text: "Recordar bailar"
  },
  {
    id: 10,
    date: "18-07-19",
    hour: "11:35:00",
    color: "yellow",
    city: "NY",
    text: "Recordar bailar"
  },{
    id: 12,
    date: "18-07-19",
    hour: "10:10:00",
    color: "yellow",
    city: "NY",
    text: "Recordar bailar"
  },
  {
    id: 3,
    date: "10-07-19",
    hour: "5:30:00",
    color: "green",
    city: "NY",
    text: "Recordar bailar"
  }

]

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

  return <Calendar activeDate={activeDate} onNextClick={handleNext} onBackClick={handleBack} reminders={reminders}/>;
}
