import moment from "moment";

export function getFirstDayOfTheMonth(date) {
    const firstDay = moment(date)
        .startOf("month")
        .format("DD");
    return firstDay;
}

export function getDayOfLastMonthFromLast(date, indexToSubstract) {
    const day = moment(date)
        .subtract(1, "months")
        .endOf("month")
        .subtract(indexToSubstract, "days")
        .format("DD");
    return day;
}
export function getDayOfNextMonthFromStart(date, indexToAdd) {
    const day = moment(date)
        .add(1, "months")
        .startOf("month")
        .add(indexToAdd, "days")
        .format("D");
    return day;
}

export function getWeekDays() {
    const weekDays = moment.weekdays();
    return weekDays;
}

export function getDaysInMonth(date) {
    const daysInMonth = moment(date).daysInMonth();
    return daysInMonth;
}