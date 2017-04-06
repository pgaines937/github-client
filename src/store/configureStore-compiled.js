"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reduxForm = require("redux-form");

var _reduxThunk = require("redux-thunk");

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require("redux-logger");

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _repos = require("../reducers/repos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = (0, _reduxLogger2.default)();
var rootReducer = (0, _redux.combineReducers)({
  reposQuery: _repos.reposQuery,
  reposSort: _repos.reposSort,
  reposOrder: _repos.reposOrder,
  selectedReposPage: _repos.selectedReposPage,
  reposByPage: _repos.reposByPage,
  form: _reduxForm.reducer
});

var initialState = {};

function configureStore() {
  var store = void 0;

  if (module.hot) {
    store = (0, _redux.createStore)(rootReducer, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, logger), window.devToolsExtension ? window.devToolsExtension() : function (f) {
      return f;
    }));
  } else {
    store = (0, _redux.createStore)(rootReducer, initialState, (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default), function (f) {
      return f;
    }));
  }

  return store;
}

//# sourceMappingURL=configureStore-compiled.js.map