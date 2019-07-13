import calendarActionTypes from "./actions.types";
import moment from "moment";

const initialState = {
    activeDate: moment(),
    reminders: []
};

const updateReminder = (state, reminderToUpdate) => {
    const newReminders = [...state.reminders];
    const reminderIndex = newReminders.findIndex(
        r => r.id === reminderToUpdate.id
    );
    newReminders[reminderIndex] = reminderToUpdate;
    return {...state, reminders: newReminders };
};

const deleteReminder = (state, reminderId) => {
    const newReminders = state.reminders.filter(r => r.id !== reminderId);
    return {...state, reminders: newReminders };
};

const addReminder = (state, reminder) => {
    const newReminder = {...reminder, id: Math.random() * 10000 };
    const newReminders = [...state.reminders, newReminder];
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