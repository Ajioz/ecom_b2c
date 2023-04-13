import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { subscribeUser } from './subscription';

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
document.getElementById("root"));

serviceWorker.register();
subscribeUser();