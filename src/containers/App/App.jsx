import React from "react";
import { Provider } from "react-redux";
import CalendarHandler from "../CalendarHandler/CalendarHandler";
import store from "../../store";

function App() {
  return (
    <Provider store={store}>
      <CalendarHandler />
    </Provider>
  );
}

export default App;
