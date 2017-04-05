///////////////////////////////////////////
// jquery and tether for bootstrap to use
// alternative is to link them in index.html
import "bootstrap/dist/css/bootstrap.css";
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Tether = require("tether");
require("bootstrap/dist/js/bootstrap");
/////////////////////////////////////////////

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute } from "react-router";

/////////////////////////////////////////////////////////////////////////
// browserHistory would be preferred over hashHistory, but browserHistory
// would require configuring the server. So we will use hashHistory here.
// Please change to browserHistory if you have your own backend server.
// import {browserHistory as history} from 'react-router';
import { useRouterHistory } from "react-router";
import { createHashHistory } from "history";
const history = useRouterHistory(createHashHistory)();
//////////////////////////////////////////////////////////////////////////

import configureStore from "./store/configureStore";

import App from "./containers/app/App";
import ReposPage from "./containers/repo/ReposPage";
import NotFound from "./containers/misc/NotFound";

import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={ReposPage} />

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
