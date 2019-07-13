import calendarActionTypes from "./actions.types";
import moment from "moment";

const initialState = {
    activeDate: moment(),
    reminders: [{
        id: "0",
        date: "01-07-19",
        hour: "05:30:00",
        color: "#f44336",
        city: "cali",
        text: "Recordar bailar"
    }]
};

const updateReminder = (state, reminderToUpdate) => {
    const newReminders = [...state.reminders];
    const reminderIndex = newReminders.findIndex(r => r.id === reminderToUpdate.id);
    newReminders[reminderIndex] = reminderToUpdate;

    console.log(newReminders, reminderToUpdate, reminderIndex)
    return {...state, reminders: newReminders };
};

const deleteReminder = (state, reminderId) => {
    const newReminders = state.reminders.filter(r => r.id !== reminderId);
    return {...state, reminders: newReminders };
};

const addReminder = (state, reminder) => {
    const newReminders = [...state.reminders, reminder];
    return {
        ...state,
        reminders: newReminders
    };
};
export default function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case calendarActionTypes.CHANGE_ACTIVE_DATE:
            return {...state, activeDate: action.newDate };
        case calendarActionTypes.EDIT_REMINDER:
            return updateReminder(state, action.reminder);
        case calendarActionTypes.ADD_REMINDER:
            return addReminder(state, action.reminder);
        case calendarActionTypes.DELETE_REMINDER:
            return deleteReminder(state, action.reminderId);
        default:
            return state;
    }
}