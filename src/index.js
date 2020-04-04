import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/index";
// import Route from './router';

import "./index.css";
import App from "./App";

import storage from "./utils/storageUtil";
import memoryUtil from "./utils/menoryUtil";

import * as serviceWorker from "./serviceWorker";

memoryUtil.user = storage.getUser();
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(<Route />, document.getElementById('root'));
// if (module.hot) {
//     module.hot.accept('./router/', () => {
//         ReactDOM.render(Route);
//     })
// }
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
