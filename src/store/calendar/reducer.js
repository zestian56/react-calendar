import userSettingsActionTypes from "./actions.types";
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
        },
        {
            id: "1",
            date: "18-07-19",
            hour: "08:30:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        },
        {
            id: "2",
            date: "18-07-19",
            hour: "05:35:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        },
        {
            id: "11",
            date: "18-07-19",
            hour: "10:35:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        },
        {
            id: "10",
            date: "18-07-19",
            hour: "11:35:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        },
        {
            id: "12",
            date: "18-07-19",
            hour: "10:10:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        },
        {
            id: "3",
            date: "10-07-19",
            hour: "05:30:00",
            color: "#f44336",
            city: "cali",
            text: "Recordar bailar"
        }
    ]
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