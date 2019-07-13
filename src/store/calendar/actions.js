import userSettingsActionTypes from "./actions.types";

export const changeActiveDate = newDate => ({
    type: userSettingsActionTypes.CHANGE_ACTIVE_DATE,
    newDate
});
export const addReminder = reminder => ({
    type: userSettingsActionTypes.ADD_REMINDER,
    reminder
});
export const deleteReminder = reminderId => ({
    type: userSettingsActionTypes.DELETE_REMINDER,
    reminderId
});
export const editReminder = (reminder) => ({
    type: userSettingsActionTypes.EDIT_REMINDER,
    reminder
});