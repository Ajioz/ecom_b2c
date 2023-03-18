import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./Redux/store";
import { Provider } from "react-redux";
import * as serviceWorker from './serviceWorker';
import { subscribeUser } from './subscription';

// import swDev from './swDev'

ReactDOM.render(
    <Provider store = {store}>
        <App />
    </Provider>,
document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// swDev();

serviceWorker.register();
subscribeUser();