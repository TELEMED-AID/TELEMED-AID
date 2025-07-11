import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {store, persistor} from "./Redux/store";
import { Provider } from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));


// Render the app and run the check for old messages
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App/>
    </PersistGate>
  </Provider>,
);