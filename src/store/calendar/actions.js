import userSettingsActionTypes from "./actions.types";

export const changeActiveDate = newDate => ({
    type: userSettingsActionTypes.CHANGE_ACTIVE_DATE,
    newDate
});