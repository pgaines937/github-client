"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPOS_FAILURE = exports.REPOS_SUCCESS = exports.REPOS_REQUEST = exports.INVALIDATE_REPOS_PAGE = exports.SELECT_REPOS_PAGE = exports.SET_REPOS_ORDER = exports.SET_REPOS_SORT = exports.SET_REPOS_QUERY = undefined;
exports.reposQuery = reposQuery;
exports.reposSort = reposSort;
exports.reposOrder = reposOrder;
exports.selectReposPage = selectReposPage;
exports.invalidateReposPage = invalidateReposPage;
exports.fetchReposIfNeeded = fetchReposIfNeeded;
exports.fetchReposNow = fetchReposNow;
exports.setReposSearchTerms = setReposSearchTerms;

var _apiUtils = require("../utils/apiUtils");

var SET_REPOS_QUERY = exports.SET_REPOS_QUERY = "SET_REPOS_QUERY";
var SET_REPOS_SORT = exports.SET_REPOS_SORT = "SET_REPOS_SORT";
var SET_REPOS_ORDER = exports.SET_REPOS_ORDER = "SET_REPOS_ORDER";
var SELECT_REPOS_PAGE = exports.SELECT_REPOS_PAGE = "SELECT_REPOS_PAGE";
var INVALIDATE_REPOS_PAGE = exports.INVALIDATE_REPOS_PAGE = "INVALIDATE_REPOS_PAGE";

var REPOS_REQUEST = exports.REPOS_REQUEST = "REPOS_REQUEST";
var REPOS_SUCCESS = exports.REPOS_SUCCESS = "REPOS_SUCCESS";
var REPOS_FAILURE = exports.REPOS_FAILURE = "REPOS_FAILURE";

function reposQuery(query) {
  return {
    type: SET_REPOS_QUERY,
    query: query
  };
}

function reposSort(sort) {
  return {
    type: SET_REPOS_SORT,
    sort: sort
  };
}

function reposOrder(order) {
  return {
    type: SET_REPOS_ORDER,
    order: order
  };
}

function selectReposPage(page) {
  return {
    type: SELECT_REPOS_PAGE,
    page: page
  };
}

function invalidateReposPage(page) {
  return {
    type: INVALIDATE_REPOS_PAGE,
    page: page
  };
}

function reposRequest(page) {
  return {
    type: REPOS_REQUEST,
    page: page
  };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function reposSuccess(page) {
  return function (payload) {
    return {
      type: REPOS_SUCCESS,
      page: page,
      repos: payload.items,
      totalCount: payload.total_count
    };
  };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function reposFailure(page) {
  return function (error) {
    return {
      type: REPOS_FAILURE,
      page: page,
      error: error
    };
  };
}

var API_ROOT = "https://api.github.com";

function fetchRepos(page) {
  var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "stars:>10000";
  var sort = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "stars";
  var order = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "desc";

  var url = API_ROOT + "/search/repositories?q=" + query + "&sort=" + sort + "&order=" + order + "&page=" + page;
  return (0, _apiUtils.callApi)(url, null, reposRequest(page), reposSuccess(page), reposFailure(page));
}

function shouldFetchRepos(state, page) {
  // Check cache first
  var repos = state.reposByPage[page];
  if (!repos) {
    // Not cached, should fetch
    return true;
  }

  if (repos.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return repos.didInvalidate;
}

function fetchReposIfNeeded(page, query, sort) {
  return function (dispatch, getState) {
    if (shouldFetchRepos(getState(), page)) {
      return dispatch(fetchRepos(page, query, sort));
    }
  };
}

function fetchReposNow(page, query, sort) {
  return function (dispatch) {
    return dispatch(fetchRepos(page, query, sort));
  };
}

function setReposSearchTerms() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "stars:>10000";
  var sort = arguments[1];
  var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "desc";

  return function (dispatch) {
    var sortOut = "stars";
    var orderOut = "desc";
    if (sort === "most-stars") {
      sortOut = "stars";
      orderOut = "desc";
    } else if (sort === "fewest-stars") {
      sortOut = "stars";
      orderOut = "asc";
    } else if (sort === "most-forks") {
      sortOut = "forks";
      orderOut = "desc";
    } else if (sort === "fewest-forks") {
      sortOut = "forks";
      orderOut = "asc";
    } else if (sort === "recently-updated") {
      sortOut = "updated";
      orderOut = "desc";
    } else if (sort === "least-recently-updated") {
      sortOut = "updated";
      orderOut = "asc";
    }
    reposQuery(query);
    reposSort(sortOut);
    reposOrder(orderOut);
  };
}

//# sourceMappingURL=repos-compiled.js.map