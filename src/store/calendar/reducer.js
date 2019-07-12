import userSettingsActionTypes from "./actions.types";
import moment from "moment";

const initialState = {
    activeDate: moment()
};

export default function calendarReducer(state = initialState, action) {
    switch (action.type) {
        case userSettingsActionTypes.CHANGE_ACTIVE_DATE:
            {
                return {...state, activeDate: action.newDate };
            }
        default:
            return state;
    }
}