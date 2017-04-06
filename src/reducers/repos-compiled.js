"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.reposQuery = reposQuery;
exports.reposSort = reposSort;
exports.reposOrder = reposOrder;
exports.selectedReposPage = selectedReposPage;
exports.reposByPage = reposByPage;

var _repos = require("../actions/repos");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reposQuery() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var action = arguments[1];

  switch (action.type) {
    case _repos.SET_REPOS_QUERY:
      return action.query;
    default:
      return state;
  }
}

function reposSort() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var action = arguments[1];

  switch (action.type) {
    case _repos.SET_REPOS_SORT:
      return action.sort;
    default:
      return state;
  }
}

function reposOrder() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var action = arguments[1];

  switch (action.type) {
    case _repos.SET_REPOS_ORDER:
      return action.order;
    default:
      return state;
  }
}

function selectedReposPage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var action = arguments[1];

  switch (action.type) {
    case _repos.SELECT_REPOS_PAGE:
      return action.page;
    default:
      return state;
  }
}

function repos() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    isFetching: false,
    didInvalidate: false,
    totalCount: 0,
    repos: [],
    error: null
  };
  var action = arguments[1];

  switch (action.type) {
    case _repos.INVALIDATE_REPOS_PAGE:
      return (0, _assign2.default)({}, state, {
        didInvalidate: true
      });
    case _repos.REPOS_REQUEST:
      return (0, _assign2.default)({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case _repos.REPOS_SUCCESS:
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        didInvalidate: false,
        totalCount: action.total_count,
        repos: action.repos,
        error: null
      });
    case _repos.REPOS_FAILURE:
      return (0, _assign2.default)({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error
      });
    default:
      return state;
  }
}

function reposByPage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case _repos.INVALIDATE_REPOS_PAGE:
    case _repos.REPOS_REQUEST:
    case _repos.REPOS_SUCCESS:
    case _repos.REPOS_FAILURE:
      return (0, _assign2.default)({}, state, (0, _defineProperty3.default)({}, action.page, repos(state[action.page], action)));
    default:
      return state;
  }
}

//# sourceMappingURL=repos-compiled.js.map