import { createStore, combineReducers, compose } from "redux";
import { calendarReducer } from "./calendar";


const metaReducers = combineReducers({
    calendar: calendarReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    metaReducers,
    composeEnhancers()
);

export default store;