import moment from "moment";

export function getFirstDayOfTheMonth(date) {
    const firstDay = moment(date)
        .startOf("month")
        .format("d");
    return firstDay;
}

export function getDayOfLastMonthFromLast(date, indexToSubstract) {
    const day = moment(date)
        .subtract(1, "months")
        .endOf("month")
        .subtract(indexToSubstract, "days");
    return day;
}
export function getDayOfNextMonthFromStart(date, indexToAdd) {
    const day = moment(date)
        .add(1, "months")
        .startOf("month")
        .add(indexToAdd, "days");
    return day;
}

export function getWeekDays() {
    const weekDays = moment.weekdays();
    return weekDays;
}

export function getMonthAndYear(date) {
    return moment(date).format("MMMM YYYY");
}

export function getDaysInMonth(date) {
    const daysInMonth = moment(date).daysInMonth();
    return daysInMonth;
}

export function getDayInMonth(date, dayIndex) {
    const dayInMonth = moment(date)
        .startOf("month")
        .add(dayIndex, "days");
    return dayInMonth;
}

export function getHourInMilitaryTime(hour) {
    return +moment(hour, "HH:mm:ss").format("hhmmss");
}